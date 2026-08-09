# Simulator App Implementation Plan (Plan 3 of 3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `apps/simulator` — a local visual editor that edits real customer config/lang/style JSON files through generated forms, with a live iframe preview of the real webtrine app.

**Architecture:** Small React+Vite+TS app on port 3001. Its dev server hosts a file API as a Vite plugin (`/api/*`) that reads/writes `apps/webtrine/config/customer/*` and `lang/customer/*` with validation + atomic writes. Preview = iframe of the webtrine dev server (port 3000) using a dev-only `?customer=` override. Component registry = scan of `apps/webtrine/src/design-system/**/*.docs.md` (first JSON example = default block, from Plan 2).

**Tech Stack:** React 18, Vite 6, TypeScript, Vitest (node env for API tests). No new runtime deps beyond react/react-dom.

**Spec:** `docs/superpowers/specs/2026-07-26-webtrine-simulator-design.md` (sections 2–7)

**Branch:** `feat-webtrine-playground`.

---

## Context for the engineer

- Monorepo: root scripts proxy via `pnpm --filter`. The simulator is `apps/simulator`, package name `webtrine-simulator`, and must NEVER be part of any production build of webtrine.
- Block addressing (verified): a page = `multiDescriptions` template matched by `name`; its `datas.content` is an OBJECT whose keys are `"<folder>-<n>"` (folder = component folder) and values are blocks with `"type"` (= component file). Top-level templates: `type` (`navbars`/`footers`/`legals`/`gallery`/`floatingUI`) + `id`.
- Routes are a fixed table in `apps/webtrine/src/App.tsx:148-220` (path → templateName). The simulator hardcodes the same table in one module (single source listed below).
- Config/lang formats: 2-space pretty JSON. Git diff is the user's review mechanism — writes must be minimal-churn (stable key order: write back exactly the edited object, no reordering beyond what the edit did).
- i18next language detection already accepts `?lng=` in the query string (default detector order).

## File structure (locked here)

```
apps/simulator/
├── package.json            # webtrine-simulator; scripts: dev (port 3001), test
├── vite.config.ts          # react plugin + fileApiPlugin
├── tsconfig.json
├── index.html
├── src/
│   ├── main.tsx            # mount <App/>
│   ├── App.tsx             # layout shell: TopBar | Tree | Preview | Editor
│   ├── api.ts              # typed fetch client for /api/*
│   ├── routes.ts           # the fixed page table (path ↔ templateName)
│   ├── state.tsx           # React context: selected customer/lang/page/block + config cache
│   ├── components/
│   │   ├── TopBar.tsx      # customer select, lang toggle, page select, save chip
│   │   ├── Tree.tsx        # global + page blocks, add/move/dup/delete controls
│   │   ├── Preview.tsx     # iframe + offline banner
│   │   ├── Editor.tsx      # tabs: Content | Lang | Theme | JSON
│   │   ├── ContentForm.tsx # inferred form for selected block
│   │   ├── JsonEditor.tsx  # raw textarea editor w/ parse validation
│   │   ├── LangTab.tsx     # lang file tree editor + search + missing-key marks
│   │   ├── ThemeTab.tsx    # style.config.json editors
│   │   └── AddComponentDialog.tsx  # catalog picker
│   └── form/
│       └── infer.ts        # value → field-descriptor inference (pure, tested)
├── server/
│   ├── fileApi.ts          # the Vite plugin: routing + handlers
│   ├── files.ts            # path resolution + guards + atomic read/write (pure-ish, tested)
│   └── registry.ts         # docs.md scan → catalog (pure given a root dir, tested)
└── tests/
    ├── files.test.ts
    ├── registry.test.ts
    └── infer.test.ts
```

Root additions: `"dev:simulator": "pnpm --parallel --filter webtrine-app --filter webtrine-simulator dev"`, `"test:simulator": "pnpm --filter webtrine-simulator test"`.

---

### Task 1: Scaffold apps/simulator + root wiring

