import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import * as api from "./api";
import { ApiError } from "./api";
import {
  applyOp,
  applyOpByPosition,
  type BlockOp,
  type ContentMap,
} from "./ops";
import { PAGE_ROUTES, type PageRoute } from "./routes";
import type { AppConfig, CustomerInfo, Template } from "./types";

// ---------------------------------------------------------------------------
// Public state shape
// ---------------------------------------------------------------------------

/**
 * What the Tree pane has highlighted. Deliberately minimal: it does not
 * carry which page template it belongs to — that is always the currently
 * selected page (`state.page.templateName`), tracked separately.
 */
export type SelectedBlock =
  | { scope: "global"; index: number }
  | { scope: "page"; key: string };

export type SavingState = "saved" | "saving" | "error";

/**
 * A structural block operation applied to the current page, paired with a
 * snapshot of that page's content taken immediately BEFORE the op — i.e.
 * exactly the `sourceContent` `applyOpByPosition` needs to replay this op
 * (by position) onto the other language at save time. Capturing it live,
 * at the moment the op is dispatched, sidesteps needing a separate
 * "content as of last save" baseline to reconstruct it from.
 */
export interface PendingStructuralOp {
  op: BlockOp;
  before: ContentMap;
}

/** Set when `getConfig` comes back 422 — the on-disk config JSON doesn't
 * parse. Carries what the server read verbatim (`raw`) plus the parser's
 * message, so the repair UI (see ConfigRepair.tsx) can show the user their
 * broken file and let them fix it in place rather than getting stuck. */
export interface ConfigParseError {
  parseError: string;
  raw: string;
}

/**
 * The Lang and Theme tabs each keep their own local "draft" state (fetched
 * and saved independently of the main config — see LangTab.tsx/ThemeTab.tsx)
 * and are always mounted (see Editor.tsx) so that draft survives switching
 * to another tab. They report their own dirtiness here via
 * `setSourceDirty` so the customer/lang switch guards (which — unlike a
 * page switch — DO discard that draft, by remounting/refetching it) know
 * to prompt. Deliberately does not include "config": that source's
 * dirtiness has its own `dirty` field with its own (object-identity based)
 * clean-up rules — see the `saveSuccess` reducer case.
 */
export type DirtySource = "lang" | "theme";

export interface AppState {
  customers: CustomerInfo[];
  customer: string;
  lang: string;
  page: PageRoute;
  config: AppConfig | null;
  configError: ConfigParseError | null;
  selectedBlock: SelectedBlock | null;
  dirty: boolean;
  /** Lang/Theme tabs currently holding unsaved local edits. See
   * `DirtySource`. */
  dirtySources: Set<DirtySource>;
  saving: SavingState;
  /** Bumped by `reloadPreview()`; Preview.tsx keys its iframe on this. */
  previewVersion: number;
  /** Structural ops (add/remove/move/duplicate) applied since the last
   * save/customer/lang/page change — replayed onto the other language's
   * config at save time when the user opts in. See `save()`. */
  pendingStructuralOps: PendingStructuralOp[];
  /** Set when a save's fr/en structure sync was skipped because the other
   * language has no matching page template — see `save()`. Cleared on the
   * next save attempt or customer/lang/page switch. */
  syncWarning: string | null;
}

/** Exported so unit tests can build fixtures off a known-good baseline
 * rather than repeating every field. */
export const initialState: AppState = {
  customers: [],
  customer: "",
  lang: "",
  page: PAGE_ROUTES[0],
  config: null,
  configError: null,
  selectedBlock: null,
  dirty: false,
  dirtySources: new Set(),
  saving: "saved",
  previewVersion: 0,
  pendingStructuralOps: [],
  syncWarning: null,
};

// ---------------------------------------------------------------------------
// Pure helpers (exported for unit tests — no rendering involved)
// ---------------------------------------------------------------------------

const isPageTemplate = (template: Template): boolean =>
  template.type === "description" && template.id === "multiDescriptions";

export const findPageTemplate = (
  config: AppConfig | null | undefined,
  templateName: string,
): Template | undefined =>
  config?.layout.templates.find(
    (template) => isPageTemplate(template) && template.name === templateName,
  );

/** A global (non-page) template, paired with its index in the FULL
 * `layout.templates` array — callers (Tree.tsx, `selectBlock`) address
 * global templates by that original index, not by position in this
 * filtered list. */
