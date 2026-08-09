import { afterEach, describe, expect, it, vi } from "vitest";

import {
  confirmDiscardChanges,
  findPageTemplate,
  getGlobalTemplates,
  initialState,
  isAnySourceDirty,
  isSameSelection,
  pickDefaultLang,
  reducer,
  setBlockInConfig,
  UNSAVED_CHANGES_MESSAGE,
} from "../src/state";
import type { AppState, DirtySource } from "../src/state";
import type { AppConfig } from "../src/types";

const buildConfig = (): AppConfig => ({
  client: { name: "alpha" },
  layout: {
    features: {},
    templates: [
      {
        type: "navbars",
        id: "classicNavbar",
        datas: { logo: "logo_alpha" },
      },
      {
        type: "description",
        id: "multiDescriptions",
        name: "Home",
        datas: {
          title: "Accueil",
          content: {
            "banner-1": { type: "banner", title: "Bienvenue" },
            "description-1": { type: "descriptionB", title: "Le studio" },
          },
        },
      },
      {
        type: "description",
        id: "multiDescriptions",
        name: "Contact",
        datas: {
          content: {
            "banner-1": { type: "banner", title: "Contactez-nous" },
          },
        },
      },
      {
        type: "footers",
        id: "classicFooter",
        datas: {},
      },
    ],
  },
});

describe("findPageTemplate", () => {
  it("finds the multiDescriptions template matching the given name", () => {
    const config = buildConfig();

    const home = findPageTemplate(config, "Home");

    expect(home).toBeDefined();
    expect(home?.name).toBe("Home");
    expect(home?.datas?.title).toBe("Accueil");
  });

  it("returns undefined when no template matches the name", () => {
    const config = buildConfig();

    expect(findPageTemplate(config, "Faq")).toBeUndefined();
  });

  it("returns undefined for a null/undefined config", () => {
    expect(findPageTemplate(null, "Home")).toBeUndefined();
    expect(findPageTemplate(undefined, "Home")).toBeUndefined();
  });
});

describe("getGlobalTemplates", () => {
  it("filters out every description/multiDescriptions page template", () => {
    const config = buildConfig();

    const globals = getGlobalTemplates(config);

    expect(
      globals.map(
        (entry) => `${entry.template.type}:${entry.template.id ?? ""}`,
      ),
    ).toEqual(["navbars:classicNavbar", "footers:classicFooter"]);
  });

  it("carries the original index into the full templates array, not the filtered position", () => {
    const config = buildConfig();

    const globals = getGlobalTemplates(config);

    // navbars is templates[0], footers is templates[3] — the two
    // description/multiDescriptions page templates in between are skipped.
    expect(globals.map((entry) => entry.index)).toEqual([0, 3]);
  });

  it("returns an empty array for a null config", () => {
    expect(getGlobalTemplates(null)).toEqual([]);
  });
});

describe("pickDefaultLang", () => {
  it("prefers fr when available", () => {
    expect(pickDefaultLang(["en", "fr"])).toBe("fr");
    expect(pickDefaultLang(["fr", "en"])).toBe("fr");
  });

  it("falls back to the first lang when fr is not available", () => {
    expect(pickDefaultLang(["en", "de"])).toBe("en");
    expect(pickDefaultLang(["de"])).toBe("de");
  });
});

