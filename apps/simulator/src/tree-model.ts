// Pure model for the Tree pane's rows — no rendering, no state, so it can
// be unit tested without a DOM (see tests/tree-model.test.ts). Tree.tsx
// consumes `buildTreeRows` output directly; the "selected" highlight is
// computed there by comparing rows to the live `selectedBlock`, since that
// is UI state this module deliberately knows nothing about.

import { findPageTemplate, getGlobalTemplates } from "./state";
import type { AppConfig } from "./types";

export type TreeRow =
  | { kind: "global"; index: number; label: string }
  | { kind: "page"; key: string; label: string }
  | { kind: "create-page" };

const globalLabel = (type: string, id: string | null | undefined): string =>
  id && id !== type ? `${type}/${id}` : type;

const blockType = (value: unknown): string => {
  if (value && typeof value === "object" && "type" in value) {
    const { type } = value as { type: unknown };
    if (typeof type === "string") return type;
  }
  return "?";
};

/**
 * Builds the Tree pane's rows for the given config and current page: every
 * global (non-page) template first — carrying its original index in the
 * full `layout.templates` array — followed by either the current page
 * template's `datas.content` entries (in key order) or, when no template
 * exists yet for that page, a single `{kind:"create-page"}` marker row.
 */
export const buildTreeRows = (
  config: AppConfig | null | undefined,
  templateName: string,
): TreeRow[] => {
  const globalRows: TreeRow[] = getGlobalTemplates(config).map((entry) => ({
    kind: "global",
    index: entry.index,
    label: globalLabel(entry.template.type, entry.template.id),
  }));

  // No config loaded yet: nothing to list, and no "create page" button
  // either — there is no config to append a template to.
  if (!config) return globalRows;

  const template = findPageTemplate(config, templateName);
  if (!template) {
    return [...globalRows, { kind: "create-page" }];
  }

  const content = (template.datas?.content ?? {}) as Record<string, unknown>;
  const pageRows: TreeRow[] = Object.entries(content).map(([key, value]) => ({
    kind: "page",
    key,
    label: `${key} · ${blockType(value)}`,
  }));

  return [...globalRows, ...pageRows];
};