export interface GlobalTemplateEntry {
  template: Template;
  index: number;
}

export const getGlobalTemplates = (
  config: AppConfig | null | undefined,
): GlobalTemplateEntry[] =>
  config
    ? config.layout.templates
        .map((template, index) => ({ template, index }))
        .filter((entry) => !isPageTemplate(entry.template))
    : [];

/** Prefers "fr" when the customer has it, otherwise the first available
 * language (whatever order the server reported). */
export const pickDefaultLang = (langs: string[]): string =>
  langs.includes("fr") ? "fr" : langs[0];

// ---------------------------------------------------------------------------
// Unsaved-changes guard
// ---------------------------------------------------------------------------

export const UNSAVED_CHANGES_MESSAGE =
  "Modifications non enregistrées — continuer et les perdre ?";

/**
 * Gate for any UI action that would discard unsaved edits (switching
 * customer/lang/page, selecting another block). Returns true when it's
 * safe to proceed — either there's nothing to lose, or the user confirmed
 * losing it — false when the caller should abort. The only impure bit is
 * the `window.confirm` call itself, kept inline (rather than injected) so
 * every call site can use this the same way `window.confirm` would be
 * used directly; tests stub `window.confirm`.
 */
export const confirmDiscardChanges = (dirty: boolean): boolean =>
  !dirty || window.confirm(UNSAVED_CHANGES_MESSAGE);

/**
 * Whether ANY tracked source — the main config, or the Lang/Theme tabs'
 * own local drafts — currently has unsaved edits. Used by the
 * customer/lang switch guards: switching either one remounts/refetches the
 * Lang/Theme tabs' data, discarding their drafts, so both must factor in.
 * A page switch deliberately does NOT use this — the Lang/Theme tabs don't
 * refetch on a page switch, so nothing of theirs would be lost — and
 * checks `state.dirty` alone instead (see `setPage`).
 */
export const isAnySourceDirty = (
  dirty: boolean,
  dirtySources: ReadonlySet<DirtySource>,
): boolean => dirty || dirtySources.size > 0;

/** Whether two `SelectedBlock`s point at the same block — used to skip the
 * unsaved-changes prompt when a click re-selects the block already
 * selected (nothing would actually be discarded). */
export const isSameSelection = (
  a: SelectedBlock | null,
  b: SelectedBlock | null,
): boolean => {
  if (a === b) return true;
  if (!a || !b || a.scope !== b.scope) return false;
  return a.scope === "global" && b.scope === "global"
    ? a.index === b.index
    : a.scope === "page" && b.scope === "page" && a.key === b.key;
};

/**
 * Selection as needed to locate a block inside `config` from a pure
 * function with no other context. Unlike `SelectedBlock` (the UI's notion
 * of "what's highlighted"), the page variant here also needs the page's
 * `templateName` since a config holds one `multiDescriptions` template per
 * page, all sharing the same `type`/`id`.
 */
export type BlockSelection =
  | { scope: "global"; index: number }
  | { scope: "page"; templateName: string; key: string };

export const getBlockInConfig = (
  config: AppConfig | null | undefined,
  selection: BlockSelection,
): unknown => {
  if (!config) return undefined;
  if (selection.scope === "global") {
    return config.layout.templates[selection.index];
  }
  const template = findPageTemplate(config, selection.templateName);
  const content = template?.datas?.content as
    | Record<string, unknown>
    | undefined;
  return content ? content[selection.key] : undefined;
};

/**
 * Immutably replaces one block in `config` — either a global template (by
 * index) or a page's content block (by key) — and returns a new config.
 * `config` (and everything reachable from it) is left untouched.
 */
export const setBlockInConfig = (
  config: AppConfig,
  selection: BlockSelection,
  block: unknown,
): AppConfig => {
  if (selection.scope === "global") {
    const templates = config.layout.templates.map((template, index) =>
      index === selection.index ? (block as Template) : template,
    );
    return { ...config, layout: { ...config.layout, templates } };
  }

  const templates = config.layout.templates.map((template) => {
    if (!isPageTemplate(template) || template.name !== selection.templateName) {
      return template;
    }
    const content = (template.datas?.content ?? {}) as Record<string, unknown>;
    return {
      ...template,
      datas: {
        ...template.datas,
        content: { ...content, [selection.key]: block },
      },
    };
  });

  return { ...config, layout: { ...config.layout, templates } };
};

