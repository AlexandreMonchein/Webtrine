import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { buildRegistry } from "../server/registry";

describe("buildRegistry (fixture design-system)", () => {
  let root: string;

  const writeFixture = (relativePath: string, content: string): void => {
    const full = path.join(root, relativePath);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  };

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "sim-registry-"));

    writeFixture("components/banner/banner.component.tsx", "");
    writeFixture(
      "components/banner/banner.docs.md",
      [
        "# Banner",
        "",
        "Un composant de bannière.",
        "",
        "### Bannière simple",
        "",
        "```json",
        JSON.stringify({ type: "banner", title: "Simple" }, null, 2),
        "```",
        "",
        "### Bannière avec bouton",
        "",
        "```json",
        JSON.stringify({ type: "banner", title: "Avec bouton" }, null, 2),
        "```",
        "",
      ].join("\n"),
    );
    writeFixture(
      "components/banner/banner.docs.mdx",
      '# Decoy storybook doc, must be ignored\n\n```json\n{ "type": "banner" }\n```\n',
    );

    writeFixture("components/cards/cardsList.component.tsx", "");
    writeFixture(
      "components/cards/cardsList.docs.md",
      [
        "# CardsList",
        "",
        "Une liste de cartes.",
        "",
        "### Configuration de base",
        "",
        "```json",
        JSON.stringify({ type: "cardsList", cards: [] }, null, 2),
        "```",
        "",
      ].join("\n"),
    );

    // orphan docs.md without sibling component.tsx: must be excluded silently
    writeFixture(
      "components/cards/orphan.docs.md",
      [
        "# Orphan",
        "",
        "```json",
        JSON.stringify({ type: "orphan" }, null, 2),
        "```",
        "",
      ].join("\n"),
    );

    writeFixture("components/list/broken.component.tsx", "");
    writeFixture(
      "components/list/broken.docs.md",
      [
        "# Broken",
        "",
        "### Configuration cassée",
        "",
        "```json",
        "{ this is not valid json",
        "```",
        "",
      ].join("\n"),
    );

    // dead component: docs.md + sibling component.tsx exist, but the first
    // json block documents how "team" is embedded inside a description
    // multiDescriptions example, not team's own canonical default block.
    // Must be excluded (mirrors the real design-system's description/team).
    writeFixture("components/description/team.component.tsx", "");
    writeFixture(
      "components/description/team.docs.md",
      [
        "# Team",
        "",
        "### Configuration dans `config.json`",
        "",
        "```json",
        JSON.stringify(
          {
            type: "description",
            id: "multiDescriptions",
            datas: {
              content: {
                "description-1": { type: "team", datas: {} },
              },
            },
          },
          null,
          2,
        ),
        "```",
        "",
      ].join("\n"),
    );

    writeFixture("navbars/classicNavbar.component.tsx", "");
    writeFixture(
      "navbars/classicNavbar.docs.md",
      [
        "# ClassicNavbar",
        "",
        "### Configuration de base",
        "",
        "```json",
        JSON.stringify(
          { type: "navbars", id: "classicNavbar", datas: {} },
          null,
          2,
        ),
        "```",
        "",
      ].join("\n"),
    );
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("returns exactly 3 entries in deterministic order", () => {
    const entries = buildRegistry(root);

    expect(entries).toHaveLength(3);
    expect(
      entries.map((entry) =>
        entry.kind === "content"
          ? `content:${entry.folder}/${entry.type}`
          : `template:${entry.dir}/${entry.id}`,
      ),
    ).toEqual([
      "content:banner/banner",
      "content:cards/cardsList",
      "template:navbars/classicNavbar",
    ]);
  });

  it("builds the banner entry with title, defaultBlock and examples", () => {
    const entries = buildRegistry(root);
    const banner = entries.find(
      (entry) => entry.kind === "content" && entry.type === "banner",
    );

    expect(banner).toBeDefined();
    if (!banner || banner.kind !== "content") throw new Error("unreachable");

    expect(banner.folder).toBe("banner");
    expect(banner.type).toBe("banner");
    expect(banner.title).toBe("Banner");
    expect((banner.defaultBlock as { type: string }).type).toBe("banner");
    expect(banner.examples).toHaveLength(2);
    expect(banner.examples.map((example) => example.title)).toEqual([
      "Bannière simple",
      "Bannière avec bouton",
    ]);
  });

  it("excludes orphan docs.md (no sibling component) and ignores .docs.mdx decoys", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const entries = buildRegistry(root);

    const hasOrphan = entries.some(
      (entry) => entry.kind === "content" && entry.type === "orphan",
    );
    const hasMdxDecoy = entries.some((entry) => {
      if (entry.kind !== "content" || entry.folder !== "banner") return false;
      return entry.title === "Decoy storybook doc, must be ignored";
    });

    expect(hasOrphan).toBe(false);
    expect(hasMdxDecoy).toBe(false);
    // orphan/mdx are excluded silently; only the unrelated broken.docs.md
    // fixture (shared by every test in this block) is expected to warn.
    const warnedAboutOrphanOrMdx = warnSpy.mock.calls.some(([message]) =>
      String(message).match(/orphan|\.mdx/),
    );
    expect(warnedAboutOrphanOrMdx).toBe(false);

    warnSpy.mockRestore();
  });

  it("skips a docs.md whose first json block is malformed, and warns", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const entries = buildRegistry(root);

    const hasBroken = entries.some(
      (entry) => entry.kind === "content" && entry.type === "broken",
    );

    expect(hasBroken).toBe(false);
    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it("excludes a docs.md whose first json block is not its own canonical block, and warns", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const entries = buildRegistry(root);

    const hasTeam = entries.some(
      (entry) => entry.kind === "content" && entry.type === "team",
    );
    const warnedAboutTeam = warnSpy.mock.calls.some(([message]) =>
      String(message).includes("team"),
    );

    expect(hasTeam).toBe(false);
    expect(warnedAboutTeam).toBe(true);

    warnSpy.mockRestore();
  });

  it("builds the classicNavbar template entry", () => {
    const entries = buildRegistry(root);
    const navbar = entries.find(
      (entry) => entry.kind === "template" && entry.id === "classicNavbar",
    );

    expect(navbar).toBeDefined();
    if (!navbar || navbar.kind !== "template") throw new Error("unreachable");

    expect(navbar.dir).toBe("navbars");
    expect(navbar.id).toBe("classicNavbar");
    expect((navbar.defaultBlock as { id: string }).id).toBe("classicNavbar");
  });
});

