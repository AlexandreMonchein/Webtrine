# Monorepo Restructure Implementation Plan (Plan 1 of 3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the current webtrine app into `apps/webtrine` as a pnpm workspace package, with root proxy scripts, so that every existing command keeps working and `apps/simulator` can be added later.

**Architecture:** Light pnpm monorepo. The app moves whole (src, config/customer, lang, public, scripts, test/build configs) so all relative imports stay valid. Shared tooling (eslint + `config/eslint/`, stylelint, prettier, renovate, docs) stays at root. Root `package.json` proxies every script via `pnpm --filter webtrine-app`.

**Tech Stack:** pnpm 10 workspaces, Vite 6, Storybook 8, Vitest 3, Playwright.

**Spec:** `docs/superpowers/specs/2026-07-26-webtrine-simulator-design.md` (section 1 + section 8)

**Branch:** work directly on `feat-webtrine-playground` (dedicated to this project).

**Plans 2 and 3** (docs.md backfill, simulator app) are written after this plan is executed, against the new paths.

---

## Context for the engineer (read first)

- Package name is `webtrine-app` (in the current root `package.json`) — that's the `--filter` target.
- All build/test configs use **cwd-relative paths** (`./tests/e2e`, `public/assets/...`, `../src/**`). pnpm runs package scripts with cwd = package dir, so after the move they keep working **unchanged**. Do not "fix" paths inside them.
- `config/` is TWO things: `config/customer/` (per-customer site data → moves into the app) and `config/eslint/` (shared lint rules imported by root `eslint.config.mjs` → stays at root).
- ESLint 9 flat config resolves by walking up from cwd, so `apps/webtrine` scripts find the root `eslint.config.mjs` automatically.
- `resolutions` in a workspace member is ignored by pnpm — it must live at the workspace root as `pnpm.overrides`.
- Untracked local artifacts: `build/`, `storybook-static/`, `playwright-report/`, `test-results/` (regenerable — deleted), and Playwright visual snapshots inside `tests/e2e/` (NOT regenerable without review — they move with `tests/`, `git mv` moves untracked files inside a moved directory too).

---

### Task 0: Baseline capture

Record current behavior so post-move parity is provable. Run from repo root.

**Files:**
- Create: `/private/tmp/claude-502/-Users-alexandre-monschein-Documents-src-Webtrine/b77f4718-7851-4da2-9ddb-c2c6d6248e9b/scratchpad/baseline/` (scratchpad, not committed)

- [ ] **Step 1: Verify clean git state**

Run: `git status --short`
Expected: empty output. If not empty, stop and ask the user.

- [ ] **Step 2: Baseline lint**

```bash
mkdir -p "$SCRATCH/baseline"   # SCRATCH = scratchpad dir above
pnpm lint > "$SCRATCH/baseline/lint.txt" 2>&1; echo "exit=$?" >> "$SCRATCH/baseline/lint.txt"
tail -5 "$SCRATCH/baseline/lint.txt"
```
Expected: whatever the current state is (errors are fine — we only need parity later).

- [ ] **Step 3: Baseline component tests**

```bash
pnpm exec vitest run --config vitest.component.config.ts > "$SCRATCH/baseline/vitest.txt" 2>&1; echo "exit=$?" >> "$SCRATCH/baseline/vitest.txt"
tail -10 "$SCRATCH/baseline/vitest.txt"
```
Expected: test summary recorded.

- [ ] **Step 4: Baseline knip**

```bash
pnpm analyze:unused > "$SCRATCH/baseline/knip.txt" 2>&1; echo "exit=$?" >> "$SCRATCH/baseline/knip.txt"
tail -5 "$SCRATCH/baseline/knip.txt"
```
Expected: knip report recorded.

- [ ] **Step 5: Baseline e2e (all customers — slow, ~several minutes)**

```bash
lsof -ti:3000 | xargs -r kill   # playwright refuses reused servers
pnpm test:e2e:all > "$SCRATCH/baseline/e2e-all.txt" 2>&1; echo "exit=$?" >> "$SCRATCH/baseline/e2e-all.txt"
tail -10 "$SCRATCH/baseline/e2e-all.txt"
```
Expected: result recorded (pass or existing failures — parity is the goal).

---

### Task 1: Move the app into `apps/webtrine`

