import { describe, expect, it } from "vitest";

import { type Field, inferFields } from "../src/form/infer";

// Real shapes, modeled on apt235's config (see apps/webtrine/config/customer/apt235).

describe("inferFields — description-like block", () => {
  const block = {
    type: "description",
    title: "Bienvenue",
    features: {
      multi: false,
      medium: true,
    },
    content: [
      { type: "paragraph", text: "Texte simple" },
      { type: "paragraph", text: "Texte avec <strong>gras</strong>" },
    ],
    images: [
      { name: "photo_1", alt: "Vue du studio" },
      { name: "photo_2", alt: "Salle d'attente" },
    ],
  };

  const fields = inferFields(block);
  const byKey = (key: string): Field =>
    fields.find((f) => f.path[f.path.length - 1] === key)!;

  it("treats the root 'type' key as readonly", () => {
    const field = byKey("type");
    expect(field.kind).toBe("readonly");
    expect(field.path).toEqual(["type"]);
    expect(field.label).toBe("Type");
    if (field.kind === "readonly") expect(field.value).toBe("description");
  });

  it("treats a plain string field as text", () => {
    const field = byKey("title");
    expect(field.kind).toBe("text");
    expect(field.label).toBe("Title");
    if (field.kind === "text") expect(field.value).toBe("Bienvenue");
  });

  it("treats a nested object as a group of its own inferred fields", () => {
    const field = byKey("features");
    expect(field.kind).toBe("group");
    expect(field.label).toBe("Features");
    if (field.kind !== "group") throw new Error("expected group");

    expect(field.fields).toEqual([
      {
        kind: "checkbox",
        path: ["features", "multi"],
        label: "Multi",
        value: false,
      },
      {
        kind: "checkbox",
        path: ["features", "medium"],
        label: "Medium",
        value: true,
      },
    ]);
  });

  it("treats an array of objects as a list, inferring each item's own fields", () => {
    const field = byKey("content");
    expect(field.kind).toBe("list");
    expect(field.label).toBe("Content");
    if (field.kind !== "list") throw new Error("expected list");

    expect(field.items).toHaveLength(2);

    // Plain text with no markup.
    expect(field.items[0]).toEqual([
      {
        kind: "text",
        path: ["content", 0, "type"],
        label: "Type",
        value: "paragraph",
      },
      {
        kind: "text",
        path: ["content", 0, "text"],
        label: "Text",
        value: "Texte simple",
      },
    ]);

    // Contains "<" → textarea, not text.
    expect(field.items[1][1]).toEqual({
      kind: "textarea",
      path: ["content", 1, "text"],
      label: "Text",
      value: "Texte avec <strong>gras</strong>",
    });
  });

  it("nested 'type' keys (not at depth 0) are NOT readonly — they stay text", () => {
    const field = byKey("content");
    if (field.kind !== "list") throw new Error("expected list");
    const nestedType = field.items[0][0];
    expect(nestedType.kind).toBe("text");
    expect(nestedType.kind).not.toBe("readonly");
  });

  it("infers image for 'name' only inside an images[] context, and text for 'alt'", () => {
    const field = byKey("images");
    if (field.kind !== "list") throw new Error("expected list");

    expect(field.items[0]).toEqual([
      {
        kind: "image",
        path: ["images", 0, "name"],
        label: "Name",
        value: "photo_1",
      },
      {
        kind: "text",
        path: ["images", 0, "alt"],
        label: "Alt",
        value: "Vue du studio",
      },
    ]);
  });
});

describe("inferFields — banner block", () => {
  const block = {
    type: "banner",
    features: {
      multi: false,
      medium: false,
      mask: false,
      logoAsTitle: true,
    },
    title: "bigLogo_apt235",
    images: [{ name: "banner_1" }],
    textPosition: "center",
  };

  const fields = inferFields(block);
  const byKey = (key: string): Field =>
    fields.find((f) => f.path[f.path.length - 1] === key)!;

  it("root type is readonly", () => {
    expect(byKey("type").kind).toBe("readonly");
  });

  it("features is a group of checkboxes, humanized camelCase label", () => {
    const field = byKey("features");
    if (field.kind !== "group") throw new Error("expected group");
    const logoAsTitle = field.fields.find(
      (f) => f.path[f.path.length - 1] === "logoAsTitle",
    )!;
    expect(logoAsTitle).toEqual({
      kind: "checkbox",
      path: ["features", "logoAsTitle"],
      label: "Logo As Title",
      value: true,
    });
  });

  it("images[].name is image kind even with a single-item array", () => {
    const field = byKey("images");
    if (field.kind !== "list") throw new Error("expected list");
    expect(field.items[0][0]).toEqual({
      kind: "image",
      path: ["images", 0, "name"],
      label: "Name",
      value: "banner_1",
    });
  });

  it("plain strings outside route/image contexts are text", () => {
    expect(byKey("title")).toEqual({
      kind: "text",
      path: ["title"],
      label: "Title",
      value: "bigLogo_apt235",
    });
    expect(byKey("textPosition")).toEqual({
      kind: "text",
      path: ["textPosition"],
      label: "Text Position",
      value: "center",
    });
  });
});