describe("buildRegistry (real design-system tree)", () => {
  const designSystemDir = path.resolve(
    __dirname,
    "../../webtrine/src/design-system",
  );

  it("builds a catalog from the real webtrine design-system", () => {
    const entries = buildRegistry(designSystemDir);

    const description = entries.find(
      (entry) =>
        entry.kind === "content" &&
        entry.folder === "description" &&
        entry.type === "description",
    );
    const classicNavbar = entries.find(
      (entry) => entry.kind === "template" && entry.id === "classicNavbar",
    );

    const hasTeam = entries.some((entry) =>
      entry.kind === "content" ? entry.type === "team" : entry.id === "team",
    );

    expect(description).toBeDefined();
    expect(classicNavbar).toBeDefined();
    expect(
      entries.every(
        (entry) =>
          typeof entry.defaultBlock === "object" && entry.defaultBlock !== null,
      ),
    ).toBe(true);
    // description/team is a dead component: its docs.md documents how it is
    // embedded inside a multiDescriptions example, not its own canonical
    // default block, so it must self-exclude (see canonical-shape check).
    expect(hasTeam).toBe(false);

    // 25 = the authoritative catalog in apps/webtrine/scripts/check-docs-examples.mjs (20 content + 5 templates); update both together.
    expect(entries).toHaveLength(25);
  });
});
