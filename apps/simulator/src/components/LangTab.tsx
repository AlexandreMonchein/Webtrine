import { type ReactNode, useEffect, useMemo, useState } from "react";

import * as api from "../api";
import { flattenLangKeys, type LangLeaf, missingKeys } from "../lang-model";
import { useAppState } from "../state";
import type { LangData } from "../types";

type LoadState = "idle" | "loading" | "loaded" | "error";
type SaveState = "saved" | "saving" | "error";

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const stringify = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  return String(value);
};

const setLangValue = (
  obj: Record<string, unknown>,
  path: string[],
  value: string,
): Record<string, unknown> => {
  const [head, ...rest] = path;
  if (rest.length === 0) return { ...obj, [head]: value };
  const child = isPlainObject(obj[head]) ? obj[head] : {};
  return { ...obj, [head]: setLangValue(child, rest, value) };
};

const saveStatusText = (
  saveState: SaveState,
  dirty: boolean,
  saveError: string | null,
): string => {
  if (saveState === "saving") return "Enregistrement…";
  if (saveState === "error") {
    return `Erreur${saveError ? ` : ${saveError}` : ""}`;
  }
  if (dirty) return "";
  return "Enregistré";
};

interface LeafRowProps {
  label: string;
  value: unknown;
  missing: boolean;
  onChange: (value: string) => void;
}

/** One editable leaf row (used both inside the collapsible tree and the
 * flat search-result list): key/path label, ⚠ badge when missing from the
 * other language, and a text input bound to the local (unsaved) value. */
function LeafRow({ label, value, missing, onChange }: LeafRowProps) {
  return (
    <div className="lang-leaf">
      <label className="lang-leaf-key">
        {label}
        {missing && (
          <span
            className="lang-missing-badge"
            title="Absente de l'autre langue"
          >
            ⚠
          </span>
        )}
      </label>
      <input
        type="text"
        value={stringify(value)}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

interface TreeNodeProps {
  node: Record<string, unknown>;
  path: string[];
  missing: Set<string>;
  onChange: (path: string[], value: string) => void;
}

/** Recursive, collapsible rendering of a lang object: one `<details>` per
 * nested object key, leaf rows (key + editable value) at the bottom. */
function TreeNode({ node, path, missing, onChange }: TreeNodeProps) {
  return (
    <>
      {Object.entries(node).map(([key, value]) => {
        const childPath = [...path, key];
        const dotPath = childPath.join(".");

        if (isPlainObject(value)) {
          return (
            <details
              key={dotPath}
              className="lang-node"
              open={path.length === 0}
            >
              <summary>{key}</summary>
              <div className="lang-node-children">
                <TreeNode
                  node={value}
                  path={childPath}
                  missing={missing}
                  onChange={onChange}
                />
              </div>
            </details>
          );
        }

        return (
          <LeafRow
            key={dotPath}
            label={key}
            value={value}
            missing={missing.has(dotPath)}
            onChange={(next) => onChange(childPath, next)}
          />
        );
      })}
    </>
  );
}

interface SearchResultsProps {
  leaves: LangLeaf[];
  missing: Set<string>;
  onChange: (path: string[], value: string) => void;
}

function SearchResults({ leaves, missing, onChange }: SearchResultsProps) {
  if (leaves.length === 0) {
    return <div className="editor-empty">Aucun résultat.</div>;
  }
  return (
    <>
      {leaves.map((leaf) => {
        const dotPath = leaf.path.join(".");
        return (
          <LeafRow
            key={dotPath}
            label={dotPath}
            value={leaf.value}
            missing={missing.has(dotPath)}
            onChange={(next) => onChange(leaf.path, next)}
          />
        );
      })}
    </>
  );
}

/**
 * Lang tab: edits `lang/customer/<customer>/<lang>.json`. Fetches both the
 * current and (when it exists) the other language's file on mount, purely
 * to compute `missingKeys` in each direction — the other lang's data is
 * never edited or saved here. "Enregistrer lang" only ever PUTs the
 * current language.
 */
function LangTab() {
  const { state, reloadPreview, setSourceDirty } = useAppState();
  const { customer, lang, customers } = state;

  const otherLang = customers
    .find((entry) => entry.name === customer)
    ?.langs.find((entry) => entry !== lang);

  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [current, setCurrent] = useState<LangData>({});
  const [other, setOther] = useState<LangData | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    setDirty(false);
    setSourceDirty("lang", false);
    setSaveState("saved");
    setSaveError(null);

    if (!customer || !lang) {
      setLoadState("idle");
      return undefined;
    }

    setLoadState("loading");
    (async () => {
      const currentData = await api.getLang(customer, lang);
      const otherData = otherLang
        ? await api.getLang(customer, otherLang)
        : null;
      return { currentData, otherData };
    })()
      .then(({ currentData, otherData }) => {
        if (cancelled) return;
        setCurrent(currentData);
        setOther(otherData);
        setLoadState("loaded");
      })
      .catch(() => {
        if (!cancelled) setLoadState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [customer, lang, otherLang, setSourceDirty]);

  const missingInOther = useMemo(
    () => new Set(other ? missingKeys(current, other) : []),
    [current, other],
  );
  const missingInCurrent = useMemo(
    () => (other ? missingKeys(other, current) : []),
    [current, other],
  );

  const onChange = (path: string[], value: string): void => {
    setCurrent((prev) => setLangValue(prev, path, value));
    setDirty(true);
    setSourceDirty("lang", true);
  };

  const onSave = async (): Promise<void> => {
    setSaveState("saving");
    setSaveError(null);
    try {
      await api.putLang(customer, lang, current);
      setSaveState("saved");
      setDirty(false);
      setSourceDirty("lang", false);
      reloadPreview();
    } catch (err) {
      setSaveState("error");
      setSaveError(err instanceof Error ? err.message : String(err));
    }
  };

  if (loadState === "idle" || loadState === "loading") {
    return <div className="editor-empty">Chargement des traductions…</div>;
  }
  if (loadState === "error") {
    return (
      <div className="editor-empty">Erreur de chargement des traductions.</div>
    );
  }

  const query = search.trim().toLowerCase();
  const filteredLeaves = query
    ? flattenLangKeys(current).filter(
        (leaf) =>
          leaf.path.join(".").toLowerCase().includes(query) ||
          stringify(leaf.value).toLowerCase().includes(query),
      )
    : null;

  let treeBody: ReactNode;
  if (filteredLeaves) {
    treeBody = (
      <SearchResults
        leaves={filteredLeaves}
        missing={missingInOther}
        onChange={onChange}
      />
    );
  } else {
    treeBody = (
      <TreeNode
        node={current}
        path={[]}
        missing={missingInOther}
        onChange={onChange}
      />
    );
  }

  return (
    <div className="lang-tab">
      {other && (
        <div className="lang-missing-summary">
          <div>
            Clés manquantes en {otherLang} : {missingInOther.size}
          </div>
          <div>
            Clés manquantes en {lang} : {missingInCurrent.length}
          </div>
        </div>
      )}

      <input
        type="search"
        className="lang-search"
        placeholder="Rechercher une clé ou une valeur…"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="lang-tree">{treeBody}</div>

      <div className="editor-footer">
        <button
          type="button"
          className="editor-save"
          disabled={!dirty || saveState === "saving"}
          onClick={() => void onSave()}
        >
          Enregistrer lang
        </button>
        <span className="save-status-text">
          {saveStatusText(saveState, dirty, saveError)}
        </span>
      </div>
    </div>
  );
}

export default LangTab;
