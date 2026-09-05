# multiDataTable — Design

## Problem

`config/customer/chillpaws/config.fr.json` (and `.en.json`) renders the "Tarifs" page as 7 separate `dataTable` content blocks (chien 1/2/3 pets, chat 1/2/3/4 pets). Each top-level content block gets an alternating background (`multiDescriptions.module.css:14-35`, `nth-child(even/odd)` on `.container`'s direct children, applied regardless of block `type`). Seven consecutive blocks produce seven alternating stripes, which is visually noisy for what is conceptually two logical groups (chien tarifs, chat tarifs).

## Goal

A `multiDataTable` component that renders several related tables under **one** content block (one background stripe), grouped under a single shared title/subTitle/hash.

## Component

- **Name**: `multiDataTable`
- **Type**: `dataTable` (same folder as the existing `dataTable` component: `apps/webtrine/src/design-system/components/dataTable/`)
- **Styling**: CSS Modules (per `docs/COMPONENT_CREATION_GUIDE.md`), not styled-components — this is a new component, so it follows the current guide rather than the legacy pattern `dataTable.styled.ts` used.
- The existing `dataTable` component is untouched and keeps being used standalone elsewhere (apt235, webtrine, dipaolo, showcase configs).

### Files (per guide's 6-file pattern)

```
apps/webtrine/src/design-system/components/dataTable/
├── multiDataTable.component.tsx
├── multiDataTable.module.css
├── multiDataTable.types.ts
├── multiDataTable.stories.tsx
├── multiDataTable.docs.md
└── __tests__/multiDataTable.component.int.tsx
```

### Types

Reuses `TableColumn`, `TableData`, `DataTableContent` from the existing `dataTable.types.ts` (no duplication):

```ts
export interface MultiDataTableFeature {
  centeredTitles?: boolean;
  centerContent?: boolean;
}

export interface MultiDataTableProps {
  title?: string;
  subTitle?: string;
  hash?: string;
  features?: MultiDataTableFeature;
  tables: DataTableContent[];
}
```

One shared `title`/`subTitle`/`hash` for the whole group — matches the current data shape, where only the first table in each group carries a non-null title/subTitle and the others are `null` (their distinguishing label already lives in their first column header, e.g. "1 chien" / "2 chien" / "3 chien").

### Rendering

- Root `<section>` (`multiDataTableRoot`, `data-testid="multiDataTableRoot"`) — one visual wrapper, no per-sub-table Section/background.
- If `title`: `<h2 id={hash}>` (anchor target for the scroll-to-hash flow, same mechanism as `dataTable`).
- If `subTitle`: `<p>`.
- Maps over `tables`: each entry renders its own `<table>` (thead + tbody), same visual language as `dataTable` today — border-radius, box-shadow, border, `var(--theme-color-*)` — via CSS Modules, no `font-size`/`font-weight`/`font-family`/`font-style` overrides (per guide, typography is handled globally, not per-component).
- Tables are stacked vertically with spacing between them (margin-top on all but the first).
- Empty `data` on any individual table falls back to a single "Aucune donnée disponible" row, matching current `dataTable` behavior.
- `centeredTitles`/`centerContent` features apply the same way they do in `dataTable` today (text-align on titles / cell content).

### Config migration (chillpaws only)

In `config.fr.json` (chillpaws has no `config.en.json` — French only), tarifs page content:

- `dataTable-1` + `dataTable-2` + `dataTable-3` (chien 1/2/3 pets) → one block, key `dataTable-1`, `"type": "multiDataTable"`:
  - `title`/`subTitle`/`hash` taken from current `dataTable-1` (`"visite-chien"`)
  - `tables: [dataTable-1.content, dataTable-2.content, dataTable-3.content]`
- `dataTable-4` + `dataTable-5` + `dataTable-6` + `dataTable-7` (chat 1/2/3/4 pets) → one block, key `dataTable-2`, `"type": "multiDataTable"`:
  - `title`/`subTitle`/`hash` taken from current `dataTable-4` (`"visite-chat-nac"`)
  - `tables: [dataTable-4.content, ..., dataTable-7.content]`

Note: the content-block *key*'s prefix (before its trailing `-N`) must match the component's *folder* (`dataTable/`, per `multiDescriptions.component.tsx`'s dynamic-import resolution), while `"type"` selects the *file* within that folder (`multiDataTable.component.tsx`) — these are independent, matching the existing `"description-1"` (folder) / `"type": "team"` (file) convention elsewhere in this codebase. The keys are `dataTable-1`/`dataTable-2` (reusing what the removed `dataTable-1..7` blocks freed up), not `multiDataTable-1`/`multiDataTable-2`.

All existing text/prices/columns are preserved exactly — this is a structural regrouping, not a content change. No other customer config is touched.

## Testing

Vitest integration test (`__tests__/multiDataTable.component.int.tsx`), following the existing `dataTable` test pattern:
- renders root (`getByTestId("multiDataTableRoot")`)
- renders one `<table>` per entry in `tables`
- renders shared title with `id={hash}`
- renders "Aucune donnée disponible" fallback when a table's `data` is empty

## Stories

Overview story (French, per guide) covering: full group with shared title (mirrors the chien group), group without title (mirrors the chat group when used as a non-first block... not applicable here since both groups now have titles, so instead: a variant with `subTitle` omitted), single-table edge case, and empty-data edge case.

## Out of scope

- No changes to the existing `dataTable` component's own files.
- No changes to `multiDescriptions`, `LazyComponent`, or the alternating-background CSS — the fix is achieved purely by content grouping, not by changing how backgrounds alternate.
- No other customer configs touched.