describe("setBlockInConfig", () => {
  it("immutably replaces a page block by key, without mutating the input", () => {
    const config = buildConfig();
    const original = structuredClone(config);
    Object.freeze(config.layout.templates[1].datas);

    const updatedBlock = { type: "banner", title: "Bienvenue chez nous" };
    const next = setBlockInConfig(
      config,
      { scope: "page", templateName: "Home", key: "banner-1" },
      updatedBlock,
    );

    // Original config is untouched.
    expect(config).toEqual(original);

    // New config has the updated block, other blocks preserved.
    const homeTemplate = findPageTemplate(next, "Home");
    const content = homeTemplate?.datas?.content as Record<string, unknown>;
    expect(content["banner-1"]).toEqual(updatedBlock);
    expect(content["description-1"]).toEqual({
      type: "descriptionB",
      title: "Le studio",
    });

    // Other page's template untouched.
    const contactTemplate = findPageTemplate(next, "Contact");
    expect(contactTemplate).toEqual(original.layout.templates[2]);
  });

  it("immutably replaces a global template by index, without mutating the input", () => {
    const config = buildConfig();
    const original = structuredClone(config);
    Object.freeze(config.layout.templates[0]);

    const updatedNavbar = {
      type: "navbars",
      id: "classicNavbar",
      datas: { logo: "logo_new" },
    };
    const next = setBlockInConfig(
      config,
      { scope: "global", index: 0 },
      updatedNavbar,
    );

    // Original config is untouched.
    expect(config).toEqual(original);

    expect(next.layout.templates[0]).toEqual(updatedNavbar);
    // Everything else preserved.
    expect(next.layout.templates[1]).toEqual(original.layout.templates[1]);
    expect(next.layout.templates[2]).toEqual(original.layout.templates[2]);
    expect(next.layout.templates[3]).toEqual(original.layout.templates[3]);
  });
});

describe("confirmDiscardChanges", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("proceeds without prompting when nothing is dirty", () => {
    const confirmSpy = vi.fn();
    vi.stubGlobal("window", { confirm: confirmSpy });

    expect(confirmDiscardChanges(false)).toBe(true);
    expect(confirmSpy).not.toHaveBeenCalled();
  });

  it("prompts with the expected message and proceeds when the user confirms", () => {
    const confirmSpy = vi.fn().mockReturnValue(true);
    vi.stubGlobal("window", { confirm: confirmSpy });

    expect(confirmDiscardChanges(true)).toBe(true);
    expect(confirmSpy).toHaveBeenCalledWith(UNSAVED_CHANGES_MESSAGE);
  });

  it("aborts when dirty and the user cancels", () => {
    const confirmSpy = vi.fn().mockReturnValue(false);
    vi.stubGlobal("window", { confirm: confirmSpy });

    expect(confirmDiscardChanges(true)).toBe(false);
  });
});

describe("isSameSelection", () => {
  it("treats null and null as the same selection", () => {
    expect(isSameSelection(null, null)).toBe(true);
  });

  it("treats null vs. a real selection as different", () => {
    expect(isSameSelection(null, { scope: "global", index: 0 })).toBe(false);
    expect(isSameSelection({ scope: "page", key: "banner-1" }, null)).toBe(
      false,
    );
  });

  it("compares global selections by index", () => {
    expect(
      isSameSelection(
        { scope: "global", index: 1 },
        { scope: "global", index: 1 },
      ),
    ).toBe(true);
    expect(
      isSameSelection(
        { scope: "global", index: 1 },
        { scope: "global", index: 2 },
      ),
    ).toBe(false);
  });

  it("compares page selections by key", () => {
    expect(
      isSameSelection(
        { scope: "page", key: "banner-1" },
        { scope: "page", key: "banner-1" },
      ),
    ).toBe(true);
    expect(
      isSameSelection(
        { scope: "page", key: "banner-1" },
        { scope: "page", key: "banner-2" },
      ),
    ).toBe(false);
  });

  it("treats different scopes as different even with the same shape", () => {
    expect(
      isSameSelection(
        { scope: "global", index: 0 },
        { scope: "page", key: "0" },
      ),
    ).toBe(false);
  });
});

describe("isAnySourceDirty", () => {
  it("is false when nothing is dirty", () => {
    expect(isAnySourceDirty(false, new Set<DirtySource>())).toBe(false);
  });

  it("is true when the main config is dirty, even with no dirty sources", () => {
    expect(isAnySourceDirty(true, new Set<DirtySource>())).toBe(true);
  });

  it("is true when a Lang/Theme source is dirty, even with a clean config", () => {
    expect(isAnySourceDirty(false, new Set<DirtySource>(["lang"]))).toBe(true);
    expect(isAnySourceDirty(false, new Set<DirtySource>(["theme"]))).toBe(
      true,
    );
  });
});