describe("inferFields — navbar-like block with a links array", () => {
  const block = {
    type: "navbars",
    logo: "logo_apt235",
    links: [
      { label: "Accueil", path: "/" },
      { label: "Réserver un tattoo", path: "/contact" },
    ],
  };

  const fields = inferFields(block);
  const byKey = (key: string): Field =>
    fields.find((f) => f.path[f.path.length - 1] === key)!;

  it("'logo' key is an image field even outside an images[] array", () => {
    expect(byKey("logo")).toEqual({
      kind: "image",
      path: ["logo"],
      label: "Logo",
      value: "logo_apt235",
    });
  });

  it("links[].label is text and links[].path is route", () => {
    const field = byKey("links");
    if (field.kind !== "list") throw new Error("expected list");

    expect(field.items[0]).toEqual([
      {
        kind: "text",
        path: ["links", 0, "label"],
        label: "Label",
        value: "Accueil",
      },
      { kind: "route", path: ["links", 0, "path"], label: "Path", value: "/" },
    ]);
    expect(field.items[1][1]).toEqual({
      kind: "route",
      path: ["links", 1, "path"],
      label: "Path",
      value: "/contact",
    });
  });
});

describe("inferFields — number field", () => {
  it("infers a plain number as kind 'number', humanizing its camelCase key", () => {
    const fields = inferFields({ type: "slider", intervalBetweenImages: 5000 });
    const field = fields.find(
      (f) => f.path[f.path.length - 1] === "intervalBetweenImages",
    )!;

    expect(field).toEqual({
      kind: "number",
      path: ["intervalBetweenImages"],
      label: "Interval Between Images",
      value: 5000,
    });
  });
});

describe("inferFields — 'link' key special case", () => {
  it("is a route only when the value starts with '/'", () => {
    const internal = inferFields({ link: "/contact" });
    expect(internal[0]).toEqual({
      kind: "route",
      path: ["link"],
      label: "Link",
      value: "/contact",
    });

    const external = inferFields({ link: "https://example.com" });
    expect(external[0]).toEqual({
      kind: "text",
      path: ["link"],
      label: "Link",
      value: "https://example.com",
    });
  });
});

describe("inferFields — array of primitives", () => {
  it("produces a list whose items each hold a single field", () => {
    const fields = inferFields({ keywords: ["tattoo", "bordeaux"] });
    const field = fields[0];
    expect(field.kind).toBe("list");
    if (field.kind !== "list") throw new Error("expected list");

    expect(field.items).toEqual([
      [
        {
          kind: "text",
          path: ["keywords", 0],
          label: "Keywords",
          value: "tattoo",
        },
      ],
      [
        {
          kind: "text",
          path: ["keywords", 1],
          label: "Keywords",
          value: "bordeaux",
        },
      ],
    ]);
  });
});

describe("inferFields — null/undefined values", () => {
  it("treats null and undefined as readonly", () => {
    const fields = inferFields({ subtitle: null, note: undefined });
    expect(fields).toEqual([
      { kind: "readonly", path: ["subtitle"], label: "Subtitle", value: null },
      { kind: "readonly", path: ["note"], label: "Note", value: undefined },
    ]);
  });
});

describe("inferFields — edge cases", () => {
  it("returns an empty array for non-object top-level input", () => {
    expect(inferFields(null)).toEqual([]);
    expect(inferFields(undefined)).toEqual([]);
    expect(inferFields("hello")).toEqual([]);
    expect(inferFields(42)).toEqual([]);
    expect(inferFields([1, 2, 3])).toEqual([]);
  });

  it("prefixes paths with the base path argument", () => {
    const fields = inferFields({ title: "Salut" }, ["content", "banner-1"]);
    expect(fields).toEqual([
      {
        kind: "text",
        path: ["content", "banner-1", "title"],
        label: "Title",
        value: "Salut",
      },
    ]);
  });
});
