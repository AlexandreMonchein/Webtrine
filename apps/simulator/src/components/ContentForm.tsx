import { useEffect, useState } from "react";

import * as api from "../api";
import { type Field, type FieldPath, inferFields } from "../form/infer";
import { PAGE_ROUTES } from "../routes";
import { useAppState } from "../state";

const ASSETS_DATALIST_ID = "sim-assets-datalist";
const ROUTES_DATALIST_ID = "sim-routes-datalist";

/** Reads the raw value at `path` inside `value` — the mirror of
 * `setAtPath` in state.tsx, used here to read a list field's current
 * array (Field trees don't carry the raw array itself, only its inferred
 * per-item Field[] rows). */
const getAtPath = (value: unknown, path: FieldPath): unknown => {
  let current: unknown = value;
  for (const segment of path) {
    if (current === null || current === undefined) return undefined;
    if (Array.isArray(current)) {
      current = current[Number(segment)];
    } else if (typeof current === "object") {
      current = (current as Record<string, unknown>)[String(segment)];
    } else {
      return undefined;
    }
  }
  return current;
};

/** Deep-clones a value, resetting every primitive to an empty default
 * (strings → "", booleans → false, numbers → 0) while keeping the
 * structure — used to seed a new list item from the first one. */
const blankClone = (value: unknown): unknown => {
  if (typeof value === "string") return "";
  if (typeof value === "boolean") return false;
  if (typeof value === "number") return 0;
  if (Array.isArray(value)) return value.map(blankClone);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, v]) => [
        key,
        blankClone(v),
      ]),
    );
  }
  return value;
};

const moveItem = (arr: unknown[], from: number, to: number): unknown[] => {
  if (to < 0 || to >= arr.length) return arr;
  const copy = arr.slice();
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
};

interface FieldEditorProps {
  field: Field;
  block: unknown;
  onUpdate: (path: FieldPath, value: unknown) => void;
}

function FieldEditor({ field, block, onUpdate }: FieldEditorProps) {
  if (field.kind === "group") {
    return (
      <fieldset className="field-group">
        <legend>{field.label}</legend>
        {field.fields.map((sub) => (
          <FieldEditor
            key={sub.path.join(".")}
            field={sub}
            block={block}
            onUpdate={onUpdate}
          />
        ))}
      </fieldset>
    );
  }

  if (field.kind === "list") {
    const rawArray = getAtPath(block, field.path);
    const rawItems: unknown[] = Array.isArray(rawArray) ? rawArray : [];

    const addItem = (): void => {
      if (rawItems.length === 0) return;
      onUpdate(field.path, [...rawItems, blankClone(rawItems[0])]);
    };
    const removeAt = (index: number): void => {
      onUpdate(
        field.path,
        rawItems.filter((_, i) => i !== index),
      );
    };
    const moveAt = (index: number, delta: number): void => {
      onUpdate(field.path, moveItem(rawItems, index, index + delta));
    };

    return (
      <div className="field-list">
        <div className="field-list-label">{field.label}</div>
        {field.items.map((row, index) => (
          <div className="field-list-item" key={index}>
            <div className="field-list-item-fields">
              {row.map((sub) => (
                <FieldEditor
                  key={sub.path.join(".")}
                  field={sub}
                  block={block}
                  onUpdate={onUpdate}
                />
              ))}
            </div>
            <div className="field-list-item-controls">
              <button
                type="button"
                aria-label="Monter"
                disabled={index === 0}
                onClick={() => moveAt(index, -1)}
              >
                ↑
              </button>
              <button
                type="button"
                aria-label="Descendre"
                disabled={index === field.items.length - 1}
                onClick={() => moveAt(index, 1)}
              >
                ↓
              </button>
              <button
                type="button"
                aria-label="Supprimer"
                onClick={() => removeAt(index)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="field-list-add"
          disabled={rawItems.length === 0}
          onClick={addItem}
        >
          ＋ Ajouter
        </button>
      </div>
    );
  }

  if (field.kind === "readonly") {
    return (
      <div className="field-row">
        <label>{field.label}</label>
        <div className="field-readonly">{String(field.value ?? "")}</div>
      </div>
    );
  }

  if (field.kind === "checkbox") {
    return (
      <div className="field-row field-row-checkbox">
        <label>
          <input
            type="checkbox"
            checked={Boolean(field.value)}
            onChange={(event) => onUpdate(field.path, event.target.checked)}
          />
          {field.label}
        </label>
      </div>
    );
  }

  if (field.kind === "number") {
    const value = typeof field.value === "number" ? field.value : 0;
    return (
      <div className="field-row">
        <label>{field.label}</label>
        <input
          type="number"
          value={value}
          onChange={(event) => onUpdate(field.path, Number(event.target.value))}
        />
      </div>
    );
  }

  const stringValue = typeof field.value === "string" ? field.value : "";

  if (field.kind === "textarea") {
    return (
      <div className="field-row">
        <label>{field.label}</label>
        <textarea
          value={stringValue}
          onChange={(event) => onUpdate(field.path, event.target.value)}
        />
      </div>
    );
  }

  if (field.kind === "image") {
    return (
      <div className="field-row">
        <label>{field.label}</label>
        <input
          type="text"
          list={ASSETS_DATALIST_ID}
          value={stringValue}
          onChange={(event) => onUpdate(field.path, event.target.value)}
        />
      </div>
    );
  }

  if (field.kind === "route") {
    return (
      <div className="field-row">
        <label>{field.label}</label>
        <input
          type="text"
          list={ROUTES_DATALIST_ID}
          value={stringValue}
          onChange={(event) => onUpdate(field.path, event.target.value)}
        />
      </div>
    );
  }

  // "text"
  return (
    <div className="field-row">
      <label>{field.label}</label>
      <input
        type="text"
        value={stringValue}
        onChange={(event) => onUpdate(field.path, event.target.value)}
      />
    </div>
  );
}

interface ContentFormProps {
  block: unknown;
}

function ContentForm({ block }: ContentFormProps) {
  const { state, updateBlock } = useAppState();
  const [assets, setAssets] = useState<string[]>([]);

  // Fed once per customer (not re-fetched on every block switch).
  useEffect(() => {
    let cancelled = false;
    if (!state.customer) {
      setAssets([]);
      return undefined;
    }
    api
      .getAssets(state.customer)
      .then((list) => {
        if (!cancelled) setAssets(list);
      })
      .catch(() => {
        if (!cancelled) setAssets([]);
      });
    return () => {
      cancelled = true;
    };
  }, [state.customer]);

  const fields = inferFields(block);

  return (
    <div className="content-form">
      <datalist id={ASSETS_DATALIST_ID}>
        {assets.map((asset) => (
          <option key={asset} value={asset} />
        ))}
      </datalist>
      <datalist id={ROUTES_DATALIST_ID}>
        {PAGE_ROUTES.map((route) => (
          <option key={route.path} value={route.path} />
        ))}
      </datalist>
      {fields.map((field) => (
        <FieldEditor
          key={field.path.join(".")}
          field={field}
          block={block}
          onUpdate={updateBlock}
        />
      ))}
    </div>
  );
}

export default ContentForm;