/**
 * Immutably replaces an ENTIRE page's `datas.content` map (used by the
 * block-structure ops — add/remove/move/duplicate — which rebuild the
 * whole map rather than patching a single block). No-op (returns `config`
 * as-is) if no template matches `templateName` — callers that need to
 * distinguish "nothing to do" should check `findPageTemplate` first.
 */
const setPageContent = (
  config: AppConfig,
  templateName: string,
  content: ContentMap,
): AppConfig => {
  const templates = config.layout.templates.map((template) => {
    if (!isPageTemplate(template) || template.name !== templateName) {
      return template;
    }
    return { ...template, datas: { ...template.datas, content } };
  });
  return { ...config, layout: { ...config.layout, templates } };
};

/** A path of keys/array indices into a block's value tree. */
export type FieldPath = Array<string | number>;

const setAtPath = (
  target: unknown,
  path: FieldPath,
  value: unknown,
): unknown => {
  if (path.length === 0) return value;
  const [head, ...rest] = path;

  if (Array.isArray(target)) {
    const index = Number(head);
    const copy = target.slice();
    copy[index] = setAtPath(copy[index], rest, value);
    return copy;
  }

  const record = (target && typeof target === "object" ? target : {}) as Record<
    string,
    unknown
  >;
  const key = String(head);
  return { ...record, [key]: setAtPath(record[key], rest, value) };
};

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

type Action =
  | { type: "customersLoaded"; customers: CustomerInfo[] }
  | { type: "setCustomer"; customer: string }
  | { type: "setLang"; lang: string }
  | { type: "setPage"; page: PageRoute }
  | { type: "selectBlock"; selection: SelectedBlock | null }
  | { type: "configLoading" }
  | { type: "configLoaded"; config: AppConfig }
  | { type: "configParseError"; error: ConfigParseError }
  | { type: "configLoadError" }
  | { type: "updateBlock"; path: FieldPath; value: unknown }
  | { type: "createPage"; templateName: string }
  | { type: "applyBlockOp"; op: BlockOp }
  | { type: "replaceConfig"; config: AppConfig }
  | { type: "saveStart" }
  | {
      type: "saveSuccess";
      savedConfig: AppConfig;
      replayedOpsCount: number;
    }
  | { type: "saveError" }
  | { type: "reloadPreview" }
  | { type: "setSourceDirty"; source: DirtySource; dirty: boolean }
  | { type: "syncWarning"; message: string };

/** Exported (alongside the other pure helpers above) purely so unit tests
 * can drive state transitions directly without mounting the provider. */
