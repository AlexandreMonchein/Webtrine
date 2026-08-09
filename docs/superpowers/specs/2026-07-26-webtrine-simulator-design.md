# Webtrine Simulator — Design

**Date:** 2026-07-26
**Branch:** `feat-webtrine-playground`
**Status:** Approved design, pending implementation plan

## Problem

Editing a customer site today means hand-editing `config/customer/<x>/config.<lang>.json`, `style.config.json`, and `lang/customer/<x>/<lang>.json`, copy-pasting default blocks from component docs, and hoping nothing is misspelled. There is no visual feedback until the app is run, and no safe way to demo changes to a client in real time.

## Goal

A local visual editor (the **simulator**) that edits those JSON files through a UI with a live, pixel-exact preview of the real site. Changes are written to the real files on disk, so the git diff is the review mechanism.

## Decisions (settled during brainstorming)

| Question | Decision |
|---|---|
| Persistence | Simulator writes the real files under `config/` and `lang/` |
| V1 editing scope | Component blocks + theme (`style.config.json`) + lang files |
| New-customer bootstrap | Out of scope for v1 |
| Deployment | Local dev tool only, never built or deployed |
| Preview | Full page rendered by the real webtrine app in an iframe |
| Repo shape | Light pnpm monorepo: `apps/webtrine` + `apps/simulator` |
| Architecture | Simulator app + Vite-plugin file API + iframe preview (option A) |
| UI layout | Three-pane builder: tree / preview / form (option A) |
| Form generation | Tier 1 only: generic forms inferred from docs.md default blocks; no hand-written schemas in v1 |

## 1. Repo restructure (light monorepo)

```
Webtrine/
├── pnpm-workspace.yaml          # NEW: packages: apps/*
├── package.json                 # root: proxy scripts (pnpm dev → pnpm --filter webtrine-app dev)
├── renovate.json                # stays at root (native pnpm-workspace support)
├── eslint.config.mjs, prettierrc.json, .stylelintrc.json   # stay at root, shared
├── docs/                        # stays at root (project guides + this spec)
├── apps/
│   ├── webtrine/                # current app moved whole:
│   │                            # src/, config/, lang/, public/, scripts/, .storybook/,
│   │                            # tests/, vite/vitest/playwright configs,
│   │                            # tsconfigs, index.html, package.json (current deps)
│   └── simulator/               # NEW app (section 2)
```

- `config/`, `lang/`, `public/` move **inside** `apps/webtrine/`. Source imports them via
  relative paths (`../config/...` from `src/`), so moving the app whole keeps every import
  untouched. The simulator reaches these files by filesystem path only — it never imports them.
- Root scripts keep their current names (`pnpm dev`, `pnpm build`, `pnpm dev:storybook`,
  `pnpm test:e2e:apt235`, …) and proxy via `--filter`. Muscle memory and any automation keep working.
- Storybook, Playwright, Vitest, favicon/build shell scripts are relocated with the app,
  internally unchanged. Their relative-path assumptions are audited during the move.
- New root scripts: `pnpm dev:simulator` (starts webtrine dev server + simulator together).

## 2. Simulator app + file API + preview wiring

`apps/simulator`: small React + Vite + TypeScript app, dev port **3001**. Plain React state
(no redux). Never part of any production build.

### File API — Vite plugin inside the simulator dev server

No separate server process. All endpoints under `/api`, bound to localhost:

| Endpoint | Purpose |
|---|---|
| `GET /api/customers` | Scan `apps/webtrine/config/customer/*` → customers + available languages |
| `GET/PUT /api/config/:customer/:lang` | `config.<lang>.json` |
| `GET/PUT /api/style/:customer` | `style.config.json` |
| `GET/PUT /api/lang/:customer/:lang` | `lang/customer/<customer>/<lang>.json` |
| `GET /api/schemas` | Component registry: default block + inferred form metadata per component |
| `GET /api/assets/:customer` | Image names from `apps/webtrine/public/assets/<customer>` for image pickers |

Write behavior:
- Validate payload is parseable JSON of the expected shape before touching disk.
- Pretty-print with 2-space indent (matches current formatting → clean git diffs).
- Atomic write: temp file + rename. A failed write never corrupts the target.
- Path guards: `:customer` and `:lang` are sanitized; writes are only permitted inside
  `config/customer/*` and `lang/customer/*`. No path traversal.

### Preview

- iframe pointed at the real webtrine dev server (`http://localhost:3000`).
- **Customer switching without server restart:** `getCustomer()` gains a dev-only override —
  a `?customer=` query parameter, guarded by `import.meta.env.DEV`, dead-stripped from
  production builds. Language uses the existing i18next querystring detection (`?lng=`).
  iframe src example: `http://localhost:3000/artistes?customer=apt235&lng=fr`.
- Save flow: PUT writes file → webtrine Vite HMR reloads the JSON import → page refreshes.
  The simulator also force-reloads the iframe after each successful save (belt and braces).
- Concurrent edits (file touched in the IDE while the simulator is open): simulator re-fetches
  the current file on window focus; last write wins. No locking — single-user local tool.

