import fs from "node:fs";
import path from "node:path";

export type FileKind = "config" | "style" | "lang";

export interface CustomerInfo {
  name: string;
  langs: string[];
}

export type ReadResult =
  | { path: string; data: unknown }
  | { path: string; parseError: string; raw: string };

export const NAME_PATTERN = /^[a-z0-9-]+$/i;
const CONFIG_LANG_PATTERN = /^config\.([a-z0-9-]+)\.json$/i;

const assertValidName = (label: string, value: string): void => {
  if (!NAME_PATTERN.test(value)) {
    throw new Error(`invalid ${label}: "${value}"`);
  }
};

export const listCustomers = (root: string): CustomerInfo[] => {
  const customerRoot = path.join(root, "config", "customer");

  return fs
    .readdirSync(customerRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const langs = fs
        .readdirSync(path.join(customerRoot, entry.name))
        .map((file) => CONFIG_LANG_PATTERN.exec(file)?.[1])
        .filter((lang): lang is string => Boolean(lang))
        .sort();

      return { name: entry.name, langs };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const resolvePath = (
  root: string,
  kind: FileKind,
  customer: string,
  lang?: string,
): string => {
  assertValidName("customer", customer);

  let relative: string;

  switch (kind) {
    case "config": {
      if (!lang) throw new Error("lang is required for kind 'config'");
      assertValidName("lang", lang);
      relative = path.join(
        "config",
        "customer",
        customer,
        `config.${lang}.json`,
      );
      break;
    }
    case "style": {
      relative = path.join("config", "customer", customer, "style.config.json");
      break;
    }
    case "lang": {
      if (!lang) throw new Error("lang is required for kind 'lang'");
      assertValidName("lang", lang);
      relative = path.join("lang", "customer", customer, `${lang}.json`);
      break;
    }
    default:
      throw new Error(`unknown kind: "${kind as string}"`);
  }

  const resolvedRoot = path.resolve(root);
  const resolvedTarget = path.resolve(resolvedRoot, relative);

  if (
    resolvedTarget !== resolvedRoot &&
    !resolvedTarget.startsWith(resolvedRoot + path.sep)
  ) {
    throw new Error(`path escapes root: "${relative}"`);
  }

  return resolvedTarget;
};

export const readJsonFile = (
  root: string,
  kind: FileKind,
  customer: string,
  lang?: string,
): ReadResult => {
  const target = resolvePath(root, kind, customer, lang);

  let raw: string;
  try {
    raw = fs.readFileSync(target, "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") {
      throw new Error(`not found: ${path.relative(root, target)}`);
    }
    throw err;
  }

  try {
    return { path: target, data: JSON.parse(raw) };
  } catch (err) {
    return {
      path: target,
      parseError: err instanceof Error ? err.message : String(err),
      raw,
    };
  }
};

const serializePretty = (data: unknown): string => {
  let json: string | undefined;

  try {
    json = JSON.stringify(data, null, 2);
  } catch (err) {
    throw new Error(
      `cannot serialize data: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  if (json === undefined) {
    throw new Error("cannot serialize data: value is not JSON-serializable");
  }

  return `${json}\n`;
};

export const writeJsonFile = (
  root: string,
  kind: FileKind,
  customer: string,
  data: unknown,
  lang?: string,
): void => {
  const target = resolvePath(root, kind, customer, lang);
  const serialized = serializePretty(data);

  const dir = path.dirname(target);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    throw new Error(`not found: ${path.relative(root, dir)}`);
  }

  const tmpPath = path.join(dir, `${path.basename(target)}.tmp-${process.pid}`);
  fs.writeFileSync(tmpPath, serialized, "utf8");
  fs.renameSync(tmpPath, target);
};