export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "customersLoaded":
      return { ...state, customers: action.customers };

    case "setCustomer":
      return {
        ...state,
        customer: action.customer,
        config: null,
        configError: null,
        selectedBlock: null,
        dirty: false,
        pendingStructuralOps: [],
        // The Lang/Theme tabs are about to refetch for the new customer,
        // discarding whatever local drafts they held.
        dirtySources: new Set(),
        syncWarning: null,
      };

    case "setLang":
      return {
        ...state,
        lang: action.lang,
        config: null,
        configError: null,
        selectedBlock: null,
        dirty: false,
        // The config is about to be reloaded fresh for the new lang, so any
        // ops queued against the previous lang's (now-discarded) config no
        // longer apply.
        pendingStructuralOps: [],
        // Ditto for the Lang/Theme tabs' local drafts — they refetch too.
        dirtySources: new Set(),
        syncWarning: null,
      };

    case "setPage":
      // Pending ops all target `state.page.templateName`'s content — reset
      // so that invariant holds for whatever page comes next. Note
      // `dirtySources` is NOT reset here: the Lang/Theme tabs don't refetch
      // on a page switch, so their local drafts survive it untouched.
      return {
        ...state,
        page: action.page,
        selectedBlock: null,
        pendingStructuralOps: [],
        syncWarning: null,
      };

    case "selectBlock":
      return { ...state, selectedBlock: action.selection };

    case "configLoading":
      return { ...state, configError: null };

    case "configLoaded":
      return {
        ...state,
        config: action.config,
        configError: null,
        dirty: false,
        saving: "saved",
      };

    case "configParseError":
      return { ...state, config: null, configError: action.error };

    case "configLoadError":
      return { ...state, config: null, configError: null };

    case "updateBlock": {
      if (!state.config || !state.selectedBlock) return state;

      const selection: BlockSelection =
        state.selectedBlock.scope === "global"
          ? { scope: "global", index: state.selectedBlock.index }
          : {
              scope: "page",
              templateName: state.page.templateName,
              key: state.selectedBlock.key,
            };

      const currentBlock = getBlockInConfig(state.config, selection);
      const updatedBlock = setAtPath(currentBlock, action.path, action.value);
      const config = setBlockInConfig(state.config, selection, updatedBlock);

      return { ...state, config, dirty: true };
    }

    case "createPage": {
      if (!state.config) return state;
      // Already exists (e.g. a stale double-click) — no-op rather than
      // clobbering the existing page template.
      if (findPageTemplate(state.config, action.templateName)) return state;

      const newTemplate: Template = {
        type: "description",
        id: "multiDescriptions",
        name: action.templateName,
        datas: { title: "", content: {} },
      };
      const config: AppConfig = {
        ...state.config,
        layout: {
          ...state.config.layout,
          templates: [...state.config.layout.templates, newTemplate],
        },
      };
      return { ...state, config, dirty: true };
    }

    case "applyBlockOp": {
      if (!state.config) return state;
      const template = findPageTemplate(state.config, state.page.templateName);
      // No template for this page yet — nothing to apply the op to.
      if (!template) return state;

      const before = (template.datas?.content ?? {}) as ContentMap;
      const nextContent = applyOp(before, action.op);
      const config = setPageContent(
        state.config,
        state.page.templateName,
        nextContent,
      );

      // A removed block can no longer be selected.
      const selectedBlock =
        action.op.op === "remove" &&
        state.selectedBlock?.scope === "page" &&
        state.selectedBlock.key === action.op.key
          ? null
          : state.selectedBlock;

      return {
        ...state,
        config,
        dirty: true,
        selectedBlock,
        pendingStructuralOps: [
          ...state.pendingStructuralOps,
          { op: action.op, before },
        ],
      };
    }

    case "replaceConfig":
      return { ...state, config: action.config, dirty: true };

    case "saveStart":
      // A previous save's sync warning (if any) is stale news by now.
      return { ...state, saving: "saving", syncWarning: null };

    case "saveSuccess": {
      // `action.savedConfig` is the object reference that was actually
      // PUT. If `state.config` has since moved on (an edit was dispatched
      // while this save was in flight), it's still dirty — this save only
      // cleaned up the snapshot it captured, not whatever came after.
      // Likewise, only the ops that existed when THIS save started are
      // guaranteed to have been replayed (or considered for replay) —
      // anything appended after that (`.slice`d off from the front) must
      // stick around for the next save.
      const dirty = state.config === action.savedConfig ? false : state.dirty;
      return {
        ...state,
        saving: "saved",
        dirty,
        pendingStructuralOps: state.pendingStructuralOps.slice(
          action.replayedOpsCount,
        ),
      };
    }

    case "saveError":
      return { ...state, saving: "error" };

    case "reloadPreview":
      return { ...state, previewVersion: state.previewVersion + 1 };

    case "setSourceDirty": {
      const dirtySources = new Set(state.dirtySources);
      if (action.dirty) {
        dirtySources.add(action.source);
      } else {
        dirtySources.delete(action.source);
      }
      return { ...state, dirtySources };
    }

    case "syncWarning":
      return { ...state, syncWarning: action.message };

    default:
      return state;
  }
};

// ---------------------------------------------------------------------------
// Context + provider
// ---------------------------------------------------------------------------

/** True when `err` is the specific `ApiError` a 422 config-parse failure
 * throws — i.e. it carries `{parseError, raw}`, not the generic `{error}`
 * shape every other failure uses. */
const isConfigParseError = (
  err: unknown,
): err is ApiError & { payload: ConfigParseError } =>
  err instanceof ApiError &&
  err.payload !== undefined &&
  "parseError" in err.payload;

