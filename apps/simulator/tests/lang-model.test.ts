import { describe, expect, it } from "vitest";

import { flattenLangKeys, missingKeys } from "../src/lang-model";

// Modeled on the real apt235 lang shape (see
// apps/webtrine/lang/customer/apt235/{fr,en}.json): nested objects bottoming
// out in string leaves.
const buildFr = () => ({
  contact: {
    title: "Nous contacter",
    name: "NOM COMPLET",
    tattoo: {
      title: "DEMANDE DE TATOUAGE",
      size: "TAILLE DU TATOUAGE",
    },
  },
  alertView: {
    contact: {
      close: "Fermer",
    },
  },
});

describe("flattenLangKeys", () => {
  it("flattens nested objects into dot-path leaves in traversal order", () => {
    const leaves = flattenLangKeys(buildFr());

    expect(leaves).toEqual([
      { path: ["contact", "title"], value: "Nous contacter" },
      { path: ["contact", "name"], value: "NOM COMPLET" },
      { path: ["contact", "tattoo", "title"], value: "DEMANDE DE TATOUAGE" },
      { path: ["contact", "tattoo", "size"], value: "TAILLE DU TATOUAGE" },
      { path: ["alertView", "contact", "close"], value: "Fermer" },
    ]);
  });

  it("treats a null leaf value as null (not the string 'null')", () => {
    const leaves = flattenLangKeys({ a: { b: null } });

    expect(leaves).toEqual([{ path: ["a", "b"], value: null }]);
  });

  it("returns an empty array for an empty object", () => {
    expect(flattenLangKeys({})).toEqual([]);
  });
});

describe("missingKeys", () => {
  it("returns dot-paths present in a but absent in b", () => {
    const a = {
      contact: { title: "Nous contacter", extraFr: "Seulement en fr" },
    };
    const b = {
      contact: { title: "Contact us" },
    };

    expect(missingKeys(a, b)).toEqual(["contact.extraFr"]);
  });

  it("is not symmetric: a key missing from a but present in b is not reported", () => {
    const a = { contact: { title: "Nous contacter" } };
    const b = { contact: { title: "Contact us", extraEn: "English only" } };

    expect(missingKeys(a, b)).toEqual([]);
    expect(missingKeys(b, a)).toEqual(["contact.extraEn"]);
  });

  it("reports keys missing at any nesting depth", () => {
    const a = {
      contact: { tattoo: { title: "DEMANDE DE TATOUAGE", size: "TAILLE" } },
    };
    const b = { contact: { tattoo: { title: "TATTOO REQUEST" } } };

    expect(missingKeys(a, b)).toEqual(["contact.tattoo.size"]);
  });

  it("returns an empty array when both sides have identical key sets", () => {
    const fr = buildFr();
    const en = {
      contact: {
        title: "Contact us",
        name: "FULL NAME",
        tattoo: { title: "TATTOO REQUEST", size: "TATTOO SIZE" },
      },
      alertView: { contact: { close: "Close" } },
    };

    expect(missingKeys(fr, en)).toEqual([]);
    expect(missingKeys(en, fr)).toEqual([]);
  });
});
