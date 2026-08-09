import { describe, expect, it } from "vitest";

import { applyOp, applyOpByPosition, type ContentMap } from "../src/ops";

// Real Home-page content from a real customer, apt235 — trimmed to the
// structurally relevant fields (see
// apps/webtrine/config/customer/apt235/config.{fr,en}.json). fr/en happen
// to share identical keys for this customer, but applyOpByPosition must
// not rely on that — it only ever looks at entry order.
const apt235FrHome = (): ContentMap => ({
  "banner-1": { type: "banner", title: "bigLogo_apt235" },
  "description-1": {
    type: "doubleImageDescription",
    leftText: { title: "PRENDRE RENDEZ-VOUS" },
  },
  "description-2": { type: "descriptionB", datas: { title: "LE STUDIO" } },
  "banner-2": { type: "contactBanner", datas: { title: "Gardons contact" } },
});

const apt235EnHome = (): ContentMap => ({
  "banner-1": { type: "banner", title: "bigLogo_apt235" },
  "description-1": {
    type: "doubleImageDescription",
    leftText: { title: "BOOK YOUR APPOINTMENT" },
  },
  "description-2": { type: "descriptionB", datas: { title: "THE STUDIO" } },
  "banner-2": { type: "contactBanner", datas: { title: "Stay in touch" } },
});

describe("fr/en structure sync against a real apt235 Home fixture (manual verification #2)", () => {
  it("add on fr + applyOpByPosition on en: both gain exactly one entry, at the same position", () => {
    const fr = apt235FrHome();
    const en = apt235EnHome();
    const originalFrKeys = Object.keys(fr);
    const originalEnKeys = Object.keys(en);

    const op = {
      op: "add" as const,
      folder: "banner",
      block: { type: "banner", title: "Nouvelle bannière" },
      afterKey: "banner-1", // position 0 in both fr and en
    };

    const frNext = applyOp(fr, op);
    const enNext = applyOpByPosition(en, op, fr);

    // Both gained exactly one entry.
    expect(Object.keys(frNext)).toHaveLength(originalFrKeys.length + 1);
    expect(Object.keys(enNext)).toHaveLength(originalEnKeys.length + 1);

    // Both new entries landed at the same position: index 1 (right after
    // "banner-1", which was at index 0 in both).
    const frNewIndex = Object.keys(frNext).indexOf("banner-3");
    expect(frNewIndex).toBe(1);
    expect(frNext["banner-3"]).toEqual(op.block);

    // en gets its own next-free key for the "banner" folder (independent
    // key numbering per language file), at the very same index.
    const enKeysAfter = Object.keys(enNext);
    expect(enKeysAfter[1]).toBe("banner-3");
    expect(enNext["banner-3"]).toEqual(op.block);

    // Every pre-existing entry, in both languages, kept its own value and
    // relative order — only the new entry was inserted.
    expect(Object.keys(frNext).filter((k) => k !== "banner-3")).toEqual(
      originalFrKeys,
    );
    expect(Object.keys(enNext).filter((k) => k !== "banner-3")).toEqual(
      originalEnKeys,
    );
    for (const key of originalFrKeys) expect(frNext[key]).toEqual(fr[key]);
    for (const key of originalEnKeys) expect(enNext[key]).toEqual(en[key]);

    // Inputs untouched.
    expect(fr).toEqual(apt235FrHome());
    expect(en).toEqual(apt235EnHome());
  });
});
