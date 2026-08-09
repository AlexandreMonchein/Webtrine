import { useEffect, useState } from "react";

import * as api from "../api";
import { useAppState } from "../state";
import type { StyleConfig } from "../types";

type LoadState = "idle" | "loading" | "loaded" | "error";
type SaveState = "saved" | "saving" | "error";
type FieldKind = "color" | "number" | "text";

const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

/** Real apt235 style.config.json keys: theme-color-* (6-digit hex ->
 * color picker, anything else -> text), *font-size* (text — values are
 * CSS lengths like "1rem", not plain numbers), z-index-* (number). */
const kindForKey = (key: string, value: unknown): FieldKind => {
  if (
    key.startsWith("theme-color-") &&
    typeof value === "string" &&
    HEX_COLOR_PATTERN.test(value)
  ) {
    return "color";
  }
  if (key.includes("font-size")) return "text";
  if (key.startsWith("z-index-")) return "number";
  return "text";
};

const stringify = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  return String(value);
};

const inputTypeForKind = (kind: FieldKind): "color" | "number" | "text" => {
  if (kind === "color") return "color";
  if (kind === "number") return "number";
  return "text";
};

const saveStatusText = (
  saveState: SaveState,
  dirty: boolean,
  error: string | null,
): string => {
  if (saveState === "saving") return "Enregistrement…";
  if (saveState === "error") return `Erreur${error ? ` : ${error}` : ""}`;
  if (dirty) return "";
  return "Enregistré";
};

/** Theme tab: edits `config/customer/<customer>/style.config.json` — a
 * flat key/value map, not lang-scoped (one file per customer). */
function ThemeTab() {
  const { state, reloadPreview, setSourceDirty } = useAppState();
  const { customer } = state;

  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [style, setStyle] = useState<StyleConfig>({});
  const [dirty, setDirty] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setDirty(false);
    setSourceDirty("theme", false);
    setSaveState("saved");
    setSaveError(null);

    if (!customer) {
      setLoadState("idle");
      return undefined;
    }

    setLoadState("loading");
    api
      .getStyle(customer)
      .then((data) => {
        if (cancelled) return;
        setStyle(data);
        setLoadState("loaded");
      })
      .catch(() => {
        if (!cancelled) setLoadState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [customer, setSourceDirty]);

  const onChange = (key: string, value: string): void => {
    setStyle((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
    setSourceDirty("theme", true);
  };

  const onSave = async (): Promise<void> => {
    setSaveState("saving");
    setSaveError(null);
    try {
      await api.putStyle(customer, style);
      setSaveState("saved");
      setDirty(false);
      setSourceDirty("theme", false);
      reloadPreview();
    } catch (err) {
      setSaveState("error");
      setSaveError(err instanceof Error ? err.message : String(err));
    }
  };

  if (loadState === "idle" || loadState === "loading") {
    return <div className="editor-empty">Chargement du thème…</div>;
  }
  if (loadState === "error") {
    return <div className="editor-empty">Erreur de chargement du thème.</div>;
  }

  return (
    <div className="theme-tab">
      <div className="theme-tab-rows">
        {Object.entries(style).map(([key, value]) => {
          const kind = kindForKey(key, value);
          const stringValue = stringify(value);
          return (
            <div className="theme-row" key={key}>
              <label>{key}</label>
              <input
                type={inputTypeForKind(kind)}
                value={stringValue}
                onChange={(event) => onChange(key, event.target.value)}
              />
            </div>
          );
        })}
      </div>

      <div className="editor-footer">
        <button
          type="button"
          className="editor-save"
          disabled={!dirty || saveState === "saving"}
          onClick={() => void onSave()}
        >
          Enregistrer thème
        </button>
        <span className="save-status-text">
          {saveStatusText(saveState, dirty, saveError)}
        </span>
      </div>
    </div>
  );
}

export default ThemeTab;
