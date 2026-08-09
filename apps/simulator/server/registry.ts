import fs from "node:fs";
import path from "node:path";

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

const DOCS_SUFFIX = ".docs.md";
const COMPONENT_SUFFIX = ".component.tsx";

const H1_PATTERN = /^# (.+)$/m;
const HEADING_PATTERN = /^### (.+)$/gm;
const JSON_BLOCK_PATTERN = /```json\s*\n([\s\S]*?)```/g;

interface Heading {
  index: number;
  text: string;
}

interface JsonBlock {
  index: number;
  raw: string;
}

interface ParsedDocs {
  title: string;
  defaultBlock: unknown;
  examples: Example[];
}

const findHeadings = (content: string): Heading[] => {
  const headings: Heading[] = [];
  const pattern = new RegExp(HEADING_PATTERN);
  let match: RegExpExecArray | null = pattern.exec(content);
  while (match !== null) {
    headings.push({ index: match.index, text: match[1].trim() });
    match = pattern.exec(content);
  }
  return headings;
};

const findJsonBlocks = (content: string): JsonBlock[] => {
  const blocks: JsonBlock[] = [];
  const pattern = new RegExp(JSON_BLOCK_PATTERN);
  let match: RegExpExecArray | null = pattern.exec(content);
  while (match !== null) {
    blocks.push({ index: match.index, raw: match[1] });
    match = pattern.exec(content);
  }
  return blocks;
};

const nearestPrecedingHeading = (
  headings: Heading[],
  blockIndex: number,
): Heading | undefined => {
  let closest: Heading | undefined;
  for (const heading of headings) {
    if (
      heading.index < blockIndex &&
      (!closest || heading.index > closest.index)
    ) {
      closest = heading;
    }
  }
  return closest;
};

const parseDocsFile = (
  filePath: string,
  fallbackTitle: string,
): ParsedDocs | null => {
  const content = fs.readFileSync(filePath, "utf8");
  const h1Match = H1_PATTERN.exec(content);
  const title = h1Match ? h1Match[1].trim() : fallbackTitle;

  const jsonBlocks = findJsonBlocks(content);
  if (jsonBlocks.length === 0) {
    console.warn(`${filePath}: no \`\`\`json example block found, skipping`);
    return null;
  }

  let defaultBlock: unknown;
  try {
    defaultBlock = JSON.parse(jsonBlocks[0].raw);
  } catch (err) {
    console.warn(
      `${filePath}: first json example failed to parse (${err instanceof Error ? err.message : String(err)}), skipping`,
    );
    return null;
  }

  const headings = findHeadings(content);
  const examples: Example[] = [];
  let exampleIndex = 0;

  for (const block of jsonBlocks) {
    let json: unknown;
    try {
      json = JSON.parse(block.raw);
    } catch (err) {
      console.warn(
        `${filePath}: an example json block failed to parse (${err instanceof Error ? err.message : String(err)}), skipping that example`,
      );
      continue;
    }
    exampleIndex += 1;
    const heading = nearestPrecedingHeading(headings, block.index);
    examples.push({
      title: heading ? heading.text : `Exemple ${exampleIndex}`,
      json,
    });
  }

  return { title, defaultBlock, examples };
};

const isCanonicalContentBlock = (
  defaultBlock: unknown,
  type: string,
): boolean =>
  typeof defaultBlock === "object" &&
  defaultBlock !== null &&
  (defaultBlock as { type?: unknown }).type === type;

const isCanonicalTemplateBlock = (
  defaultBlock: unknown,
  dir: "navbars" | "footers",
  id: string,
): boolean =>
  typeof defaultBlock === "object" &&
  defaultBlock !== null &&
  (defaultBlock as { type?: unknown; id?: unknown }).type === dir &&
  (defaultBlock as { type?: unknown; id?: unknown }).id === id;

const listDocsFiles = (dir: string): string[] => {
  let names: string[];
  try {
    names = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return names.filter((name) => name.endsWith(DOCS_SUFFIX));
};

const buildContentEntries = (
  designSystemDir: string,
): ContentCatalogEntry[] => {
  const componentsDir = path.join(designSystemDir, "components");

  let folderEntries: fs.Dirent[];
  try {
    folderEntries = fs.readdirSync(componentsDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const entries: ContentCatalogEntry[] = [];

  for (const folderEntry of folderEntries) {
    if (!folderEntry.isDirectory()) continue;
    const folder = folderEntry.name;
    const folderPath = path.join(componentsDir, folder);

    for (const docsFile of listDocsFiles(folderPath)) {
      const type = docsFile.slice(0, -DOCS_SUFFIX.length);
      const componentPath = path.join(folderPath, `${type}${COMPONENT_SUFFIX}`);
      if (!fs.existsSync(componentPath)) continue;

      const docsPath = path.join(folderPath, docsFile);
      const parsed = parseDocsFile(docsPath, type);
      if (!parsed) continue;

      if (!isCanonicalContentBlock(parsed.defaultBlock, type)) {
        console.warn(
          `${docsPath}: first json block is not a canonical ${type} block — excluded from catalog`,
        );
        continue;
      }

      entries.push({
        kind: "content",
        folder,
        type,
        title: parsed.title,
        defaultBlock: parsed.defaultBlock,
        examples: parsed.examples,
      });
    }
  }

  return entries.sort(
    (a, b) => a.folder.localeCompare(b.folder) || a.type.localeCompare(b.type),
  );
};

const buildTemplateEntries = (
  designSystemDir: string,
  dir: "navbars" | "footers",
): TemplateCatalogEntry[] => {
  const dirPath = path.join(designSystemDir, dir);
  const entries: TemplateCatalogEntry[] = [];

  for (const docsFile of listDocsFiles(dirPath)) {
    const id = docsFile.slice(0, -DOCS_SUFFIX.length);
    const componentPath = path.join(dirPath, `${id}${COMPONENT_SUFFIX}`);
    if (!fs.existsSync(componentPath)) continue;

    const docsPath = path.join(dirPath, docsFile);
    const parsed = parseDocsFile(docsPath, id);
    if (!parsed) continue;

    if (!isCanonicalTemplateBlock(parsed.defaultBlock, dir, id)) {
      console.warn(
        `${docsPath}: first json block is not a canonical ${dir}/${id} block — excluded from catalog`,
      );
      continue;
    }

    entries.push({
      kind: "template",
      dir,
      id,
      title: parsed.title,
      defaultBlock: parsed.defaultBlock,
      examples: parsed.examples,
    });
  }

  return entries;
};

export const buildRegistry = (designSystemDir: string): CatalogEntry[] => {
  const contentEntries = buildContentEntries(designSystemDir);
  const templateEntries = [
    ...buildTemplateEntries(designSystemDir, "navbars"),
    ...buildTemplateEntries(designSystemDir, "footers"),
  ].sort((a, b) => a.dir.localeCompare(b.dir) || a.id.localeCompare(b.id));

  return [...contentEntries, ...templateEntries];
};