**Files:**
- Move (git mv): `src/`, `public/`, `lang/`, `tests/`, `scripts/`, `.storybook/`, `.babelrc`, `index.html`, `vite.config.js`, `vite-env.d.ts`, `playwright.config.ts`, `vitest.config.ts`, `vitest.component.config.ts`, `knip.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `postcss.config.js`, `package.json` → `apps/webtrine/`
- Move: `config/customer/` → `apps/webtrine/config/customer/` (`config/eslint/` stays at root)
- Delete (untracked artifacts): `build/`, `storybook-static/`, `playwright-report/`, `test-results/`, `temp_build/`, `node_modules/`

- [ ] **Step 1: Create target dir and move tracked files**

```bash
mkdir -p apps/webtrine/config
git mv src public lang tests scripts .storybook .babelrc .env index.html \
  vite.config.js vite-env.d.ts playwright.config.ts \
  vitest.config.ts vitest.component.config.ts knip.config.ts \
  tsconfig.json tsconfig.app.json tsconfig.node.json \
  postcss.config.js package.json \
  apps/webtrine/
git mv config/customer apps/webtrine/config/customer
```

> **Amendment (post-review):** `.env` was missing from the original move list — it is
> git-tracked and holds `VITE_MAIL_SERVICE_ID` (contact forms). Vite loads `.env` from
> its config directory, so it MUST live in `apps/webtrine/`. Fixed during execution.
Expected: no output (success). `git status` shows renames only.

- [ ] **Step 2: Delete regenerable untracked artifacts**

`build/` contains production bundles — they are regenerated by `pnpm build`; confirm nothing unique lives there before deleting (spec assumption: regenerable).

```bash
rm -rf build storybook-static playwright-report test-results temp_build node_modules
```
Expected: gone. Playwright snapshots were NOT here — they moved with `tests/`.

- [ ] **Step 3: Verify move shape**

Run: `ls apps/webtrine && ls config`
Expected: `apps/webtrine` lists all moved entries incl. `config/`; root `config` lists only `eslint`.

*(No commit yet — repo is intentionally mid-restructure until Task 4.)*

---

### Task 2: Workspace files (pnpm-workspace.yaml + new root package.json)

**Files:**
- Create: `pnpm-workspace.yaml`
- Create: `package.json` (new root)
- Modify: `apps/webtrine/package.json` (remove `resolutions`)

- [ ] **Step 1: Create `pnpm-workspace.yaml`**

```yaml
packages:
  - apps/*
```

- [ ] **Step 2: Create root `package.json`**

```json
{
  "name": "webtrine",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": "^22",
    "pnpm": "^10"
  },
  "scripts": {
    "dev": "pnpm --filter webtrine-app dev",
    "dev:storybook": "pnpm --filter webtrine-app dev:storybook",
    "dev:serve": "pnpm --filter webtrine-app dev:serve",
    "build": "pnpm --filter webtrine-app build",
    "build:storybook": "pnpm --filter webtrine-app build:storybook",
    "test": "pnpm --filter webtrine-app test",
    "test:e2e:ui": "pnpm --filter webtrine-app test:e2e:ui",
    "test:e2e:apt235": "pnpm --filter webtrine-app test:e2e:apt235",
    "test:e2e:chillpaws": "pnpm --filter webtrine-app test:e2e:chillpaws",
    "test:e2e:dipaolo": "pnpm --filter webtrine-app test:e2e:dipaolo",
    "test:e2e:showcase": "pnpm --filter webtrine-app test:e2e:showcase",
    "test:e2e:webtrine": "pnpm --filter webtrine-app test:e2e:webtrine",
    "test:e2e:all": "pnpm --filter webtrine-app test:e2e:all",
    "test:e2e:all:update": "pnpm --filter webtrine-app test:e2e:all:update",
    "lint": "pnpm --filter webtrine-app lint",
    "convert:webp": "pnpm --filter webtrine-app convert:webp",
    "compress:images": "pnpm --filter webtrine-app compress:images",
    "analyze:unused": "pnpm --filter webtrine-app analyze:unused"
  },
  "pnpm": {
    "overrides": {
      "jackspeak": "2.1.1"
    }
  }
}
```

Note: root devDependencies stay empty on purpose — eslint/prettier/stylelint remain deps of `webtrine-app` and are resolvable from root because pnpm hoists to the root `node_modules`. If a later plan needs them as true root deps, it can move them.

- [ ] **Step 3: Remove `resolutions` from `apps/webtrine/package.json`**

Delete these lines (now covered by root `pnpm.overrides`):

```json
  "resolutions": {
    "jackspeak": "2.1.1"
  },
```
Expected: `webtrine-app` package.json otherwise untouched (name, deps, scripts unchanged).

---

### Task 3: Update `.gitignore` for new layout

**Files:**
- Modify: `.gitignore` (full replacement below)

- [ ] **Step 1: Replace `.gitignore` content with:**

```gitignore
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
node_modules/

# production
apps/webtrine/temp_build/
apps/webtrine/build/
dist/

# public (favicons copied by update-favicon.sh)
apps/webtrine/public/apple-touch-icon.png
apps/webtrine/public/favicon-16x16.png
apps/webtrine/public/favicon-32x32.png

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# storybook
*storybook.log
apps/webtrine/storybook-static/

# Playwright
apps/webtrine/test-results/
apps/webtrine/playwright-report/
apps/webtrine/playwright/.cache/
apps/webtrine/tests/e2e/**/*-actual.png
apps/webtrine/tests/e2e/**/*-diff.png
apps/webtrine/tests/e2e/visual.spec.ts-snapshots/

