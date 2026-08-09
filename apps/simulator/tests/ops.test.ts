import { describe, expect, it } from "vitest";

import { applyOp, applyOpByPosition, type ContentMap } from "../src/ops";

// Modeled on the real apt235 Home page content shape (see
// apps/webtrine/config/customer/apt235/config.fr.json): keys are
// "<folder>-<n>", folder groups related component types.
const buildContent = (): ContentMap => ({
  "banner-1": { type: "banner", title: "Bienvenue" },
  "description-1": { type: "doubleImageDescription", title: "Prendre RDV" },
  "description-2": { type: "descriptionB", title: "Le studio" },
});

describe("applyOp — add", () => {
  it("appends at the end and generates the next free key for the folder", () => {
    const content = buildContent();
    const original = structuredClone(content);
    const block = { type: "banner", title: "Nouveau" };

    const next = applyOp(content, {
      op: "add",
      folder: "banner",
      block,
      afterKey: null,
    });

    expect(content).toEqual(original); // input untouched
    expect(Object.keys(next)).toEqual([
      "banner-1",
      "description-1",
      "description-2",
      "banner-2",
    ]);
    expect(next["banner-2"]).toEqual(block);
  });

  it("generates banner-2 when only banner-1 exists (numbering scoped per folder)", () => {
    const content = buildContent();

    const next = applyOp(content, {
      op: "add",
      folder: "banner",
      block: { type: "contactBanner" },
      afterKey: null,
    });

    expect(next["banner-2"]).toEqual({ type: "contactBanner" });
  });

  it("inserts right after afterKey, not at the end", () => {
    const content = buildContent();
    const block = { type: "banner", title: "Milieu" };

    const next = applyOp(content, {
      op: "add",
      folder: "banner",
      block,
      afterKey: "banner-1",
    });

    expect(Object.keys(next)).toEqual([
      "banner-1",
      "banner-2",
      "description-1",
      "description-2",
    ]);
  });

  it("does not mutate the block passed in (deep clone)", () => {
    const content = buildContent();
    const block = { type: "banner", nested: { title: "Original" } };

    const next = applyOp(content, {
      op: "add",
      folder: "banner",
      block,
      afterKey: null,
    });

    (next["banner-2"] as { nested: { title: string } }).nested.title =
      "Modifié";
    expect(block.nested.title).toBe("Original");
  });

  it("falls back to appending at the end when afterKey does not exist", () => {
    const content = buildContent();

    const next = applyOp(content, {
      op: "add",
      folder: "banner",
      block: { type: "banner" },
      afterKey: "does-not-exist",
    });

    expect(Object.keys(next)).toEqual([
      "banner-1",
      "description-1",
      "description-2",
      "banner-2",
    ]);
  });
});

describe("applyOp — remove", () => {
  it("drops the given key and returns a new object", () => {
    const content = buildContent();
    const original = structuredClone(content);

    const next = applyOp(content, { op: "remove", key: "description-1" });

    expect(content).toEqual(original); // input untouched
    expect(Object.keys(next)).toEqual(["banner-1", "description-2"]);
  });

  it("is a no-op (new object, same contents) when the key does not exist", () => {
    const content = buildContent();

    const next = applyOp(content, { op: "remove", key: "does-not-exist" });

    expect(next).toEqual(content);
    expect(next).not.toBe(content);
  });
});