export interface AppStateContextValue {
  state: AppState;
  init: () => Promise<void>;
  setCustomer: (customer: string) => Promise<void>;
  setLang: (lang: string) => Promise<void>;
  setPage: (page: PageRoute) => void;
  selectBlock: (selection: SelectedBlock | null) => void;
  updateBlock: (path: FieldPath, value: unknown) => void;
  createPage: (templateName: string) => void;
  applyBlockOp: (op: BlockOp) => void;
  replaceConfig: (config: AppConfig) => void;
  /** Saves the current config. When `alsoSyncTo` names another lang the
   * customer has, also GETs that lang's config, replays every pending
   * structural op (by position) onto its matching page template, and PUTs
   * it back — see `pendingStructuralOps`. */
  save: (alsoSyncTo?: string) => Promise<boolean>;
  /** Repair flow for a `configError`: PUTs `data` as the current
   * customer/lang's config, then reloads it fresh. Returns false (leaving
   * `configError` untouched) if the PUT itself fails, so the user can
   * retry rather than losing their edited textarea. */
  repairConfig: (data: unknown) => Promise<boolean>;
  reloadPreview: () => void;
  /** Lets the Lang/Theme tabs report their own local dirtiness so the
   * customer/lang switch guards (and `beforeunload`) can factor it in —
   * see `DirtySource`/`isAnySourceDirty`. */
  setSourceDirty: (source: DirtySource, dirty: boolean) => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadConfig = useCallback(async (customer: string, lang: string) => {
    dispatch({ type: "configLoading" });
    try {
      const config = await api.getConfig(customer, lang);
      dispatch({ type: "configLoaded", config });
    } catch (err) {
      if (isConfigParseError(err)) {
        dispatch({ type: "configParseError", error: err.payload });
      } else {
        dispatch({ type: "configLoadError" });
      }
    }
  }, []);

  const init = useCallback(async () => {
    const customers = await api.getCustomers();
    dispatch({ type: "customersLoaded", customers });

    const first = customers[0];
    if (!first) return;
    dispatch({ type: "setCustomer", customer: first.name });

    const lang = pickDefaultLang(first.langs);
    if (!lang) return;
    dispatch({ type: "setLang", lang });

    await loadConfig(first.name, lang);
  }, [loadConfig]);

  // `init` is referentially stable across renders (its own deps, `loadConfig`,
  // never change), so this effect runs exactly once on mount.
  useEffect(() => {
    void init();
  }, [init]);

  const setCustomer = useCallback(
    async (customer: string) => {
      if (customer === state.customer) return;
      // Switching customer refetches the Lang/Theme tabs' data too, so
      // their local dirtiness counts here, not just the main config's.
      const anyDirty = isAnySourceDirty(state.dirty, state.dirtySources);
      if (!confirmDiscardChanges(anyDirty)) return;
      dispatch({ type: "setCustomer", customer });

      const info = state.customers.find((c) => c.name === customer);
      const lang = info?.langs.includes(state.lang)
        ? state.lang
        : info && pickDefaultLang(info.langs);
      if (!lang) return;
      if (lang !== state.lang) dispatch({ type: "setLang", lang });

      await loadConfig(customer, lang);
    },
    [
      state.customers,
      state.customer,
      state.lang,
      state.dirty,
      state.dirtySources,
      loadConfig,
    ],
  );

  const setLang = useCallback(
    async (lang: string) => {
      if (lang === state.lang) return;
      // Ditto — switching lang refetches the Lang/Theme tabs' data.
      const anyDirty = isAnySourceDirty(state.dirty, state.dirtySources);
      if (!confirmDiscardChanges(anyDirty)) return;
      dispatch({ type: "setLang", lang });
      await loadConfig(state.customer, lang);
    },
    [state.customer, state.lang, state.dirty, state.dirtySources, loadConfig],
  );

  const setPage = useCallback(
    (page: PageRoute) => {
      if (page.path === state.page.path) return;
      // Page switches deliberately check `state.dirty` alone — the
      // Lang/Theme tabs don't refetch on a page switch, so nothing of
      // theirs is at risk of being discarded by it.
      if (!confirmDiscardChanges(state.dirty)) return;
      dispatch({ type: "setPage", page });
    },
    [state.page, state.dirty],
  );

  const selectBlock = useCallback(
    (selection: SelectedBlock | null) => {
      if (isSameSelection(selection, state.selectedBlock)) return;
      if (!confirmDiscardChanges(state.dirty)) return;
      dispatch({ type: "selectBlock", selection });
    },
    [state.selectedBlock, state.dirty],
  );