# Superpowers brainstorm sessions
.superpowers/
```

- [ ] **Step 2: Verify nothing tracked became ignored / nothing ignored became visible**

Run: `git status --short | grep -v '^R' | head -20`
Expected: only the intended new/modified files (`pnpm-workspace.yaml`, `package.json`, `.gitignore`, `apps/webtrine/package.json`), NO flood of untracked snapshot/build files. If snapshot PNGs appear, the Playwright ignore lines have a typo — fix before continuing.

---

### Task 4: Clean stale tsconfig includes + install

**Files:**
- Modify: `apps/webtrine/tsconfig.json:22-28`

- [ ] **Step 1: Fix the `include` list**

In `apps/webtrine/tsconfig.json`, replace:

```json
  "include": [
    "src",
    "config",
    "webpack.config.js",
    "eslint.config.mjs",
    "src/**/*.module.css"
  ],
```

with (webpack.config.js never existed here; eslint.config.mjs now lives at root):

```json
  "include": ["src", "config", "src/**/*.module.css"],
```

- [ ] **Step 2: Fresh install**

Run: `pnpm install`
Expected: success; `pnpm-lock.yaml` rewritten with importer `apps/webtrine`. If pnpm warns about ignored build scripts (sharp, esbuild, vite-plugin-imagemin…), run `pnpm approve-builds`, approve those, and re-run `pnpm install`.

- [ ] **Step 3: Commit the restructure**

```bash
git add -A
git commit -m "refactor: move app into apps/webtrine pnpm workspace

