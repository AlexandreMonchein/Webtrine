// Pure model for LangTab.tsx (see tests/lang-model.test.ts) — no rendering,
// no state, so it can be unit tested without a DOM. Lang files are nested
// objects bottoming out in string leaves (see
// apps/webtrine/lang/customer/*/{fr,en}.json).

export interface LangLeaf {
  path: string[];
  value: string | null;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const toLeafValue = (value: unknown): string | null => {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return null;
  return String(value);
};

/**
 * Walks a lang object depth-first, returning one entry per leaf (a
 * non-object value) with the dot-path of keys leading to it, in traversal
 * (insertion) order.
 */
export const flattenLangKeys = (obj: unknown): LangLeaf[] => {
  const leaves: LangLeaf[] = [];

  const walk = (node: unknown, path: string[]): void => {
    if (isPlainObject(node)) {
      for (const [key, value] of Object.entries(node)) {
        walk(value, [...path, key]);
      }
      return;
    }
    leaves.push({ path, value: toLeafValue(node) });
  };

  walk(obj, []);
  return leaves;
};

const dotPath = (path: string[]): string => path.join(".");

/** Dot-paths present as a leaf in `a` but absent (as a leaf) in `b`. Not
 * symmetric — call twice (swapping a/b) to check both directions. */
export const missingKeys = (a: unknown, b: unknown): string[] => {
  const bPaths = new Set(flattenLangKeys(b).map((leaf) => dotPath(leaf.path)));
  return flattenLangKeys(a)
    .map((leaf) => dotPath(leaf.path))
    .filter((path) => !bPaths.has(path));
};
