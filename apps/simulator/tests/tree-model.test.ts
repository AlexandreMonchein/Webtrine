import { describe, expect, it } from "vitest";

import { buildTreeRows } from "../src/tree-model";
import type { AppConfig } from "../src/types";

// Modeled on the real apt235 config shape: a navbar, several page templates
// (Home populated, Contact empty datas.content, Faq template missing
// entirely), two "legals" globals (one where id === type — must NOT get a
// redundant "/legals" suffix), and a footer.
const buildConfig = (): AppConfig => ({
  client: { name: "apt235" },
  layout: {
    features: {},
    templates: [
      {
        type: "navbars",
        id: "clearGlassNavbar",
        datas: { logo: "logo_apt235", links: [] },
      },
      {
        type: "description",
        id: "multiDescriptions",
        name: "Home",
        datas: {
          title: "",
          content: {
            "banner-1": {
              type: "banner",
              title: "bigLogo_apt235",
              images: [{ name: "banner_1" }],
            },
            "description-1": {
              type: "doubleImageDescription",
              leftText: { title: "PRENDRE RENDEZ-VOUS" },
            },
            "description-2": {
              type: "descriptionB",
              datas: { title: "LE STUDIO" },
            },
            "banner-2": {
              type: "contactBanner",
              datas: { title: "Gardons contact" },
            },
          },
        },
      },
      {
        type: "description",
        id: "multiDescriptions",
        name: "Contact",
        datas: { title: "", content: {} },
      },
      {
        type: "legals",
        id: "mentions-legals",
        datas: {},
      },
      {
        type: "legals",
        id: "legals",
        datas: {},
      },
      {
        type: "footers",
        id: "classicFooter",
        datas: {},
      },
    ],
  },
});

describe("buildTreeRows", () => {
  it("lists global rows with the original index into layout.templates", () => {
    const rows = buildTreeRows(buildConfig(), "Home");
    const globals = rows.filter((row) => row.kind === "global");

    expect(globals).toEqual([
      { kind: "global", index: 0, label: "navbars/clearGlassNavbar" },
      { kind: "global", index: 3, label: "legals/mentions-legals" },
      // id === type: no redundant "/legals" suffix.
      { kind: "global", index: 4, label: "legals" },
      { kind: "global", index: 5, label: "footers/classicFooter" },
    ]);
  });

  it("lists the current page's content blocks in key order", () => {
    const rows = buildTreeRows(buildConfig(), "Home");
    const pageRows = rows.filter((row) => row.kind === "page");

    expect(pageRows).toEqual([
      { kind: "page", key: "banner-1", label: "banner-1 · banner" },
      {
        kind: "page",
        key: "description-1",
        label: "description-1 · doubleImageDescription",
      },
      {
        kind: "page",
        key: "description-2",
        label: "description-2 · descriptionB",
      },
      { kind: "page", key: "banner-2", label: "banner-2 · contactBanner" },
    ]);
  });

  it("switching to a page whose template has empty content yields no page rows (and no create-page marker)", () => {
    const rows = buildTreeRows(buildConfig(), "Contact");
    const pageRows = rows.filter((row) => row.kind !== "global");

    expect(pageRows).toEqual([]);
  });

  it("yields a create-page marker row when the page has no template at all", () => {
    const rows = buildTreeRows(buildConfig(), "Faq");
    const last = rows[rows.length - 1];

    expect(last).toEqual({ kind: "create-page" });
    // Still no page rows before it.
    expect(rows.filter((row) => row.kind === "page")).toEqual([]);
  });

  it("returns only global rows for a null config", () => {
    expect(buildTreeRows(null, "Home")).toEqual([]);
  });
});
