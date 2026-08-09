#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Validates that every config-addressable design-system component has a
 * .docs.md whose FIRST ```json example parses and matches the component type.
 * This list is the source of truth for the simulator's component catalog.
 * Run from apps/webtrine: node scripts/check-docs-examples.mjs
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const DS = "src/design-system";

// Content blocks: rendered via multiDescriptions from datas.content
// key = folder (content key minus trailing -N), type = file name
const CONTENT_BLOCKS = [
  { folder: "description", type: "description" },
  { folder: "description", type: "descriptionB" },
  { folder: "description", type: "doubleImageDescription" },
  { folder: "description", type: "artistDescription" },
  { folder: "banner", type: "banner" },
  { folder: "banner", type: "contactBanner" },
  { folder: "cards", type: "cardsList" },
  { folder: "cards", type: "actionCardsList" },
  { folder: "dataTable", type: "dataTable" },
  { folder: "q&a", type: "q&a" },
  { folder: "list", type: "numberedList" },
  { folder: "list", type: "imageList" },
  { folder: "prices", type: "allInOne" },
  { folder: "contact", type: "defaultContact" },
  { folder: "contact", type: "tattooContact" },
  { folder: "contact", type: "petSittingContact" },
  { folder: "map", type: "moduleLeafletCustomZone" },
  { folder: "testimonial", type: "testimonialCards" },
  { folder: "gallery", type: "gallery" },
  { folder: "display", type: "display" },
];

// Top-level templates: selected by id in layout.templates
const TEMPLATES = [
  { dir: "navbars", id: "classicNavbar" },
  { dir: "navbars", id: "clearGlassNavbar" },
  { dir: "navbars", id: "modernNavbar" },
  { dir: "footers", id: "classicFooter" },
  { dir: "footers", id: "bigLogosFooter" },
];

const firstJsonBlock = (md) => {
  const m = md.match(/```json\s*\n([\s\S]*?)```/);
  return m ? m[1] : null;
};

const failures = [];

const check = (docsPath, componentPath, validate) => {
  if (!existsSync(componentPath)) {
    failures.push(
      `${componentPath}: component file missing (fix the list in this script)`,
    );
    return;
  }
  if (!existsSync(docsPath)) {
    failures.push(`${docsPath}: docs.md missing`);
    return;
  }
  const raw = firstJsonBlock(readFileSync(docsPath, "utf8"));
  if (!raw) {
    failures.push(`${docsPath}: no \`\`\`json example block`);
    return;
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    failures.push(
      `${docsPath}: first json example does not parse (${e.message})`,
    );
    return;
  }
  const problem = validate(parsed);
  if (problem) failures.push(`${docsPath}: ${problem}`);
};

for (const { folder, type } of CONTENT_BLOCKS) {
  const base = path.join(DS, "components", folder, type);
  check(`${base}.docs.md`, `${base}.component.tsx`, (ex) =>
    ex.type === type
      ? null
      : `first example "type" is ${JSON.stringify(ex.type)}, expected "${type}"`,
  );
}

for (const { dir, id } of TEMPLATES) {
  const base = path.join(DS, dir, id);
  check(`${base}.docs.md`, `${base}.component.tsx`, (ex) =>
    ex.type !== dir || ex.id !== id
      ? `first example must be a template block with type "${dir}" and id "${id}"`
      : null,
  );
}

if (failures.length) {
  console.error(
    `✗ ${failures.length} problem(s):\n${failures
      .map((f) => `  - ${f}`)
      .join("\n")}`,
  );
  process.exit(1);
}
console.log(
  `✓ all ${CONTENT_BLOCKS.length + TEMPLATES.length} addressable components have valid docs examples`,
);