App moves whole (src, config/customer, lang, public, scripts, test and
build configs) so all cwd-relative paths keep working. Shared tooling
(eslint + config/eslint, stylelint, prettier, renovate) stays at root.
Root package.json proxies every script via pnpm --filter."
```
Expected: one commit, mostly renames (`git show --stat HEAD | tail -3` shows ~everything as rename).

---

### Task 5: Verification battery (nothing-breaks checklist)

All commands from repo root. Compare against `$SCRATCH/baseline/*`.

- [ ] **Step 1: Lint parity**

```bash
pnpm lint > "$SCRATCH/after-lint.txt" 2>&1; echo "exit=$?" >> "$SCRATCH/after-lint.txt"
diff <(tail -3 "$SCRATCH/baseline/lint.txt") <(tail -3 "$SCRATCH/after-lint.txt")
```
Expected: same error count / same exit code as baseline.

- [ ] **Step 2: Component test parity**

```bash
pnpm --filter webtrine-app exec vitest run --config vitest.component.config.ts > "$SCRATCH/after-vitest.txt" 2>&1; echo "exit=$?" >> "$SCRATCH/after-vitest.txt"
diff <(tail -3 "$SCRATCH/baseline/vitest.txt") <(tail -3 "$SCRATCH/after-vitest.txt")
```
Expected: same pass/fail summary as baseline.

- [ ] **Step 3: Dev server smoke (apt235)**

```bash
VITE_CUSTOMER=apt235 pnpm dev &   # run in background
sleep 8
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
kill %1
```
Expected: `200`. (Vite auto-opens a browser tab — harmless.)

- [ ] **Step 4: Production build (every customer — spec requires each)**

```bash
for c in showcase apt235 chillpaws dipaolo webtrine; do
  printf 'y\n' | VITE_CUSTOMER=$c pnpm build || { echo "BUILD FAILED: $c"; break; }
  ls apps/webtrine/build/$c/index.html || { echo "MISSING OUTPUT: $c"; break; }
done
```
Expected: five builds succeed; each `apps/webtrine/build/<customer>/index.html` exists.

- [ ] **Step 5: Storybook — dev smoke + build**

```bash
pnpm dev:storybook &   # run in background
sleep 20
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:6006
kill %1
pnpm build:storybook
ls apps/webtrine/storybook-static/index.html
```
Expected: `200` from the dev server, then build succeeds and `index.html` exists.

- [ ] **Step 6: E2E parity (all customers — slow)**

```bash
lsof -ti:3000 | xargs -r kill   # playwright refuses reused servers
pnpm test:e2e:all > "$SCRATCH/after-e2e-all.txt" 2>&1; echo "exit=$?" >> "$SCRATCH/after-e2e-all.txt"
diff <(tail -5 "$SCRATCH/baseline/e2e-all.txt") <(tail -5 "$SCRATCH/after-e2e-all.txt")
```
Expected: same result as baseline (snapshots moved with `tests/`, so visual comparisons still have their baselines).

- [ ] **Step 6b: Env vars reach the bundle (added post-review — battery is otherwise blind to this)**

```bash
grep -c "VITE_" apps/webtrine/.env                      # env file present, has vars
grep -rl "$(grep VITE_MAIL_SERVICE_ID apps/webtrine/.env | cut -d= -f2)" apps/webtrine/build/showcase/assets/ | head -1
```
Expected: first command > 0; second command prints at least one bundle file (the mail service id was inlined by Vite — contact forms will work).

- [ ] **Step 7: Knip parity**

```bash
pnpm analyze:unused > "$SCRATCH/after-knip.txt" 2>&1; echo "exit=$?" >> "$SCRATCH/after-knip.txt"
diff <(tail -5 "$SCRATCH/baseline/knip.txt") <(tail -5 "$SCRATCH/after-knip.txt")
```
Expected: same report as baseline.

- [ ] **Step 8: Fix-and-recheck rule**

If any step diverges from baseline: fix the specific path assumption, re-run that step, and commit the fix separately:

```bash
git add -A && git commit -m "fix: <specific path assumption> after workspace move"
```
Known candidates if something breaks: a script using `git rev-parse --show-toplevel`-style root assumptions, or an absolute path in a local `.env`. None were found during the audit, but verify empirically.

---

### Task 6: Update AGENTS.md for the new layout

AGENTS.md has ~22 references to root-relative paths that are now inside `apps/webtrine/`.

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Add a monorepo section**

Insert right after the `# Project overview` intro paragraph:

```markdown
## 📦 Monorepo Layout

This repo is a pnpm workspace:

- `apps/webtrine/` — the multi-tenant site app (all paths below live here unless noted)
- `apps/simulator/` — visual config editor (local dev tool; see docs/superpowers/specs/)
- `config/eslint/` — shared lint rules (root)
- `docs/` — project docs (root)

All root `pnpm` scripts (`pnpm dev`, `pnpm build`, `pnpm test:e2e:*`, …) proxy to
`apps/webtrine` via `pnpm --filter webtrine-app` — commands below work unchanged from root.
```

- [ ] **Step 2: Update path references**

Apply these replacements throughout AGENTS.md (verify each occurrence — do not blind-replace inside code that means "run from app dir"):

| Old | New |
|---|---|
| `config/customer/` | `apps/webtrine/config/customer/` |
| `lang/customer/` | `apps/webtrine/lang/customer/` |
| `src/` (as a path reference) | `apps/webtrine/src/` |
| `./build/{CUSTOMER}` | `apps/webtrine/build/{CUSTOMER}` |
| `scripts/` (shell scripts) | `apps/webtrine/scripts/` |

Run to find them: `grep -nE '(^|[^/a-z])((src|config|lang|scripts|public|tests)/)' AGENTS.md`

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "docs: update AGENTS.md paths for monorepo layout"
```

---

## Done criteria

- All Task 5 steps at parity with baseline.
- `git log` shows: restructure commit (renames), optional fix commits, AGENTS.md commit.
- Repo ready for Plan 2 (docs.md backfill at `apps/webtrine/src/design-system/**`) and Plan 3 (apps/simulator).