describe("applyOp — move", () => {
  it("moves a key up, swapping order with its predecessor", () => {
    const content = buildContent();

    const next = applyOp(content, {
      op: "move",
      key: "description-1",
      direction: "up",
    });

    expect(Object.keys(next)).toEqual([
      "description-1",
      "banner-1",
      "description-2",
    ]);
  });

  it("moves a key down, swapping order with its successor", () => {
    const content = buildContent();

    const next = applyOp(content, {
      op: "move",
      key: "description-1",
      direction: "down",
    });

    expect(Object.keys(next)).toEqual([
      "banner-1",
      "description-2",
      "description-1",
    ]);
  });

  it("is a no-op at the top boundary (moving the first key up)", () => {
    const content = buildContent();

    const next = applyOp(content, {
      op: "move",
      key: "banner-1",
      direction: "up",
    });

    expect(Object.keys(next)).toEqual(Object.keys(content));
    expect(next).not.toBe(content);
  });

  it("is a no-op at the bottom boundary (moving the last key down)", () => {
    const content = buildContent();

    const next = applyOp(content, {
      op: "move",
      key: "description-2",
      direction: "down",
    });

    expect(Object.keys(next)).toEqual(Object.keys(content));
  });

  it("does not mutate the input", () => {
    const content = buildContent();
    const original = structuredClone(content);

    applyOp(content, { op: "move", key: "description-1", direction: "up" });

    expect(content).toEqual(original);
  });
});

describe("applyOp — duplicate", () => {
  it("clones the block deeply and lands right after the source key", () => {
    const content = buildContent();
    const original = structuredClone(content);

    const next = applyOp(content, { op: "duplicate", key: "banner-1" });

    expect(content).toEqual(original); // input untouched
    expect(Object.keys(next)).toEqual([
      "banner-1",
      "banner-2",
      "description-1",
      "description-2",
    ]);
    expect(next["banner-2"]).toEqual(content["banner-1"]);
  });

  it("mutating the clone does not affect the source block", () => {
    const content: ContentMap = {
      "banner-1": { type: "banner", nested: { title: "Original" } },
    };

    const next = applyOp(content, { op: "duplicate", key: "banner-1" });
    (next["banner-2"] as { nested: { title: string } }).nested.title =
      "Modifié";

    expect(
      (content["banner-1"] as { nested: { title: string } }).nested.title,
    ).toBe("Original");
  });

  it("is a no-op (new object, same contents) when the key does not exist", () => {
    const content = buildContent();

    const next = applyOp(content, { op: "duplicate", key: "does-not-exist" });

    expect(next).toEqual(content);
    expect(next).not.toBe(content);
  });
});

// ---------------------------------------------------------------------------
// applyOpByPosition — replays a BlockOp computed against one language's
// content onto the OTHER language's (differently-keyed) content, by index
// in entry order rather than by key.
// ---------------------------------------------------------------------------

