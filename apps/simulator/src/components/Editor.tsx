import { useState } from "react";

import {
  type BlockSelection,
  getBlockInConfig,
  type SelectedBlock,
  useAppState,
} from "../state";
import ConfigRepair from "./ConfigRepair";
import ContentForm from "./ContentForm";
import JsonEditor from "./JsonEditor";
import LangTab from "./LangTab";
import ThemeTab from "./ThemeTab";

type Tab = "content" | "json" | "lang" | "theme";

const blockType = (block: unknown): string =>
  block && typeof block === "object" && "type" in block
    ? String((block as { type: unknown }).type)
    : "?";

const toSelection = (
  selectedBlock: SelectedBlock | null,
  templateName: string,
): BlockSelection | null => {
  if (!selectedBlock) return null;
  if (selectedBlock.scope === "global") {
    return { scope: "global", index: selectedBlock.index };
  }
  return { scope: "page", templateName, key: selectedBlock.key };
};

function Editor() {
  const { state, save } = useAppState();
  const {
    config,
    configError,
    selectedBlock,
    page,
    dirty,
    saving,
    customer,
    lang,
    customers,
    pendingStructuralOps,
    syncWarning,
  } = state;
  const [tab, setTab] = useState<Tab>("content");

  if (configError) {
    return (
      <div className="editor">
        <ConfigRepair />
      </div>
    );
  }

  const selection = toSelection(selectedBlock, page.templateName);
  const block = selection ? getBlockInConfig(config, selection) : undefined;

  const otherLang = customers
    .find((entry) => entry.name === customer)
    ?.langs.find((entry) => entry !== lang);

  const handleSave = (): void => {
    if (pendingStructuralOps.length > 0 && otherLang) {
      const alsoSync = window.confirm(
        `Appliquer aussi la structure à config.${otherLang}.json ?`,
      );
      void save(alsoSync ? otherLang : undefined);
    } else {
      void save();
    }
  };

  const showBlockFooter = tab === "content" || tab === "json";

  return (
    <div className="editor">
      <div className="editor-header">
        {selectedBlock && (
          <span className="editor-header-type">{blockType(block)}</span>
        )}
        {dirty && (
          <span
            className="editor-dirty-dot"
            title="Modifications non enregistrées"
          />
        )}
      </div>

      <div className="editor-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "content"}
          className={
            tab === "content" ? "editor-tab editor-tab-active" : "editor-tab"
          }
          onClick={() => setTab("content")}
        >
          Contenu
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "json"}
          className={
            tab === "json" ? "editor-tab editor-tab-active" : "editor-tab"
          }
          onClick={() => setTab("json")}
        >
          JSON
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "lang"}
          className={
            tab === "lang" ? "editor-tab editor-tab-active" : "editor-tab"
          }
          onClick={() => setTab("lang")}
        >
          Lang
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "theme"}
          className={
            tab === "theme" ? "editor-tab editor-tab-active" : "editor-tab"
          }
          onClick={() => setTab("theme")}
        >
          Thème
        </button>
      </div>

      {/*
        All four tab panels stay mounted at all times — only visibility
        toggles with `hidden` — so switching tabs never unmounts (and thus
        never discards) the Lang/Theme tabs' local draft state. See
        state.tsx's `dirtySources`, which they use to report that draft
        state back up so the customer/lang switch guards know about it too.
      */}
      <div className="editor-body">
        <div className="editor-tab-panel" hidden={tab !== "content"}>
          {selectedBlock ? (
            <ContentForm block={block} />
          ) : (
            <div className="editor-empty">
              Sélectionnez un bloc dans l'arborescence.
            </div>
          )}
        </div>
        <div className="editor-tab-panel" hidden={tab !== "json"}>
          {selectedBlock ? (
            <JsonEditor block={block} />
          ) : (
            <div className="editor-empty">
              Sélectionnez un bloc dans l'arborescence.
            </div>
          )}
        </div>
        <div className="editor-tab-panel" hidden={tab !== "lang"}>
          <LangTab />
        </div>
        <div className="editor-tab-panel" hidden={tab !== "theme"}>
          <ThemeTab />
        </div>
      </div>

      {showBlockFooter && (
        <div className="editor-footer">
          <button
            type="button"
            className="editor-save"
            disabled={!dirty || saving === "saving"}
            onClick={handleSave}
          >
            Enregistrer
          </button>
          {syncWarning && (
            <span className="editor-sync-warning" role="alert">
              {syncWarning}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Editor;