  const updateBlock = useCallback((path: FieldPath, value: unknown) => {
    dispatch({ type: "updateBlock", path, value });
  }, []);

  const createPage = useCallback((templateName: string) => {
    dispatch({ type: "createPage", templateName });
  }, []);

  const applyBlockOp = useCallback((op: BlockOp) => {
    dispatch({ type: "applyBlockOp", op });
  }, []);

  const setSourceDirty = useCallback((source: DirtySource, dirty: boolean) => {
    dispatch({ type: "setSourceDirty", source, dirty });
  }, []);

  const replaceConfig = useCallback((config: AppConfig) => {
    dispatch({ type: "replaceConfig", config });
  }, []);

  const reloadPreview = useCallback(() => {
    dispatch({ type: "reloadPreview" });
  }, []);

  const save = useCallback(
    async (alsoSyncTo?: string): Promise<boolean> => {
      const config = state.config;
      if (!config) return false;

      // Captured now, before any `await` — this is the exact object PUT
      // below, and exactly how many pending ops existed at that moment.
      // Anything dispatched while the PUT is in flight (a further edit, a
      // further structural op) must NOT be silently marked clean/replayed
      // by this save — see the `saveSuccess` reducer case.
      const savedConfig = config;
      const replayedOpsCount = state.pendingStructuralOps.length;

      dispatch({ type: "saveStart" });
      try {
        await api.putConfig(state.customer, state.lang, config);

        if (alsoSyncTo && state.pendingStructuralOps.length > 0) {
          const templateName = state.page.templateName;
          const otherConfig = await api.getConfig(state.customer, alsoSyncTo);
          const otherTemplate = findPageTemplate(otherConfig, templateName);

          // Only attempt the replay if the other lang actually has this
          // page — otherwise there is nothing to sync it onto. Surface
          // that rather than silently no-op'ing.
          if (otherTemplate) {
            let content = (otherTemplate.datas?.content ?? {}) as ContentMap;
            for (const { op, before } of state.pendingStructuralOps) {
              content = applyOpByPosition(content, op, before);
            }
            const nextOtherConfig = setPageContent(
              otherConfig,
              templateName,
              content,
            );
            await api.putConfig(state.customer, alsoSyncTo, nextOtherConfig);
          } else {
            dispatch({
              type: "syncWarning",
              message: `Structure non appliquée à config.${alsoSyncTo}.json : page absente`,
            });
          }
        }

        dispatch({ type: "saveSuccess", savedConfig, replayedOpsCount });
        dispatch({ type: "reloadPreview" });
        return true;
      } catch {
        dispatch({ type: "saveError" });
        return false;
      }
    },
    [
      state.config,
      state.customer,
      state.lang,
      state.page,
      state.pendingStructuralOps,
    ],
  );

  const repairConfig = useCallback(
    async (data: unknown): Promise<boolean> => {
      try {
        await api.putConfig(state.customer, state.lang, data as AppConfig);
      } catch {
        return false;
      }
      await loadConfig(state.customer, state.lang);
      return true;
    },
    [state.customer, state.lang, loadConfig],
  );

  // Warn on an accidental tab close/reload while there are unsaved edits —
  // the browser shows its own generic prompt; `returnValue` (a legacy but
  // still universally-required trigger) is what makes it appear at all.
  useEffect(() => {
    if (!isAnySourceDirty(state.dirty, state.dirtySources)) return undefined;
    const handleBeforeUnload = (event: BeforeUnloadEvent): void => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [state.dirty, state.dirtySources]);

  const value = useMemo<AppStateContextValue>(
    () => ({
      state,
      init,
      setCustomer,
      setLang,
      setPage,
      selectBlock,
      updateBlock,
      createPage,
      applyBlockOp,
      replaceConfig,
      save,
      repairConfig,
      reloadPreview,
      setSourceDirty,
    }),
    [
      state,
      init,
      setCustomer,
      setLang,
      setPage,
      selectBlock,
      updateBlock,
      createPage,
      applyBlockOp,
      replaceConfig,
      save,
      repairConfig,
      reloadPreview,
      setSourceDirty,
    ],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return ctx;
}
