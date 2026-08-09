// Pure block-structure operations on a page template's `datas.content` map
// (see tests/ops.test.ts). Kept dependency-free from React/state so it can
// be unit tested in isolation and reused for both the "live" language
// (applyOp) and replaying the same structural change onto the other
// language's differently-keyed content (applyOpByPosition).

export type ContentMap = Record<string, unknown>;

export type BlockOp =
  | { op: "add"; folder: string; block: unknown; afterKey: string | null } // null = append at end
  | { op: "remove"; key: string }
  | { op: "move"; key: string; direction: "up" | "down" }
  | { op: "duplicate"; key: string };

type Entry = [string, unknown];

// Matches the on-disk key convention "<folder>-<n>" (see apt235's
// config.fr.json: "banner-1", "description-1", "description-2", ...).
const KEY_PATTERN = /^(.+)-(\d+)$/;

const parseKey = (key: string): { folder: string; n: number } | null => {
  const match = KEY_PATTERN.exec(key);
  if (!match) return null;
  return { folder: match[1], n: Number(match[2]) };
};

/** Next free "<folder>-<n>" key: n = max existing n for that folder + 1
 * (starts at 1 when the folder has no entries yet). Numbering is scoped
 * per folder, not global. */
const nextFreeKey = (content: ContentMap, folder: string): string => {
  let max = 0;
  for (const key of Object.keys(content)) {
    const parsed = parseKey(key);
    if (parsed && parsed.folder === folder && parsed.n > max) {
      max = parsed.n;
    }
  }
  return `${folder}-${max + 1}`;
};

const folderOfKey = (key: string): string => parseKey(key)?.folder ?? key;

const positionOf = (entries: Entry[], key: string): number =>
  entries.findIndex(([entryKey]) => entryKey === key);

const insertAt = (entries: Entry[], index: number, entry: Entry): Entry[] => [
  ...entries.slice(0, index),
  entry,
  ...entries.slice(index),
];

const toContent = (entries: Entry[]): ContentMap => Object.fromEntries(entries);

/**
 * Applies a single structural operation to `content`, returning a brand
 * new object — `content` (and every value reachable from it) is left
 * untouched. Entry insertion order is the render order, so "move" rebuilds
 * the object with entries swapped rather than mutating in place.
 */
export const applyOp = (content: ContentMap, op: BlockOp): ContentMap => {
  const entries = Object.entries(content);

  switch (op.op) {
    case "add": {
      const newKey = nextFreeKey(content, op.folder);
      const newBlock = structuredClone(op.block);
      const afterIndex =
        op.afterKey === null ? -1 : positionOf(entries, op.afterKey);
      const insertIndex = afterIndex === -1 ? entries.length : afterIndex + 1;
      return toContent(insertAt(entries, insertIndex, [newKey, newBlock]));
    }

    case "remove": {
      return toContent(entries.filter(([key]) => key !== op.key));
    }

    case "move": {
      const index = positionOf(entries, op.key);
      if (index === -1) return toContent(entries);

      const targetIndex = op.direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= entries.length) {
        return toContent(entries); // boundary: no-op
      }

      const next = entries.slice();
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return toContent(next);
    }

    case "duplicate": {
      const index = positionOf(entries, op.key);
      if (index === -1) return toContent(entries);

      const [, value] = entries[index];
      const newKey = nextFreeKey(content, folderOfKey(op.key));
      const cloned = structuredClone(value);
      return toContent(insertAt(entries, index + 1, [newKey, cloned]));
    }

    default: {
      const exhaustive: never = op;
      return exhaustive;
    }
  }
};

/**
 * Replays `op` — already applied to (or computed against) `sourceContent`
 * — onto a differently-keyed `content` belonging to the other language, by
 * POSITION (index in entry order) rather than by key. Used to keep fr/en
 * page structure in sync when the two files' keys have drifted apart.
 *
 * Out-of-range positions degrade gracefully: "add" appends at the end,
 * while "remove"/"move"/"duplicate" are no-ops (still returning a new
 * object, never mutating either input).
 */
export const applyOpByPosition = (
  content: ContentMap,
  op: BlockOp,
  sourceContent: ContentMap,
): ContentMap => {
  const sourceEntries = Object.entries(sourceContent);
  const entries = Object.entries(content);

  switch (op.op) {
    case "add": {
      const sourceAfterIndex =
        op.afterKey === null ? -1 : positionOf(sourceEntries, op.afterKey);
      const sourceInsertIndex =
        sourceAfterIndex === -1 ? sourceEntries.length : sourceAfterIndex + 1;
      // Clamp: if the other language has fewer entries than the computed
      // position, append at its end instead.
      const insertIndex = Math.min(sourceInsertIndex, entries.length);

      const newKey = nextFreeKey(content, op.folder);
      const newBlock = structuredClone(op.block);
      return toContent(insertAt(entries, insertIndex, [newKey, newBlock]));
    }

    case "remove": {
      const index = positionOf(sourceEntries, op.key);
      if (index === -1 || index >= entries.length) return toContent(entries);
      return toContent(entries.filter((_, i) => i !== index));
    }

    case "move": {
      const index = positionOf(sourceEntries, op.key);
      if (index === -1 || index >= entries.length) return toContent(entries);

      const targetIndex = op.direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= entries.length) {
        return toContent(entries); // boundary/out-of-range: no-op
      }

      const next = entries.slice();
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return toContent(next);
    }

    case "duplicate": {
      const index = positionOf(sourceEntries, op.key);
      if (index === -1 || index >= entries.length) return toContent(entries);

      // Clone the OTHER language's own value/key at that position, not the
      // source's — the two languages' content is independently authored.
      const [otherKey, otherValue] = entries[index];
      const newKey = nextFreeKey(content, folderOfKey(otherKey));
      const cloned = structuredClone(otherValue);
      return toContent(insertAt(entries, index + 1, [newKey, cloned]));
    }

    default: {
      const exhaustive: never = op;
      return exhaustive;
    }
  }
};
