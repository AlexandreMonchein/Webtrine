import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  type FileKind,
  listCustomers,
  readJsonFile,
  resolvePath,
  writeJsonFile,
} from "../server/files";

describe("files", () => {
  let root: string;

  const writeFixture = (relativePath: string, content: string): void => {
    const full = path.join(root, relativePath);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  };

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "sim-files-"));

    writeFixture(
      "config/customer/alpha/config.fr.json",
      `${JSON.stringify({ client: { name: "alpha" } }, null, 2)}\n`,
    );
    writeFixture(
      "config/customer/alpha/config.en.json",
      `${JSON.stringify({ client: { name: "alpha" } }, null, 2)}\n`,
    );
    writeFixture(
      "config/customer/alpha/style.config.json",
      `${JSON.stringify({ "theme-color-primary": "#fff" }, null, 2)}\n`,
    );
    writeFixture(
      "config/customer/beta/config.fr.json",
      `${JSON.stringify({ client: { name: "beta" } }, null, 2)}\n`,
    );
    writeFixture("config/customer/broken/config.fr.json", "{ not json");
    writeFixture(
      "lang/customer/alpha/fr.json",
      `${JSON.stringify({ contact: { title: "Nous contacter" } }, null, 2)}\n`,
    );
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  it("lists customers sorted by name, with the langs found on disk", () => {
    expect(listCustomers(root)).toEqual([
      { name: "alpha", langs: ["en", "fr"] },
      { name: "beta", langs: ["fr"] },
      { name: "broken", langs: ["fr"] },
    ]);
  });

  it("round-trips a written object back through readJsonFile", () => {
    const data = { client: { name: "alpha", updated: true } };

    writeJsonFile(root, "config", "alpha", data, "fr");
    const result = readJsonFile(root, "config", "alpha", "fr");

    expect(result).toEqual({
      path: resolvePath(root, "config", "alpha", "fr"),
      data,
    });
  });

  it("writes byte-exact 2-space-indented JSON with a trailing newline", () => {
    const data = { client: { name: "alpha", updated: true } };

    writeJsonFile(root, "config", "alpha", data, "fr");
    const raw = fs.readFileSync(
      resolvePath(root, "config", "alpha", "fr"),
      "utf8",
    );

    expect(raw).toBe(`${JSON.stringify(data, null, 2)}\n`);
  });

  it("rejects a customer name that attempts path traversal", () => {
    expect(() => resolvePath(root, "config", "../evil", "fr")).toThrow();
  });

  it("rejects a customer name containing a path separator", () => {
    expect(() => resolvePath(root, "config", "a/b", "fr")).toThrow();
  });

  it("rejects a lang that attempts path traversal", () => {
    expect(() => resolvePath(root, "config", "alpha", "fr/../../x")).toThrow();
  });

  it("rejects an unknown file kind", () => {
    expect(() =>
      resolvePath(root, "nope" as FileKind, "alpha", "fr"),
    ).toThrow();
  });

  it("requires lang for the config kind", () => {
    expect(() => resolvePath(root, "config", "alpha")).toThrow();
  });

  it("requires lang for the lang kind", () => {
    expect(() => resolvePath(root, "lang", "alpha")).toThrow();
  });

  it("throws a 'not found' error when reading a missing customer file", () => {
    expect(() => readJsonFile(root, "config", "missing", "fr")).toThrow(
      /not found/,
    );
  });

  it("rethrows non-ENOENT fs errors as-is, without mapping to 'not found'", () => {
    // chmod(0) requires the test not to run as root, since root bypasses
    // file permission checks entirely.
    if (process.getuid?.() === 0) return;

    const target = resolvePath(root, "config", "alpha", "fr");
    fs.chmodSync(target, 0o000);

    try {
      expect(() => readJsonFile(root, "config", "alpha", "fr")).toThrow();
      expect(() => readJsonFile(root, "config", "alpha", "fr")).not.toThrow(
        /not found/,
      );
    } finally {
      fs.chmodSync(target, 0o644);
    }
  });

  it("returns a parseError variant with the raw content for invalid JSON", () => {
    const result = readJsonFile(root, "config", "broken", "fr");

    expect(result).toHaveProperty("parseError");
    expect((result as { raw: string }).raw).toContain("{ not json");
  });

  it("refuses circular data and does not create the target file", () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    const target = resolvePath(root, "config", "alpha", "de");

    expect(() =>
      writeJsonFile(root, "config", "alpha", circular, "de"),
    ).toThrow();
    expect(fs.existsSync(target)).toBe(false);
  });

  it("refuses undefined data and does not create the target file", () => {
    const target = resolvePath(root, "config", "alpha", "de");

    expect(() =>
      writeJsonFile(root, "config", "alpha", undefined, "de"),
    ).toThrow();
    expect(fs.existsSync(target)).toBe(false);
  });

  it("leaves no *.tmp-* files behind after a successful write", () => {
    writeJsonFile(root, "config", "alpha", { client: { name: "alpha" } }, "fr");

    const dir = path.join(root, "config", "customer", "alpha");
    const leftovers = fs
      .readdirSync(dir)
      .filter((name) => name.includes(".tmp-"));

    expect(leftovers).toEqual([]);
  });
});
