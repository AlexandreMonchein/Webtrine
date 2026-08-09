# Component docs.md Backfill Implementation Plan (Plan 2 of 3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every config-addressable design-system component gets an accurate `.docs.md` with valid JSON config examples, verified by a checker script — this is the data source for the simulator's component registry (Plan 3).

**Architecture:** A checker script defines the addressable-component list and validates each component's docs.md (exists, first JSON example parses, `type` matches). It starts red for 17 components; per-folder backfill tasks turn it green. Existing 13 docs get a staleness audit against `.types.ts` and real customer configs.

**Tech Stack:** Node 22 (plain .mjs script), Markdown docs. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-07-26-webtrine-simulator-design.md` (section 4, "Pre-task: docs.md backfill")

**Branch:** `feat-webtrine-playground` (continues from Plan 1).

---

## Context for the engineer (read first)

- All paths below are inside `apps/webtrine/` unless noted. Run commands from `apps/webtrine/`.
- **How blocks are addressed** (verified in code): inside a `multiDescriptions` template, each `datas.content` entry has a key like `"description-1"` and a `type` like `"doubleImageDescription"`. The KEY (minus trailing `-N`) selects the component FOLDER, the TYPE selects the FILE: `src/design-system/components/<folder>/<type>.component.tsx` (multiDescriptions.component.tsx:61–74). Top-level templates: `navbars`/`footers` use `id` → `src/design-system/{navbars,footers}/<id>.component.tsx` (displayNavbar/displayFooter.component.tsx:11).
- A docs.md sits next to its component: `<type>.component.tsx` → `<type>.docs.md`.
- **Docs format** — follow the existing pattern exactly (see `src/design-system/components/description/description.docs.md`): H1 title, one-line French description, `## Exemples de configuration JSON`, then `###`-titled variants each with a ```json fenced block. **The FIRST json block is the canonical default** — the simulator will insert it verbatim via "+ add component", so it must be complete, realistic, and use generic content (no real customer names/text).
- **Ground truth for each example:** the component's `.types.ts` (if present), the component props destructuring in the `.component.tsx`, and real usage in `config/customer/*/config.*.json` (grep the type string). Where types and real configs disagree, the component code wins — and note the discrepancy in your task report.
- Components deliberately EXCLUDED (dead or internal — no docs, so they stay out of the simulator catalog): animatedSection, lazyComponent, card (gallery helper), testimonial + testimonialQuote (helper/dead), team, prices, multiplePrices, popUp, link, calendlyButton, alertview, fullscreenMode, moduleLeafletMap, moduleLeafletZone, keyboardShortcuts, floatingSocials, legals, pageNotFound, modeTheme, display-helpers. Do not create docs for them.

---

### Task 1: Checker script (red first)

**Files:**
- Create: `apps/webtrine/scripts/check-docs-examples.mjs`

- [ ] **Step 1: Write the checker script**

```js
#!/usr/bin/env node
/**
 * Validates that every config-addressable design-system component has a
 * .docs.md whose FIRST ```json example parses and matches the component type.
 * This list is the source of truth for the simulator's component catalog.
 * Run from apps/webtrine: node scripts/check-docs-examples.mjs
 */
import { readFileSync, existsSync } from "node:fs";
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
    failures.push(`${componentPath}: component file missing (fix the list in this script)`);
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
    failures.push(`${docsPath}: first json example does not parse (${e.message})`);
    return;
  }
  const problem = validate(parsed);
  if (problem) failures.push(`${docsPath}: ${problem}`);
};