## 3. UI layout — three-pane builder

Top bar: customer selector · language toggle (fr/en) · page selector · save status chip.

- **Left — tree:** global blocks (navbar, footer, floatingUI, gallery, legals) + the selected
  page's blocks, plus "+ add component".
- **Center — preview:** the iframe (real site).
- **Right — form:** the selected block's edit form, with tabs **Content / Lang / Theme**
  and a raw-JSON editor fallback tab.

Page model (verified against apt235): a route (fixed table in `App.tsx`) renders the
`description/multiDescriptions` template matched by `name` (Home, Contact, Artistes, …);
that template's `datas.content` is the ordered list of component blocks
(`banner`, `doubleImageDescription`, `descriptionB`, `contactBanner`, …).

## 4. Component registry + form generation (tier 1 only)

Built at simulator startup by scanning `apps/webtrine/src/design-system/**`:

- `<component>.docs.md` → first JSON example = the component's **default block**
  (inserted by "+ add component").
- Generic form inferred from the default block's values:
  string → text field · boolean → checkbox · number → number field ·
  array → repeatable rows · `images[].name` → image picker (from `/api/assets`) ·
  `to`/`path` fields → route picker.
- Raw JSON editor always available — no component is ever uneditable.
- **Catalog filter:** only components with a `.docs.md` appear in "+ add component".
  Internal helpers (displayers, lazy wrappers, analytics provider, …) stay undocumented and
  therefore never appear.

### Pre-task: docs.md backfill

52 `*.component.tsx` exist, 13 have `.docs.md`. Before the registry work, create or update
`.docs.md` with accurate JSON examples for every **config-addressable** component
(~30 files; internal helpers excluded on purpose). Examples are cross-checked against each
component's `.types.ts` and real usage in existing customer configs. Existing 13 docs are
audited for staleness the same way.

Hand-written per-component schemas (field labels, enums, lang-key mappings) are a **later
upgrade**, not v1.

## 5. Editing model

**Block operations:** add (catalog → default block at chosen position), move up/down,
duplicate, delete (with confirm). Every operation → PUT config → iframe reload.

**Empty pages:** routes with no matching template in the customer config are marked "empty"
in the page selector; one click creates the `multiDescriptions` template for that page.

**fr/en structure sync:** structural operations (add/move/delete block) prompt
"Apply to config.en.json too?" and apply the same operation by position to the other
language config. Text edits stay per-language. Prevents silent structural divergence
between `config.fr.json` and `config.en.json`.

**Lang tab:** tree editor for `lang/customer/<c>/<lang>.json` — nested keys, inline value
editing, search box. Whole file (no per-component key mapping in tier 1). Keys present in
fr but missing in en are highlighted.

**Theme tab** (customer-global, not per-block): `style.config.json` — color pickers for
`theme-color-*`, unit inputs for font sizes, number inputs for z-index. Save → iframe
reflects the change.

## 6. Error handling

- API: 400 + message on invalid payload; file untouched on any failure.
- Broken hand-edited JSON on disk: GET returns a parse-error payload → simulator opens the
  raw-text editor for that file so it can be fixed in place.
- UI: save status chip (saved / saving / error + toast); unsaved-changes guard before
  switching block, page, or customer; "preview offline" banner when the webtrine dev server
  is unreachable.

## 7. Testing

- **Vitest (simulator):** registry builder (docs.md example extraction, form inference);
  API plugin (read/write roundtrip, validation rejects bad payloads, path traversal blocked)
  using fixture dirs in temp.
- **Playwright smoke (stretch):** boot both servers → load apt235 → edit a title → assert
  file content changed and iframe reloaded.
- **Existing webtrine tests:** untouched, run via root proxy scripts.

## 8. Nothing-breaks checklist

Verified at the end of the restructure step, **before** any simulator work starts:

- `pnpm dev`, `pnpm build` (each customer), `pnpm dev:storybook`, `pnpm build:storybook`,
  `pnpm test`, `pnpm test:e2e:*`, `pnpm lint`, `pnpm analyze:unused` — all green from root.
- Renovate: `renovate.json` stays at root; pnpm workspaces supported natively; no change needed.
- `scripts/*.sh` (favicon, build, serve) path assumptions audited during the move.

## Out of scope (v1)

- New-customer bootstrap from the UI.
- Hand-written per-component schemas / TS-type-derived schemas.
- Deployed/hosted simulator, auth, multi-user.
- Editing `client.*` metadata (contact, structuredData, socials) — raw JSON tab covers it if needed.
- Asset upload/management (picker reads existing assets only).

## Build order (for the implementation plan)

1. Monorepo restructure + nothing-breaks checklist.
2. docs.md backfill (~30 components) + staleness audit of the existing 13.
3. Simulator skeleton: app, file API plugin, customer/page selection, iframe preview,
   dev-only `?customer=` override.
4. Registry + generic forms + raw JSON tab.
5. Block operations + fr/en structure sync.
6. Lang tab + Theme tab.
7. Error-handling polish + tests.