describe("reducer: setSourceDirty", () => {
  it("adds a source to dirtySources", () => {
    const next = reducer(initialState, {
      type: "setSourceDirty",
      source: "lang",
      dirty: true,
    });

    expect(next.dirtySources.has("lang")).toBe(true);
  });

  it("removes a source from dirtySources, leaving others untouched", () => {
    const dirty = reducer(initialState, {
      type: "setSourceDirty",
      source: "lang",
      dirty: true,
    });
    const both = reducer(dirty, {
      type: "setSourceDirty",
      source: "theme",
      dirty: true,
    });

    const next = reducer(both, {
      type: "setSourceDirty",
      source: "lang",
      dirty: false,
    });

    expect(next.dirtySources.has("lang")).toBe(false);
    expect(next.dirtySources.has("theme")).toBe(true);
  });
});

describe("reducer: saveSuccess / mid-save races", () => {
  const buildDirtyState = (config: AppConfig): AppState => ({
    ...initialState,
    config,
    dirty: true,
    saving: "saving",
    selectedBlock: { scope: "page", key: "banner-1" },
    pendingStructuralOps: [
      {
        op: { op: "duplicate", key: "banner-1" },
        before: {},
      },
    ],
  });

  it("marks the save clean when the config is still the one that was PUT", () => {
    const config = buildConfig();
    const state = buildDirtyState(config);

    const next = reducer(state, {
      type: "saveSuccess",
      savedConfig: config,
      replayedOpsCount: state.pendingStructuralOps.length,
    });

    expect(next.dirty).toBe(false);
    expect(next.saving).toBe("saved");
    expect(next.pendingStructuralOps).toEqual([]);
  });

  it("stays dirty, and keeps ops queued mid-save, when an edit lands between save start and saveSuccess", () => {
    const config = buildConfig();
    let state = buildDirtyState(config);

    // `save()` captured these before its first `await` — i.e. before either
    // of the dispatches below.
    const savedConfig = state.config as AppConfig;
    const replayedOpsCount = state.pendingStructuralOps.length; // 1

    // A content edit lands while the PUT is in flight — this produces a
    // brand new config object, distinct from `savedConfig`.
    state = reducer(state, {
      type: "updateBlock",
      path: ["title"],
      value: "Bienvenue chez nous (edited mid-save)",
    });
    expect(state.config).not.toBe(savedConfig);

    // ...and a further structural op is queued too.
    state = reducer(state, {
      type: "applyBlockOp",
      op: { op: "move", key: "banner-1", direction: "down" },
    });
    expect(state.pendingStructuralOps).toHaveLength(2);

    const next = reducer(state, {
      type: "saveSuccess",
      savedConfig,
      replayedOpsCount,
    });

    // Still dirty: the save only cleaned up the snapshot it actually PUT,
    // not the edit that landed after it started.
    expect(next.dirty).toBe(true);
    expect(next.saving).toBe("saved");
    // Only the op that existed at save time is dropped; the one queued
    // mid-save is preserved for the next save.
    expect(next.pendingStructuralOps).toHaveLength(1);
    expect(next.pendingStructuralOps[0].op).toEqual({
      op: "move",
      key: "banner-1",
      direction: "down",
    });
  });
});

describe("reducer: syncWarning", () => {
  it("sets the warning message", () => {
    const next = reducer(initialState, {
      type: "syncWarning",
      message: "Structure non appliquée à config.en.json : page absente",
    });

    expect(next.syncWarning).toBe(
      "Structure non appliquée à config.en.json : page absente",
    );
  });

  it("is cleared by the next saveStart", () => {
    const withWarning = reducer(initialState, {
      type: "syncWarning",
      message: "Structure non appliquée à config.en.json : page absente",
    });

    const next = reducer(withWarning, { type: "saveStart" });

    expect(next.syncWarning).toBeNull();
  });
});