for (const { folder, type } of CONTENT_BLOCKS) {
  const base = path.join(DS, "components", folder, type);
  check(`${base}.docs.md`, `${base}.component.tsx`, (ex) =>
    ex.type !== type ? `first example "type" is ${JSON.stringify(ex.type)}, expected "${type}"` : null,
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
  console.error(`✗ ${failures.length} problem(s):\n` + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}
console.log(`✓ all ${CONTENT_BLOCKS.length + TEMPLATES.length} addressable components have valid docs examples`);
```

- [ ] **Step 2: Run it — expect RED with exactly the missing/invalid set**

Run (from `apps/webtrine/`): `node scripts/check-docs-examples.mjs`
Expected: exit 1, listing missing docs for: artistDescription, contactBanner*, cardsList, actionCardsList, dataTable, q&a, numberedList, imageList, allInOne, defaultContact, tattooContact, petSittingContact, moduleLeafletCustomZone, testimonialCards, gallery, display, clearGlassNavbar, modernNavbar — plus any existing docs whose first example fails validation (that output IS the staleness audit's starting list; contactBanner has a docs.md, so it appears only if its example is invalid). If a component file itself is reported missing, fix the list in the script (report it — the inventory came from code inspection dated 2026-07-26).

- [ ] **Step 3: Commit**

```bash
git add scripts/check-docs-examples.mjs
git commit -m "feat: add checker for component docs.md config examples"
```

---

### Tasks 2–11: Backfill docs.md per folder

**One task per folder group. Same recipe for every component (spelled out once here, referenced by each task with its specific file list):**

**Recipe (apply per component):**
1. Read `<type>.component.tsx` — the props/datas destructuring tells you every supported field and default.
2. Read `<type>.types.ts` if it exists.
3. Grep real usage: `grep -rn '"type": "<type>"' config/customer/` (or the template `id` for navbars/footers) — read 1–2 real blocks for realistic field shapes.
4. Write `<type>.docs.md` in the established format (H1, French one-liner, `## Exemples de configuration JSON`, `###` variants with ```json blocks). FIRST block = canonical complete default with generic content. Add one variant section per meaningful feature toggle (as description.docs.md does).
5. For content blocks the example top level MUST include `"type": "<type>"`. For navbars/footers the first example is the full template block: `{ "type": "navbars"|"footers", "id": "<id>", "datas": { ... } }`.
6. Image fields use generic asset names (`"square_image_1"`, `"logo_example"`) with an `alt`.
7. Run `node scripts/check-docs-examples.mjs` — your components must disappear from the failure list.
8. If the component code looks broken/unrenderable (e.g. imports missing, obviously dead), do NOT invent docs — report it as a concern instead.

**Per-task file lists (Create):**

- [ ] **Task 2 — description folder:** `src/design-system/components/description/artistDescription.docs.md`
- [ ] **Task 3 — cards folder:** `cards/cardsList.docs.md`, `cards/actionCardsList.docs.md`
- [ ] **Task 4 — contact folder:** `contact/defaultContact.docs.md`, `contact/tattooContact.docs.md`, `contact/petSittingContact.docs.md`
- [ ] **Task 5 — list + dataTable:** `list/numberedList.docs.md`, `list/imageList.docs.md`, `dataTable/dataTable.docs.md`
- [ ] **Task 6 — q&a + prices:** `q&a/q&a.docs.md`, `prices/allInOne.docs.md`
- [ ] **Task 7 — map + testimonial:** `map/moduleLeafletCustomZone.docs.md`, `testimonial/testimonialCards.docs.md`
- [ ] **Task 8 — gallery + display:** `gallery/gallery.docs.md`, `display/display.docs.md`
- [ ] **Task 9 — navbars:** `src/design-system/navbars/clearGlassNavbar.docs.md`, `src/design-system/navbars/modernNavbar.docs.md`

Each task ends with: checker run (fewer failures), then
```bash
git add src/design-system/<paths>
git commit -m "docs: add config examples for <components>"
```

- [ ] **Task 10 — staleness audit of the 13 existing docs.md:** For every existing docs file (description, descriptionB, doubleImageDescription, banner, contactBanner, team*, classicNavbar, classicFooter, bigLogosFooter + the rest found via `find src/design-system -name "*.docs.md"`), apply steps 1–3 of the recipe and fix any example that no longer matches the component (wrong/missing fields, renamed features). *team is excluded from the checker (dead component) — if its docs.md exists, leave it. Commit: `docs: refresh stale component config examples` (list what changed in the body).

- [ ] **Task 11 — checker green:** `node scripts/check-docs-examples.mjs` → exit 0, "✓ all 25 addressable components have valid docs examples". Commit anything outstanding.

---

### Task 12: Doc-drift riders from Plan 1's final review

**Files:**
- Modify: `docs/NEW_CUSTOMER.md`, `docs/COMPONENT_CREATION_GUIDE.md`, `docs/CSS_MODULES_MIGRATION.md`, `docs/VISUAL_TESTING.md`, `docs/IMAGE_OPTIMIZATION.md` (root docs/)
- Modify: `AGENTS.md`, `apps/webtrine/knip.config.ts`

- [ ] **Step 1:** Add this banner under the H1 of each listed `docs/*.md` guide:
```markdown
> **Note:** file paths in this guide are relative to `apps/webtrine/` (pnpm workspace member) unless stated otherwise.
```
- [ ] **Step 2:** In AGENTS.md, remove the stale `server.js` references (tree diagram leaf + "Backend: Express.js server" line) and the nonexistent `pnpm test:run` / `pnpm test:e2e` script mentions (real scripts: `pnpm test`, `pnpm test:e2e:<customer>`). In `apps/webtrine/knip.config.ts`, remove the dead `"server.js"` entry from `entry`.
- [ ] **Step 3:** Verify: `pnpm analyze:unused` from root still exits with the same report; `grep -n "server.js" AGENTS.md apps/webtrine/knip.config.ts` → no hits.
- [ ] **Step 4:** Commit: `docs: fix stale paths and server.js drift in guides`

---

## Done criteria

- `node scripts/check-docs-examples.mjs` exits 0 (25/25).
- Every new docs.md follows the established format; first example is insertable-as-is.
- Existing docs audited; drift fixed or reported.
- Task 12 riders done.
- Ready for Plan 3: the simulator registry can be built by scanning `*.docs.md`.
