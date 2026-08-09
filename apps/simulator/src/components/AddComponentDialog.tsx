import { useEffect, useState } from "react";

import * as api from "../api";
import { useAppState } from "../state";
import type { ContentCatalogEntry } from "../types";

interface AddComponentDialogProps {
  onClose: () => void;
}

/**
 * Modal listing every content component (grouped by design-system folder)
 * fetched once from `getSchemas()`. Picking one inserts its `defaultBlock`
 * (deep-cloned by `applyBlockOp`/`applyOp`) right after the currently
 * selected page block, or at the end when nothing (or a global block) is
 * selected.
 */
function AddComponentDialog({ onClose }: AddComponentDialogProps) {
  const { state, applyBlockOp } = useAppState();
  const [entries, setEntries] = useState<ContentCatalogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .getSchemas()
      .then((all) => {
        if (cancelled) return;
        setEntries(all.filter((entry) => entry.kind === "content"));
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Standard modal convention: Escape closes it, same as the ✕ button.
  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const grouped = new Map<string, ContentCatalogEntry[]>();
  for (const entry of entries) {
    const list = grouped.get(entry.folder);
    if (list) {
      list.push(entry);
    } else {
      grouped.set(entry.folder, [entry]);
    }
  }

  const afterKey =
    state.selectedBlock?.scope === "page" ? state.selectedBlock.key : null;

  const onPick = (entry: ContentCatalogEntry): void => {
    applyBlockOp({
      op: "add",
      folder: entry.folder,
      block: entry.defaultBlock,
      afterKey,
    });
    onClose();
  };

  return (
    <div className="dialog-backdrop">
      <div className="dialog" role="dialog" aria-label="Ajouter un composant">
        <div className="dialog-header">
          <h3>Ajouter un composant</h3>
          <button type="button" aria-label="Fermer" onClick={onClose}>
            ✕
          </button>
        </div>
        {error && <div className="dialog-error">{error}</div>}
        <div className="dialog-body">
          {[...grouped.entries()].map(([folder, list]) => (
            <div key={folder} className="dialog-group">
              <div className="dialog-group-title">{folder}</div>
              <div className="dialog-group-items">
                {list.map((entry) => (
                  <button
                    key={`${entry.folder}-${entry.type}`}
                    type="button"
                    className="dialog-item"
                    onClick={() => onPick(entry)}
                  >
                    {entry.title || entry.type}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddComponentDialog;