**Files:** Create `apps/simulator/package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx` (placeholder shell rendering "Simulator"); Modify root `package.json` (2 scripts above).

- [ ] **Step 1:** `package.json`:
```json
{
  "name": "webtrine-simulator",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --port 3001",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@types/react": "18.3.2",
    "@types/react-dom": "18.3.0",
    "@vitejs/plugin-react": "4.3.4",
    "typescript": "5.7.2",
    "vite": "6.2.0",
    "vitest": "3.0.9"
  }
}
```
- [ ] **Step 2:** `vite.config.ts` (fileApiPlugin imported but a stub returning `{name:"file-api"}` until Task 3):
```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileApiPlugin } from "./server/fileApi";

export default defineConfig({
  plugins: [react(), fileApiPlugin()],
  server: { port: 3001 },
});
```
- [ ] **Step 3:** minimal `index.html`/`main.tsx`/`App.tsx` (standard Vite React TS skeleton; tsconfig mirroring apps/webtrine's compiler options minus css-modules plugin). Add the two root scripts.
- [ ] **Step 4:** `pnpm install` from root; `pnpm --filter webtrine-simulator dev` in background → `curl -s -o /dev/null -w "%{http_code}" http://localhost:3001` → 200; kill.
- [ ] **Step 5:** Sanity: `pnpm lint` (root) still 17 problems; commit `feat: scaffold simulator app workspace member`.

### Task 2: Dev-only customer override in webtrine

**Files:** Modify `apps/webtrine/src/customer.utils.ts:1`; Test `apps/webtrine/src/__tests__/customer.utils.int.test.ts` (new).

- [ ] **Step 1 (failing test first):**
```ts
import { describe, expect, it } from "vitest";
import { getCustomer } from "../customer.utils";

describe("getCustomer dev override", () => {
  it("returns ?customer= param in dev", () => {
    window.history.pushState({}, "", "/?customer=apt235");
    expect(getCustomer()).toBe("apt235");
  });
  it("ignores invalid param values", () => {
    window.history.pushState({}, "", "/?customer=../evil");
    expect(getCustomer()).not.toBe("../evil");
  });
});
```
Run: `pnpm --filter webtrine-app exec vitest run --config vitest.component.config.ts src/__tests__/customer.utils.int.test.ts` → FAIL (override not implemented). Note: vitest sets `import.meta.env.DEV = true` by default — the test exercises the dev branch.
- [ ] **Step 2:** implement:
```ts
export const getCustomer = () => {
  if (import.meta.env.DEV && typeof window !== "undefined") {
    const param = new URLSearchParams(window.location.search).get("customer");
    if (param && /^[a-z0-9-]+$/i.test(param)) return param;
  }
  return import.meta.env.VITE_CUSTOMER || "webtrine";
};
```
- [ ] **Step 3:** tests pass; full component suite unchanged (same 13 pre-existing failures); manual smoke: `VITE_CUSTOMER=showcase pnpm dev` + open `http://localhost:3000/?customer=apt235` → apt235 site renders (curl the HTML is not enough — config loads client-side; verify via `curl -s "http://localhost:3000/?customer=apt235"` returns 200 and note manual visual check happens in Task 12 e2e). Kill server.
- [ ] **Step 4:** commit `feat: allow dev-only customer override via query param`.

### Task 3: files.ts — path guards + atomic IO (TDD)

**Files:** Create `apps/simulator/server/files.ts`, `apps/simulator/tests/files.test.ts`.

Contract (all functions take `webtrineRoot` so tests use temp fixture dirs):
```ts
listCustomers(root): { name: string; langs: string[] }[]        // scan config/customer/*, langs from config.<lang>.json files
readJsonFile(root, kind, customer, lang?): { path, data } | { path, parseError }   // kind: "config" | "style" | "lang"
writeJsonFile(root, kind, customer, data, lang?): void          // validate serializable, 2-space pretty + trailing newline, tmp+rename
resolvePath(root, kind, customer, lang?): string                // throws on invalid customer/lang (must match /^[a-z0-9-]+$/i and resolved path must stay under root)
```
- [ ] **Step 1:** failing tests: valid roundtrip (write → read equals), pretty format (2-space, `\n` at EOF), traversal rejection (`customer: "../x"`, `lang: "fr/../../x"` → throw), unknown kind → throw, parse-error surfaced (fixture with broken JSON), listCustomers on fixture tree.
- [ ] **Step 2:** run → FAIL. **Step 3:** implement. **Step 4:** `pnpm --filter webtrine-simulator test` → PASS. **Step 5:** commit `feat: simulator file IO with guards and atomic writes`.

### Task 4: registry.ts — docs.md scan → catalog (TDD)

**Files:** Create `apps/simulator/server/registry.ts`, `apps/simulator/tests/registry.test.ts`.

Contract:
```ts
buildRegistry(designSystemDir): CatalogEntry[]
// CatalogEntry = { kind: "content", folder, type, title, defaultBlock, examples: {title, json}[] }
//              | { kind: "template", dir: "navbars"|"footers", id, title, defaultBlock, examples }
// content: scan components/<folder>/<type>.docs.md where sibling <type>.component.tsx exists
// templates: scan navbars/*.docs.md + footers/*.docs.md with sibling component
// title = docs H1 text; defaultBlock = parsed FIRST ```json block; examples = every ```json with its preceding ### heading
// files whose first json block fails to parse are skipped with a console.warn (registry must not throw)
```
- [ ] **Step 1:** failing tests on a small fixture tree (2 content docs, 1 navbar docs, 1 docs without sibling component → excluded, 1 malformed-json docs → skipped+warn). **Step 2:** FAIL. **Step 3:** implement. **Step 4:** PASS. **Step 5:** also assert against the REAL design system: `buildRegistry("../webtrine/src/design-system")` returns exactly 25 entries (the Plan 2 checker guarantees this — assert count and presence of `description` and `classicNavbar`). **Step 6:** commit `feat: simulator component registry from docs.md files`.

### Task 5: fileApi.ts — the Vite plugin

**Files:** Create `apps/simulator/server/fileApi.ts`; replace the Task 1 stub import.

Endpoints (JSON in/out, errors as `{ error: string }` with 400/404/500):
```
GET  /api/customers                     → listCustomers
GET  /api/config/:customer/:lang        → readJsonFile config   (200 data | 422 {parseError, raw})
PUT  /api/config/:customer/:lang        → writeJsonFile config
GET/PUT /api/style/:customer            → style.config.json
GET/PUT /api/lang/:customer/:lang       → lang file
GET  /api/schemas                       → buildRegistry (cached per server start; ?refresh=1 rebuilds)
GET  /api/assets/:customer              → image basenames under apps/webtrine/public/assets/<customer> (recursive, images only)
```
Implementation notes: `configureServer(server)` + `server.middlewares.use("/api", handler)`; parse PUT bodies by buffering the stream (reject > 5 MB); webtrineRoot = `path.resolve(__dirname, "../../webtrine")`; guards come from files.ts — the handler try/catches and maps thrown guard errors to 400.
- [ ] **Step 1:** implement plugin. **Step 2:** manual verification battery with the running dev server (curl each endpoint against real apt235 data; PUT a no-op config write and `git diff --stat` → only that file, then `git checkout -- apps/webtrine/config` to reset). **Step 3:** commit `feat: simulator file API vite plugin`.

### Task 6: api.ts + state.tsx + routes.ts (client foundation)

**Files:** Create `apps/simulator/src/api.ts` (typed wrappers for every endpoint), `src/routes.ts` (the App.tsx route table verbatim: `{ path: "/", templateName: "Home" }`, `/presentation`→`Presentation`, `/description`→`Description`, `/hebergement`→`Hebergement`, `/accessibilite`→`Accessibilite`, `/faq`→`Faq`, `/flux`→`Flux`, `/prestation`→`Prestation`, `/artistes`→`Artistes`, `/events`→`Evenements`, `/tarifs`→`Tarifs`, `/information`→`Information`, `/private-map`→`PrivateMap`, `/contact`→`Contact`), `src/state.tsx` (context: `{customer, lang, page, selectedBlockKey, config, dirty, savingState}` + actions `load/save/selectBlock/updateBlock`).

- [ ] Steps: implement; unit test the state reducer's updateBlock/save-dirty transitions (`tests/` or colocated, vitest jsdom); commit `feat: simulator client foundation (api, routes, state)`.

### Task 7: Shell UI — TopBar + Preview + layout

**Files:** Modify `src/App.tsx` (3-pane CSS grid: 260px | 1fr | 360px, top bar row); Create `TopBar.tsx`, `Preview.tsx`.

Behavior contract:
- TopBar: customer dropdown (`GET /api/customers`), lang toggle (langs of selected customer), page dropdown (routes.ts; mark pages with no matching template "(vide)"), save chip (`saved | saving | error`).
- Preview: `<iframe src={`http://localhost:3000${page.path}?customer=${customer}&lng=${lang}`}>`; poll `fetch("http://localhost:3000", {mode:"no-cors"})` every 5s → banner "Preview server offline — run pnpm dev" when unreachable; `reload()` method exposed via ref/context, called after every successful save.
- [ ] Steps: implement; manual check with both servers (`pnpm dev:simulator`): switching customer/page/lang updates iframe URL; killing webtrine server shows banner. Commit `feat: simulator shell with live preview iframe`.

### Task 8: Tree pane + selection

**Files:** Create `Tree.tsx`.

Contract: top section GLOBAL (templates where type ≠ description: navbars, footers, legals, gallery, floatingUI — label = type/id), bottom section PAGE (selected page's template `datas.content` entries in key order — label = key + type). Click → `selectBlock(key)`; selected row highlighted. Empty page → button "Créer la page" → inserts `{type:"description", id:"multiDescriptions", name:<templateName>, datas:{content:{}, title:""}}` into templates (marks dirty, no auto-save).
- [ ] Steps: implement; vitest component test: given a fixture config, renders global + page block rows in order, click dispatches selection; commit `feat: simulator tree pane`.

### Task 9: infer.ts + ContentForm + JsonEditor + save flow (TDD on infer)

**Files:** Create `src/form/infer.ts`, `tests/infer.test.ts`, `ContentForm.tsx`, `JsonEditor.tsx`, `Editor.tsx`.

`infer.ts` contract — pure function `inferFields(value, path=[]): Field[]`:
```
string → {kind:"text"}          boolean → {kind:"checkbox"}      number → {kind:"number"}
string in image-ish key (name inside images[], imageSrc, logo, src) → {kind:"image"}
string in route-ish key (to, path, route, link when value starts with "/") → {kind:"route"}
array of objects → {kind:"list", itemFields}      object → {kind:"group", fields}
"type" key at root → {kind:"readonly"}            html-ish string (contains "<") → {kind:"textarea"}
```
- [ ] **Step 1:** failing tests: one per rule above using real block shapes (description block, banner block, links array). **Step 2:** FAIL → implement → PASS.
- [ ] **Step 3:** `ContentForm` renders Fields recursively (text/textarea/checkbox/number inputs, image → datalist fed by `/api/assets`, route → datalist from routes.ts, list → rows with add/remove/reorder buttons using itemFields, group → fieldset). Every change → `updateBlock` (dirty). Explicit **Enregistrer** button → PUT config → save chip + iframe reload. `JsonEditor`: textarea with the block's JSON, Apply parses (invalid → inline error, no state change). `Editor.tsx` tabs: Contenu | Lang | Thème | JSON (Lang/Thème placeholders until Tasks 10/11).
- [ ] **Step 4:** manual: edit apt235 Home banner title, save, git diff shows one-line change, iframe reflects it; revert via `git checkout -- apps/webtrine/config`. Commit `feat: simulator content form with inferred fields and json editor`.

### Task 10: Block operations + fr/en structure sync

**Files:** Modify `Tree.tsx`, `state.tsx`; Create `AddComponentDialog.tsx`.

Contract: per-row controls ↑ ↓ ⧉ 🗑 (reorder = renumber keys preserving `<folder>-<n>` convention; duplicate = next free `<folder>-<n>`; delete confirms). "+ Ajouter un composant" → dialog grouped by folder from `/api/schemas`, insert defaultBlock at chosen position (key = folder + next index). After any STRUCTURAL change, if the other-language config file exists → modal "Appliquer aussi à config.<other>.json ?" → applies same operation by position (add inserts the same defaultBlock; delete/move by index), saved in the same PUT batch.
- [ ] Steps: implement; state-level vitest tests for renumbering + sync-by-position logic (pure functions in state.tsx or extracted `src/ops.ts` — extract if >50 lines); manual add/move/delete on apt235 with git diff review + reset; commit `feat: simulator block operations with fr-en structure sync`.

### Task 11: LangTab + ThemeTab

**Files:** Create `LangTab.tsx`, `ThemeTab.tsx`; wire into `Editor.tsx`.

- LangTab: fetch both langs' lang files; render nested key tree (collapsible); inline value edit; search filter; keys present in fr missing in en (or vice-versa) marked ⚠; save → PUT lang for the edited language only.
- ThemeTab: fetch style; `theme-color-*` keys → `<input type="color">` (+ text fallback for non-hex), `*font-size*` keys → text input with pattern hint, `z-index-*` → number; save → PUT style + iframe reload.
- [ ] Steps: implement; manual: change a theme color on apt235 → iframe updates after save; edit a lang key → git diff single line; reset test edits; commit `feat: simulator lang and theme editors`.

### Task 12: Error handling polish + e2e smoke

**Files:** Modify `Editor.tsx`/`state.tsx` (unsaved-changes guard on customer/page/block switch: confirm dialog), `Preview.tsx` (already has offline banner — verify), `JsonEditor.tsx` (422 parse-error flow: opens raw file content for repair). Create `apps/simulator/tests/e2e-smoke.md` — NOT automated: a 10-step manual script (start dev:simulator, load apt235, edit banner title, save, verify diff + iframe, add component, sync to en, undo via git checkout). Automated Playwright e2e is a stretch goal — skip unless everything else lands early.

- [ ] Steps: implement guards; run the manual script end-to-end and record results in the task report; `pnpm --filter webtrine-simulator test` all green; root `pnpm lint` → simulator code lints clean under root flat config (fix any new lint errors in simulator code — baseline 17 stays); commit `feat: simulator error handling polish`.

---

## Done criteria

- `pnpm dev:simulator` starts both servers; full edit loop works on apt235 (select → edit → save → git diff → iframe refresh).
- All simulator vitest suites green; webtrine test/lint/e2e parity untouched (17 lint problems, 13 failing vitest, e2e counts as recorded).
- No simulator code imported anywhere by apps/webtrine (grep `webtrine-simulator` in apps/webtrine → nothing); production builds unchanged.
- Spec sections 2–7 all implemented or explicitly reported as deviations.

---

## Post-implementation notes (final review)

Accepted deviations from the spec (v1):
- Spec §2 "re-fetch current file on window focus": NOT implemented. Risk: editing the same
  file in the IDE while the simulator is open can be overwritten on the next save. Accepted
  for v1 (single user); revisit if it bites.
- Spec §6 raw-repair flow exists for config files only; broken lang/style files show a
  load error without inline repair. JSON tab/IDE remain the fallback.
- Spec §5 "every operation → PUT": replaced by an explicit Save button + dirty tracking
  (matches the git-diff review model); fr/en sync prompt batched at save time.
- Save errors surface as chip state without detailed toast (lang/theme tabs do show details).

Known follow-ups (non-blocking): empty-list "add first item" in ContentForm (JSON tab
workaround), createPage not replayed by fr/en sync, PUT accepts any JSON shape (no
config-schema validation server-side).