describe("applyOpByPosition", () => {
  // fr content (the language the op was actually computed against).
  const frContent = (): ContentMap => ({
    "banner-1": { type: "banner", title: "Bienvenue" },
    "description-1": { type: "doubleImageDescription", title: "Prendre RDV" },
    "description-2": { type: "descriptionB", title: "Le studio" },
  });

  // en content: same structural shape, differently-keyed values (as if
  // edited independently) — position-based replay must not assume the keys
  // match between languages.
  const enContent = (): ContentMap => ({
    "banner-1": { type: "banner", title: "Welcome" },
    "description-1": { type: "doubleImageDescription", title: "Book now" },
    "description-2": { type: "descriptionB", title: "The studio" },
  });

  it("replays an add-at-end onto the other language, appending at the end", () => {
    const source = frContent();
    const op = {
      op: "add" as const,
      folder: "banner",
      block: { type: "banner", title: "Nouveau" },
      afterKey: null,
    };
    const frNext = applyOp(source, op);

    const enNext = applyOpByPosition(enContent(), op, source);

    expect(Object.keys(enNext)).toEqual(Object.keys(frNext));
    expect(enNext["banner-2"]).toEqual({ type: "banner", title: "Nouveau" });
  });

  it("replays an add-after-key onto the other language by position, not by key", () => {
    const source = frContent();
    const op = {
      op: "add" as const,
      folder: "banner",
      block: { type: "banner", title: "Milieu" },
      afterKey: "banner-1", // position 0 in fr
    };

    const enNext = applyOpByPosition(enContent(), op, source);

    // Inserted after index 0 in en too, regardless of en's own key names.
    expect(Object.keys(enNext)).toEqual([
      "banner-1",
      "banner-2",
      "description-1",
      "description-2",
    ]);
    expect(enNext["banner-2"]).toEqual({ type: "banner", title: "Milieu" });
  });

  it("replays a remove onto the other language by position", () => {
    const source = frContent();
    const op = { op: "remove" as const, key: "description-1" }; // position 1

    const enNext = applyOpByPosition(enContent(), op, source);

    expect(Object.keys(enNext)).toEqual(["banner-1", "description-2"]);
    // The removed en entry is en's own (position 1), not fr's key.
    expect(enNext).not.toHaveProperty("description-1");
  });

  it("replays a move up onto the other language by position", () => {
    const source = frContent();
    const op = {
      op: "move" as const,
      key: "description-1",
      direction: "up" as const,
    }; // position 1 -> swaps with position 0

    const enNext = applyOpByPosition(enContent(), op, source);

    expect(Object.keys(enNext)).toEqual([
      "description-1",
      "banner-1",
      "description-2",
    ]);
  });

  it("replays a move down onto the other language by position", () => {
    const source = frContent();
    const op = {
      op: "move" as const,
      key: "description-1",
      direction: "down" as const,
    }; // position 1 -> swaps with position 2

    const enNext = applyOpByPosition(enContent(), op, source);

    expect(Object.keys(enNext)).toEqual([
      "banner-1",
      "description-2",
      "description-1",
    ]);
  });

  it("replays a duplicate onto the other language by position, cloning the OTHER language's own value", () => {
    const source = frContent();
    const op = { op: "duplicate" as const, key: "banner-1" }; // position 0

    const enNext = applyOpByPosition(enContent(), op, source);

    expect(Object.keys(enNext)).toEqual([
      "banner-1",
      "banner-2",
      "description-1",
      "description-2",
    ]);
    // Clones en's own "Welcome" value, not fr's "Bienvenue".
    expect(enNext["banner-2"]).toEqual({ type: "banner", title: "Welcome" });
  });

  it("gracefully appends when the other content has fewer entries than the add position", () => {
    const source = frContent(); // 3 entries
    const shortEn: ContentMap = { "banner-1": { type: "banner", title: "Hi" } };
    const op = {
      op: "add" as const,
      folder: "banner",
      block: { type: "banner", title: "Nouveau" },
      afterKey: "description-2", // position 2 in fr -> insert at index 3
    };

    const enNext = applyOpByPosition(shortEn, op, source);

    expect(Object.keys(enNext)).toEqual(["banner-1", "banner-2"]);
  });

  it("is a no-op when the other content has fewer entries than a remove position", () => {
    const source = frContent(); // description-2 at position 2
    const shortEn: ContentMap = { "banner-1": { type: "banner", title: "Hi" } };
    const op = { op: "remove" as const, key: "description-2" };

    const enNext = applyOpByPosition(shortEn, op, source);

    expect(enNext).toEqual(shortEn);
    expect(enNext).not.toBe(shortEn);
  });

  it("is a no-op when the other content has fewer entries than a move position", () => {
    const source = frContent();
    const shortEn: ContentMap = { "banner-1": { type: "banner", title: "Hi" } };
    const op = {
      op: "move" as const,
      key: "description-2",
      direction: "up" as const,
    };

    const enNext = applyOpByPosition(shortEn, op, source);

    expect(enNext).toEqual(shortEn);
  });

  it("is a no-op when the other content has fewer entries than a duplicate position", () => {
    const source = frContent();
    const shortEn: ContentMap = { "banner-1": { type: "banner", title: "Hi" } };
    const op = { op: "duplicate" as const, key: "description-2" };

    const enNext = applyOpByPosition(shortEn, op, source);

    expect(enNext).toEqual(shortEn);
  });

  it("does not mutate content or sourceContent", () => {
    const source = frContent();
    const other = enContent();
    const sourceCopy = structuredClone(source);
    const otherCopy = structuredClone(other);
    const op = { op: "remove" as const, key: "description-1" };

    applyOpByPosition(other, op, source);

    expect(source).toEqual(sourceCopy);
    expect(other).toEqual(otherCopy);
  });
});
