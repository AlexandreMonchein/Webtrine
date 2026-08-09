import { useState } from "react";

import { useAppState } from "../state";
import { buildTreeRows } from "../tree-model";
import AddComponentDialog from "./AddComponentDialog";

function Tree() {
  const { state, selectBlock, createPage, applyBlockOp } = useAppState();
  const { config, page, selectedBlock } = state;
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const rows = buildTreeRows(config, page.templateName);
  const globalRows = rows.filter((row) => row.kind === "global");
  const pageRows = rows.filter((row) => row.kind !== "global");
  const pageBlockKeys = pageRows
    .filter((row) => row.kind === "page")
    .map((row) => row.key);
  // A page template exists as soon as buildTreeRows doesn't fall back to the
  // "create page" marker row — including when its content is empty. Also
  // requires a loaded config: with none (e.g. mid-load, or a 422 parse
  // error), `pageRows` is simply empty rather than carrying the marker row,
  // which would otherwise make this true by accident.
  const hasPageTemplate =
    Boolean(config) && !pageRows.some((row) => row.kind === "create-page");

  const isGlobalSelected = (index: number): boolean =>
    selectedBlock?.scope === "global" && selectedBlock.index === index;
  const isPageSelected = (key: string): boolean =>
    selectedBlock?.scope === "page" && selectedBlock.key === key;

  const rowClass = (selected: boolean): string =>
    selected ? "tree-row tree-row-selected" : "tree-row";

  const moveBlock = (
    event: React.MouseEvent,
    key: string,
    direction: "up" | "down",
  ): void => {
    event.stopPropagation();
    applyBlockOp({ op: "move", key, direction });
  };

  const duplicateBlock = (event: React.MouseEvent, key: string): void => {
    event.stopPropagation();
    applyBlockOp({ op: "duplicate", key });
  };

  const removeBlock = (event: React.MouseEvent, key: string): void => {
    event.stopPropagation();
    if (window.confirm(`Supprimer ${key} ?`)) {
      applyBlockOp({ op: "remove", key });
    }
  };

  return (
    <nav className="tree" aria-label="Arborescence">
      <section className="tree-section">
        <h3 className="tree-section-title">GLOBAL</h3>
        <ul className="tree-list">
          {globalRows.map((row) => {
            if (row.kind !== "global") return null;
            const index = row.index;
            const onSelect = () => selectBlock({ scope: "global", index });
            return (
              <li key={`global-${index}`}>
                <button
                  type="button"
                  className={rowClass(isGlobalSelected(index))}
                  onClick={onSelect}
                >
                  {row.label}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="tree-section">
        <h3 className="tree-section-title">PAGE — {page.templateName}</h3>
        <ul className="tree-list">
          {pageRows.map((row) => {
            if (row.kind === "create-page") {
              return (
                <li key="create-page">
                  <button
                    type="button"
                    className="tree-create-page"
                    onClick={() => createPage(page.templateName)}
                  >
                    Créer la page
                  </button>
                </li>
              );
            }
            if (row.kind === "page") {
              const position = pageBlockKeys.indexOf(row.key);
              const isFirst = position === 0;
              const isLast = position === pageBlockKeys.length - 1;
              return (
                <li key={`page-${row.key}`} className="tree-row-wrap">
                  <button
                    type="button"
                    className={rowClass(isPageSelected(row.key))}
                    onClick={() => selectBlock({ scope: "page", key: row.key })}
                  >
                    {row.label}
                  </button>
                  <div className="tree-row-actions">
                    <button
                      type="button"
                      aria-label="Monter"
                      disabled={isFirst}
                      onClick={(event) => moveBlock(event, row.key, "up")}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      aria-label="Descendre"
                      disabled={isLast}
                      onClick={(event) => moveBlock(event, row.key, "down")}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      aria-label="Dupliquer"
                      onClick={(event) => duplicateBlock(event, row.key)}
                    >
                      ⧉
                    </button>
                    <button
                      type="button"
                      aria-label="Supprimer"
                      onClick={(event) => removeBlock(event, row.key)}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              );
            }
            return null;
          })}
        </ul>
        {hasPageTemplate && (
          <button
            type="button"
            className="tree-add-component"
            onClick={() => setAddDialogOpen(true)}
          >
            ＋ Ajouter un composant
          </button>
        )}
      </section>

      {addDialogOpen && (
        <AddComponentDialog onClose={() => setAddDialogOpen(false)} />
      )}
    </nav>
  );
}

export default Tree;
