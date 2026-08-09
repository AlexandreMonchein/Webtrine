// Pure form-field inference: turns an arbitrary JSON value (a content
// block) into a description of the inputs ContentForm.tsx should render.
// No React, no I/O — see tests/infer.test.ts.

export type FieldPath = (string | number)[];

type ScalarKind =
  | "text"
  | "textarea"
  | "checkbox"
  | "number"
  | "image"
  | "route"
  | "readonly";

export type Field =
  | { kind: ScalarKind; path: FieldPath; label: string; value: unknown }
  | { kind: "group"; path: FieldPath; label: string; fields: Field[] }
  | { kind: "list"; path: FieldPath; label: string; items: Field[][] };

const ROUTE_KEYS = new Set(["to", "path", "route"]);
const IMAGE_KEY_RE = /^(imageSrc|imgSrc|logo|src|icon)$/;

/** camelCase (or lowercase) key -> spaced, capitalized label. */
const humanize = (key: string): string => {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isRouteString = (key: string, value: string): boolean =>
  ROUTE_KEYS.has(key) || (key === "link" && value.startsWith("/"));

const isImageString = (key: string, value: string, path: FieldPath): boolean =>
  IMAGE_KEY_RE.test(key) || (key === "name" && path.includes("images"));

const classifyString = (
  key: string,
  value: string,
  path: FieldPath,
): "route" | "image" | "textarea" | "text" => {
  if (isRouteString(key, value)) return "route";
  if (isImageString(key, value, path)) return "image";
  if (value.includes("<")) return "textarea";
  return "text";
};

/**
 * Builds the Field for one `[key, value]` entry, recursing into itself for
 * nested objects/arrays. `depth` is the nesting depth of the OBJECT this
 * entry belongs to (0 for the top-level block passed to `inferFields`) —
 * only used for the "'type' is readonly at the root, but not when nested"
 * rule.
 */
const buildField = (
  key: string,
  value: unknown,
  path: FieldPath,
  depth: number,
): Field => {
  const label = humanize(key);

  if (depth === 0 && key === "type") {
    return { kind: "readonly", path, label, value };
  }
  if (value === null || value === undefined) {
    return { kind: "readonly", path, label, value };
  }
  if (typeof value === "boolean") {
    return { kind: "checkbox", path, label, value };
  }
  if (typeof value === "number") {
    return { kind: "number", path, label, value };
  }
  if (typeof value === "string") {
    return { kind: classifyString(key, value, path), path, label, value };
  }
  if (Array.isArray(value)) {
    const isObjectList = value.length > 0 && value.every(isPlainObject);

    const items: Field[][] = isObjectList
      ? value.map((item, index) =>
          Object.entries(item as Record<string, unknown>).map(([k, v]) =>
            buildField(k, v, [...path, index, k], depth + 1),
          ),
        )
      : value.map((item, index) => [
          buildField(key, item, [...path, index], depth + 1),
        ]);

    return { kind: "list", path, label, items };
  }
  if (isPlainObject(value)) {
    const fields = Object.entries(value).map(([k, v]) =>
      buildField(k, v, [...path, k], depth + 1),
    );
    return { kind: "group", path, label, fields };
  }
  // Function, symbol, bigint, etc. — not expected in JSON config, but keep
  // this total rather than throwing.
  return { kind: "readonly", path, label, value };
};

/**
 * Infers the editable fields of a content block. `value` is expected to be
 * a plain object (a block, or a nested object reached while recursing);
 * anything else yields no fields. `path` is prefixed onto every field's
 * `path`, so callers can infer a sub-object in place while keeping full
 * paths relative to the whole block (used by ContentForm for group/list
 * recursion, and matched by `updateBlock`'s path-based writes).
 */
export const inferFields = (value: unknown, path: FieldPath = []): Field[] => {
  if (!isPlainObject(value)) return [];
  return Object.entries(value).map(([key, v]) =>
    buildField(key, v, [...path, key], 0),
  );
};
