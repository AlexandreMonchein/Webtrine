// Client-side type definitions mirroring the server's on-disk JSON shapes.
//
// These are intentionally duplicated rather than imported from `server/*`:
// the simulator's browser bundle must never pull in server-only modules
// (they use node:fs, node:path, etc.), so client and server keep separate
// copies of the shapes they share.

export interface CustomerInfo {
  name: string;
  langs: string[];
}

/** A single top-level entry in `layout.templates`. */
export interface Template {
  type: string;
  id?: string;
  name?: string | null;
  datas?: Record<string, unknown>;
}

export interface AppConfig {
  client: Record<string, unknown>;
  layout: {
    features: Record<string, unknown>;
    templates: Template[];
  };
  analytics?: Record<string, unknown>;
}

export type StyleConfig = Record<string, unknown>;

export type LangData = Record<string, unknown>;

export interface Example {
  title: string;
  json: unknown;
}

export interface ContentCatalogEntry {
  kind: "content";
  folder: string;
  type: string;
  title: string;
  defaultBlock: unknown;
  examples: Example[];
}

export interface TemplateCatalogEntry {
  kind: "template";
  dir: "navbars" | "footers";
  id: string;
  title: string;
  defaultBlock: unknown;
  examples: Example[];
}

export type CatalogEntry = ContentCatalogEntry | TemplateCatalogEntry;
