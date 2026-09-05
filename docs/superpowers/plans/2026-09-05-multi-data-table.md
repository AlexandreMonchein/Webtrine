# MultiDataTable Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `multiDataTable` component (same folder as the existing `dataTable` component) that renders several related price tables under one shared title/hash/background slot, and migrate chillpaws' "Tarifs" page config to use it so 7 alternating-background stripes collapse to 2.

**Architecture:** New CSS-Modules component (`multiDataTable.component.tsx` + `.module.css` + `.types.ts` + `.stories.tsx` + `.docs.md` + integration test) living in `apps/webtrine/src/design-system/components/dataTable/`, reusing the `DataTableContent`/`TableColumn`/`TableData` types already exported from `dataTable.component.tsx`. The existing `dataTable` component is untouched. `config/customer/chillpaws/config.fr.json`'s Tarifs page content is then edited to replace 7 `dataTable-N` blocks with 2 `multiDataTable-N` blocks (chien group, chat group), preserving all existing text/prices exactly.

**Tech Stack:** React + TypeScript, CSS Modules (postcss-custom-media, mobile-first `--bp-min-*`), Vitest + Testing Library, Storybook, Playwright (visual regression).

**Spec:** `docs/superpowers/specs/2026-09-05-multi-data-table-design.md`

---

## File Structure

```
apps/webtrine/src/design-system/components/dataTable/
├── dataTable.component.tsx        (existing, untouched — exports TableColumn/TableData/DataTableContent types)
├── multiDataTable.types.ts        (new — MultiDataTableFeature, MultiDataTableProps)
├── multiDataTable.component.tsx   (new — MultiDataTable + private MultiDataTableItem sub-renderer)
├── multiDataTable.module.css      (new — CSS Modules, mirrors dataTable's visual language)
├── multiDataTable.stories.tsx     (new — Storybook, Overview story mandatory)
├── multiDataTable.docs.md         (new — config JSON examples)
└── __tests__/
    └── multiDataTable.component.int.tsx  (new — Vitest + Testing Library)

apps/webtrine/config/customer/chillpaws/config.fr.json  (modified — Tarifs page content only)
```

---

### Task 1: Types + component + CSS Module + integration tests

**Files:**
- Create: `apps/webtrine/src/design-system/components/dataTable/multiDataTable.types.ts`
- Create: `apps/webtrine/src/design-system/components/dataTable/multiDataTable.component.tsx`
- Create: `apps/webtrine/src/design-system/components/dataTable/multiDataTable.module.css`
- Test: `apps/webtrine/src/design-system/components/dataTable/__tests__/multiDataTable.component.int.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// apps/webtrine/src/design-system/components/dataTable/__tests__/multiDataTable.component.int.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import MultiDataTable from "../multiDataTable.component";
import type { MultiDataTableProps } from "../multiDataTable.types";

const createProps = (
  overrides: Partial<MultiDataTableProps> = {},
): MultiDataTableProps => ({
  title: "Visite chien / Promenade",
  subTitle: "*Tarifs dégressifs de 15% à partir du 2ème animal",
  hash: "visite-chien",
  features: { centeredTitles: true },
  tables: [
    {
      columns: [
        { header: "1 chien", key: "type" },
        { header: "Tarif / heure", key: "price1" },
      ],
      data: [{ type: "Visite ponctuelle", price1: "25 €" }],
    },
    {
      columns: [
        { header: "2 chien", key: "type" },
        { header: "Tarif / heure", key: "price1" },
      ],
      data: [{ type: "Visite ponctuelle", price1: "43 €" }],
    },
  ],
  ...overrides,
});

describe("<MultiDataTable />", () => {
  it("should render", () => {
    render(<MultiDataTable {...createProps()} />);
    expect(screen.getByTestId("multiDataTableRoot")).toBeInTheDocument();
  });

  it("should render the shared title with the hash as id", () => {
    render(<MultiDataTable {...createProps()} />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Visite chien / Promenade",
    });
    expect(heading).toHaveAttribute("id", "visite-chien");
  });

  it("should render one table per entry in tables", () => {
    render(<MultiDataTable {...createProps()} />);
    expect(screen.getAllByRole("table")).toHaveLength(2);
    expect(screen.getByText("1 chien")).toBeInTheDocument();
    expect(screen.getByText("2 chien")).toBeInTheDocument();
  });

  it("should render without title or subTitle when not provided", () => {
    render(
      <MultiDataTable
        {...createProps({ title: undefined, subTitle: undefined })}
      />,
    );
    expect(
      screen.queryByRole("heading", { level: 2 }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole("table")).toHaveLength(2);
  });

  it("should render fallback row when a table has no data", () => {
    render(
      <MultiDataTable
        {...createProps({
          tables: [
            { columns: [{ header: "1 chien", key: "type" }], data: [] },
          ],
        })}
      />,
    );
    expect(screen.getByText("Aucune donnée disponible")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/webtrine && pnpm test multiDataTable`
Expected: FAIL — `Failed to resolve import "../multiDataTable.component"` (file doesn't exist yet)

- [ ] **Step 3: Create the types file**

```ts
// apps/webtrine/src/design-system/components/dataTable/multiDataTable.types.ts
import type { DataTableContent } from "./dataTable.component";

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

- [ ] **Step 4: Create the CSS Module**

```css
/* apps/webtrine/src/design-system/components/dataTable/multiDataTable.module.css */
@import url('../../../custom-media.css');

.multiDataTableRoot {
  padding: 20px 40px;
  color: var(--theme-color-tertiary);

  @media (--bp-min-medium) {
    padding: 40px 120px;
  }

  @media (--bp-min-wide) {
    padding: 40px 480px;
  }
}

.title {
  color: var(--theme-color-foreground-1);
  text-align: left;

  &.titleCentered {
    text-align: center;
  }
}

.subTitle {
  text-align: left;

  &.subTitleCentered {
    text-align: center;
  }
}

.tableContainer {
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  background: var(--theme-color-primary);
  border: 1px solid var(--theme-color-tertiary);

  @media (--bp-min-medium) {
    border-radius: 12px;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}

.tableContainer + .tableContainer {
  margin-top: 24px;

  @media (--bp-min-medium) {
    margin-top: 32px;
  }
}

.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  @media (--bp-min-medium) {
    table-layout: auto;
  }
}

.tableHeader {
  background: var(--theme-color-background-1);
  border-bottom: 2px solid var(--theme-color-tertiary);
}

.tableHeaderCell {
  padding: 10px 12px;
  text-align: left;
  color: var(--theme-color-tertiary);
  letter-spacing: 0.025em;
  text-transform: uppercase;
  white-space: normal;

  @media (--bp-min-medium) {
    padding: 16px 20px;
    white-space: nowrap;
  }

  &.tableHeaderCellCentered {
    text-align: center;
  }

  &.tableHeaderCellFirst {
    border-top-left-radius: 12px;
  }

  &.tableHeaderCellLast {
    border-top-right-radius: 12px;
  }
}

.tableRow {
  border-bottom: 1px solid var(--theme-color-tertiary);
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--theme-color-background-1);
  }
}

.tableCell {
  padding: 10px 12px;
  color: var(--theme-color-tertiary);
  vertical-align: top;
  text-align: left;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (--bp-min-medium) {
    padding: 16px 20px;
  }

  &.tableCellCentered {
    text-align: center;
  }
}

.tableCellEmpty {
  padding: 10px 12px;
  text-align: center;
  color: var(--theme-color-tertiary);

  @media (--bp-min-medium) {
    padding: 16px 20px;
  }
}
```

- [ ] **Step 5: Create the component**

```tsx
// apps/webtrine/src/design-system/components/dataTable/multiDataTable.component.tsx
import classNames from "classnames";

import type { DataTableContent } from "./dataTable.component";
import styles from "./multiDataTable.module.css";
import type { MultiDataTableProps } from "./multiDataTable.types";

interface MultiDataTableItemProps {
  content: DataTableContent;
  centerContent: boolean;
}

const MultiDataTableItem = ({
  content,
  centerContent,
}: MultiDataTableItemProps) => {
  const { columns, data } = content;

  return (
    <div className={styles.tableContainer}>
      <table
        className={styles.table}
        aria-label={columns[0]?.header}
      >
        <thead className={styles.tableHeader}>
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key}
                scope="col"
                className={classNames(styles.tableHeaderCell, {
                  [styles.tableHeaderCellFirst]: index === 0,
                  [styles.tableHeaderCellLast]: index === columns.length - 1,
                  [styles.tableHeaderCellCentered]: centerContent,
                })}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.tableCellEmpty}>
                Aucune donnée disponible
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              const rowKey = Object.values(row).join("-") || `row-${rowIndex}`;
              return (
                <tr key={rowKey} className={styles.tableRow}>
                  {columns.map((column, columnIndex) => (
                    <td
                      key={`${rowKey}-${column.key}`}
                      className={classNames(styles.tableCell, {
                        [styles.tableCellFirst]: columnIndex === 0,
                        [styles.tableCellLast]:
                          columnIndex === columns.length - 1,
                        [styles.tableCellCentered]: centerContent,
                      })}
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export const MultiDataTable = ({
  title,
  subTitle,
  hash,
  features,
  tables,
}: MultiDataTableProps) => {
  const { centeredTitles = false, centerContent = false } = features || {};

  return (
    <section
      className={styles.multiDataTableRoot}
      data-testid="multiDataTableRoot"
    >
      {title && (
        <h2
          id={hash}
          className={classNames(styles.title, {
            [styles.titleCentered]: centeredTitles,
          })}
        >
          {title}
        </h2>
      )}
      {subTitle && (
        <p
          className={classNames(styles.subTitle, {
            [styles.subTitleCentered]: centeredTitles,
          })}
        >
          {subTitle}
        </p>
      )}
      {tables.map((table, index) => (
        <MultiDataTableItem
          key={`${table.columns.map((column) => column.key).join("-")}-${index}`}
          content={table}
          centerContent={centerContent}
        />
      ))}
    </section>
  );
};

export default MultiDataTable;
```

Note: `tableCellFirst`/`tableCellLast` classes are referenced but have no CSS rule (unlike the header's first/last radius) — cells don't need corner radius, only the header row does. This matches `dataTable.styled.ts`'s original behavior (only `TableHeaderCell` gets `isFirst`/`isLast` radius, `TableCell` does not).

- [ ] **Step 6: Run test to verify it passes**

Run: `cd apps/webtrine && pnpm test multiDataTable`
Expected: PASS — 5 tests passing

- [ ] **Step 7: Typecheck**

Run: `cd apps/webtrine && npx tsc --noEmit -p .`
Expected: No new errors introduced by the 3 new files (pre-existing unrelated errors in other files are fine)

- [ ] **Step 8: Commit**

```bash
git add apps/webtrine/src/design-system/components/dataTable/multiDataTable.types.ts \
  apps/webtrine/src/design-system/components/dataTable/multiDataTable.component.tsx \
  apps/webtrine/src/design-system/components/dataTable/multiDataTable.module.css \
  apps/webtrine/src/design-system/components/dataTable/__tests__/multiDataTable.component.int.tsx
git commit -m "feat(dataTable): add multiDataTable component

Renders several related price tables under one shared title/hash,
so grouped tables (e.g. price-by-pet-count) sit in a single content
block instead of one dataTable block per table."
```

---

### Task 2: Storybook stories

**Files:**
- Create: `apps/webtrine/src/design-system/components/dataTable/multiDataTable.stories.tsx`

- [ ] **Step 1: Create the stories file**

```tsx
// apps/webtrine/src/design-system/components/dataTable/multiDataTable.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";

import { MultiDataTable } from "./multiDataTable.component";
import type { MultiDataTableProps } from "./multiDataTable.types";

const defaultArgs: MultiDataTableProps = {
  title: "Visite chien / Promenade",
  subTitle: "*Tarifs dégressifs de 15% à partir du 2ème animal",
  hash: "visite-chien",
  features: { centeredTitles: true },
  tables: [
    {
      columns: [
        { header: "1 chien", key: "type" },
        { header: "Tarif / heure", key: "price1" },
        { header: "Tarif / demi heure", key: "price2" },
      ],
      data: [
        { type: "Visite ponctuelle", price1: "25 €", price2: "18 €" },
        {
          type: "Visite semaine lundi à samedi",
          price1: "150 €",
          price2: "108 €",
        },
      ],
    },
    {
      columns: [
        { header: "2 chiens", key: "type" },
        { header: "Tarif / heure", key: "price1" },
        { header: "Tarif / demi heure", key: "price2" },
      ],
      data: [
        { type: "Visite ponctuelle", price1: "43 €", price2: "31 €" },
        {
          type: "Visite semaine lundi à samedi",
          price1: "258 €",
          price2: "186 €",
        },
      ],
    },
    {
      columns: [
        { header: "3 chiens", key: "type" },
        { header: "Tarif / heure", key: "price1" },
        { header: "Tarif / demi heure", key: "price2" },
      ],
      data: [
        { type: "Visite ponctuelle", price1: "65 €", price2: "47 €" },
        {
          type: "Visite semaine lundi à samedi",
          price1: "390 €",
          price2: "282 €",
        },
      ],
    },
  ],
};

const meta: Meta<typeof MultiDataTable> = {
  title: "Design System/Components/DataTable/MultiDataTable",
  component: MultiDataTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiDataTable>;

export const Overview: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>
          Groupe de 3 tableaux avec titre partagé
        </h3>
        <MultiDataTable {...defaultArgs} />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>
          Sans sous-titre
        </h3>
        <MultiDataTable {...defaultArgs} subTitle={undefined} />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>
          Un seul tableau
        </h3>
        <MultiDataTable
          {...defaultArgs}
          tables={[defaultArgs.tables[0]]}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>
          Sans titre ni sous-titre
        </h3>
        <MultiDataTable
          {...defaultArgs}
          title={undefined}
          subTitle={undefined}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>
          Tableau sans donnée
        </h3>
        <MultiDataTable
          {...defaultArgs}
          tables={[
            {
              columns: [{ header: "1 chien", key: "type" }],
              data: [],
            },
          ]}
        />
      </div>
    </div>
  ),
};
```

- [ ] **Step 2: Verify Storybook renders it**

Run: `cd apps/webtrine && pnpm storybook` (starts dev server), open the URL it prints, navigate to "Design System/Components/DataTable/MultiDataTable" → "Overview"
Expected: All 5 cases render without console errors; stop the dev server (Ctrl+C) once confirmed

- [ ] **Step 3: Typecheck**

Run: `cd apps/webtrine && npx tsc --noEmit -p .`
Expected: No new errors

- [ ] **Step 4: Commit**

```bash
git add apps/webtrine/src/design-system/components/dataTable/multiDataTable.stories.tsx
git commit -m "feat(dataTable): add Storybook stories for multiDataTable"
```

---

### Task 3: Documentation

**Files:**
- Create: `apps/webtrine/src/design-system/components/dataTable/multiDataTable.docs.md`

- [ ] **Step 1: Create the docs file**

```markdown
# Multi Data Table Component (Groupe de tableaux de données)

Affiche plusieurs tableaux de données liés sous un titre/sous-titre partagé, dans un seul bloc de contenu (un seul fond alterné au lieu d'un par tableau).

## Exemples de configuration JSON

### Groupe de 3 tableaux (tarifs par nombre de chiens)

```json
{
  "type": "multiDataTable",
  "hash": "visite-chien",
  "features": {
    "centeredTitles": true
  },
  "title": "Visite chien / Promenade",
  "subTitle": "*Tarifs dégressifs de 15% à partir du 2ème animal",
  "tables": [
    {
      "columns": [
        { "header": "1 chien", "key": "type" },
        { "header": "Tarif / heure", "key": "price1" },
        { "header": "Tarif / demi heure", "key": "price2" }
      ],
      "data": [
        { "type": "Visite ponctuelle", "price1": "25 €", "price2": "18 €" }
      ]
    },
    {
      "columns": [
        { "header": "2 chiens", "key": "type" },
        { "header": "Tarif / heure", "key": "price1" },
        { "header": "Tarif / demi heure", "key": "price2" }
      ],
      "data": [
        { "type": "Visite ponctuelle", "price1": "43 €", "price2": "31 €" }
      ]
    }
  ]
}
```

### Notes

- `features` est optionnel : `centeredTitles` centre le titre/sous-titre, `centerContent` centre le contenu des cellules (les deux valent `false` par défaut).
- `title`/`subTitle`/`hash` sont partagés par tout le groupe — chaque tableau de `tables` distingue son propre sujet via son premier en-tête de colonne (ex: "1 chien" / "2 chiens").
- Si `data` est vide pour un tableau donné, ce tableau affiche une ligne "Aucune donnée disponible".
```

- [ ] **Step 2: Commit**

```bash
git add apps/webtrine/src/design-system/components/dataTable/multiDataTable.docs.md
git commit -m "docs(dataTable): add multiDataTable config documentation"
```

---

### Task 4: Migrate chillpaws Tarifs config

**Files:**
- Modify: `apps/webtrine/config/customer/chillpaws/config.fr.json:778-1066`

- [ ] **Step 1: Replace the 7 dataTable blocks with 2 multiDataTable blocks**

In `apps/webtrine/config/customer/chillpaws/config.fr.json`, find the block starting at `"dataTable-1": {` (line 778) and ending at the `},` that closes `"dataTable-7"` (line 1066, right before `"cards-1"`). Replace that entire range with:

```json
            "multiDataTable-1": {
              "type": "multiDataTable",
              "hash": "visite-chien",
              "features": {
                "centeredTitles": true
              },
              "title": "Visite chien / Promenade",
              "subTitle": "*Tarifs dégressifs de 15% à partir du 2ème animal",
              "tables": [
                {
                  "columns": [
                    {
                      "header": "1 chien",
                      "key": "type"
                    },
                    {
                      "header": "Tarif / heure",
                      "key": "price1"
                    },
                    {
                      "header": "Tarif / demi heure",
                      "key": "price2"
                    }
                  ],
                  "data": [
                    {
                      "type": "Visite ponctuelle",
                      "price1": "25 €",
                      "price2": "18 €"
                    },
                    {
                      "type": "Visite semaine lundi à samedi",
                      "price1": "150 €",
                      "price2": "108 €"
                    },
                    {
                      "type": "Visite dimanche et jours fériés (majoration 20%)",
                      "price1": "30 €",
                      "price2": "22 €"
                    }
                  ]
                },
                {
                  "columns": [
                    {
                      "header": "2 chien",
                      "key": "type"
                    },
                    {
                      "header": "Tarif / heure",
                      "key": "price1"
                    },
                    {
                      "header": "Tarif / demi heure",
                      "key": "price2"
                    }
                  ],
                  "data": [
                    {
                      "type": "Visite ponctuelle",
                      "price1": "43 €",
                      "price2": "31 €"
                    },
                    {
                      "type": "Visite semaine lundi à samedi",
                      "price1": "258 €",
                      "price2": "186 €"
                    },
                    {
                      "type": "Visite dimanche et jours fériés (majoration 20%)",
                      "price1": "52 €",
                      "price2": "37 €"
                    }
                  ]
                },
                {
                  "columns": [
                    {
                      "header": "3 chien",
                      "key": "type"
                    },
                    {
                      "header": "Tarif / heure",
                      "key": "price1"
                    },
                    {
                      "header": "Tarif / demi heure",
                      "key": "price2"
                    }
                  ],
                  "data": [
                    {
                      "type": "Visite ponctuelle",
                      "price1": "65 €",
                      "price2": "47 €"
                    },
                    {
                      "type": "Visite semaine lundi à samedi",
                      "price1": "390 €",
                      "price2": "282 €"
                    },
                    {
                      "type": "Visite dimanche et jours fériés (majoration 20%)",
                      "price1": "78 €",
                      "price2": "56 €"
                    }
                  ]
                }
              ]
            },
            "multiDataTable-2": {
              "type": "multiDataTable",
              "hash": "visite-chat-nac",
              "features": {
                "centeredTitles": true
              },
              "title": "Visite chat / NAC",
              "subTitle": "*Tarifs dégressifs de 15% à partir du 2ème animal",
              "tables": [
                {
                  "columns": [
                    {
                      "header": "1 chat",
                      "key": "type"
                    },
                    {
                      "header": "Tarif / heure",
                      "key": "price1"
                    },
                    {
                      "header": "Tarif / demi heure",
                      "key": "price2"
                    }
                  ],
                  "data": [
                    {
                      "type": "Visite ponctuelle",
                      "price1": "17 €",
                      "price2": "10 €"
                    },
                    {
                      "type": "Visite semaine lundi à samedi",
                      "price1": "102 €",
                      "price2": "60 €"
                    },
                    {
                      "type": "Visite dimanche et jours fériés (majoration 20%)",
                      "price1": "20 €",
                      "price2": "12 €"
                    }
                  ]
                },
                {
                  "columns": [
                    {
                      "header": "2 chat",
                      "key": "type"
                    },
                    {
                      "header": "Tarif / heure",
                      "key": "price1"
                    },
                    {
                      "header": "Tarif / demi heure",
                      "key": "price2"
                    }
                  ],
                  "data": [
                    {
                      "type": "Visite ponctuelle",
                      "price1": "30 €",
                      "price2": "16 €"
                    },
                    {
                      "type": "Visite semaine lundi à samedi",
                      "price1": "180 €",
                      "price2": "96 €"
                    },
                    {
                      "type": "Visite dimanche et jours fériés (majoration 20%)",
                      "price1": "35 €",
                      "price2": "19 €"
                    }
                  ]
                },
                {
                  "columns": [
                    {
                      "header": "3 chat",
                      "key": "type"
                    },
                    {
                      "header": "Tarif / heure",
                      "key": "price1"
                    },
                    {
                      "header": "Tarif / demi heure",
                      "key": "price2"
                    }
                  ],
                  "data": [
                    {
                      "type": "Visite ponctuelle",
                      "price1": "45 €",
                      "price2": "23 €"
                    },
                    {
                      "type": "Visite semaine lundi à samedi",
                      "price1": "270 €",
                      "price2": "138 €"
                    },
                    {
                      "type": "Visite dimanche et jours fériés (majoration 20%)",
                      "price1": "53 €",
                      "price2": "28 €"
                    }
                  ]
                },
                {
                  "columns": [
                    {
                      "header": "4 chat",
                      "key": "type"
                    },
                    {
                      "header": "Tarif / heure",
                      "key": "price1"
                    },
                    {
                      "header": "Tarif / demi heure",
                      "key": "price2"
                    }
                  ],
                  "data": [
                    {
                      "type": "Visite ponctuelle",
                      "price1": "58 €",
                      "price2": "31 €"
                    },
                    {
                      "type": "Visite semaine lundi à samedi",
                      "price1": "348 €",
                      "price2": "186 €"
                    },
                    {
                      "type": "Visite dimanche et jours fériés (majoration 20%)",
                      "price1": "69 €",
                      "price2": "37 €"
                    }
                  ]
                }
              ]
            },
```

Do not touch `"cards-1"` (the block right after) or anything before `"dataTable-1"` — those stay exactly as-is.

- [ ] **Step 2: Validate the JSON is well-formed**

Run: `cd apps/webtrine && node -e "JSON.parse(require('fs').readFileSync('config/customer/chillpaws/config.fr.json', 'utf8')); console.log('valid')"`
Expected: `valid`

- [ ] **Step 3: Verify the two new blocks parse with the right shape**

Run:
```bash
cd apps/webtrine && node -e "
const cfg = JSON.parse(require('fs').readFileSync('config/customer/chillpaws/config.fr.json', 'utf8'));
const tarifs = cfg.layout.templates.find((t) => t.name === 'Tarifs');
const content = tarifs.datas.content;
console.log(Object.keys(content));
console.log('m1 tables:', content['multiDataTable-1'].tables.length);
console.log('m2 tables:', content['multiDataTable-2'].tables.length);
console.log('m1 hash:', content['multiDataTable-1'].hash);
console.log('m2 hash:', content['multiDataTable-2'].hash);
"
```
Expected:
```
[
  'multiDataTable-1',
  'multiDataTable-2',
  'cards-1'
]
m1 tables: 3
m2 tables: 4
m1 hash: visite-chien
m2 hash: visite-chat-nac
```

- [ ] **Step 4: Commit**

```bash
git add apps/webtrine/config/customer/chillpaws/config.fr.json
git commit -m "feat(chillpaws): group Tarifs price tables into multiDataTable blocks

Collapses dataTable-1..3 (chien) and dataTable-4..7 (chat) into two
multiDataTable blocks so the page shows 2 alternating background
stripes instead of 7."
```

---

### Task 5: Manual verification + visual snapshot update

**Files:** none (verification only)

- [ ] **Step 1: Start the chillpaws dev server**

Run: `cd apps/webtrine && VITE_CUSTOMER=chillpaws pnpm dev` (background; if port 3000 is already serving chillpaws from a prior session, this step is already satisfied — just confirm with `curl -s http://localhost:3000/ | grep -o '<title>[^<]*</title>'`)

- [ ] **Step 2: Verify the Tarifs page in a browser**

Navigate to `http://localhost:3000/tarifs`. Confirm:
- Only 2 background stripes across the whole price section (not 7)
- "Visite chien / Promenade" heading followed by 3 stacked tables (1/2/3 chien)
- "Visite chat / NAC" heading followed by 4 stacked tables (1/2/3/4 chat)
- All prices match what was there before (spot-check a few against the values in Task 4)

- [ ] **Step 3: Verify hash-scroll still works**

From the home page, click "Visites chien / Promenade" (a card button linking to `/tarifs#visite-chien`). Confirm the page navigates and scrolls to the "Visite chien / Promenade" heading with no manual scrolling needed (this exercises the existing `scrollToTop.utils.js` MutationObserver fix — `multiDataTable`'s `<h2 id={hash}>` plays the same role `dataTable`'s did).

- [ ] **Step 4: Update Playwright visual snapshots for chillpaws**

Run: `cd apps/webtrine && TEST_CUSTOMER=chillpaws npx playwright test tests/e2e/visual.spec.ts --update-snapshots`
Expected: chillpaws snapshots regenerate; the `chillpaws-tarifs-*.png` files change (fewer background stripes), other chillpaws pages' snapshots stay byte-identical or regenerate with no visible diff

- [ ] **Step 5: Run the full e2e navigation suite for chillpaws**

Run: `cd apps/webtrine && pnpm test:e2e:chillpaws`
Expected: PASS — no broken navigation, no 404s

- [ ] **Step 6: Commit the updated snapshots**

```bash
git add apps/webtrine/tests/e2e/visual.spec.ts-snapshots/
git commit -m "test: update chillpaws visual snapshots for multiDataTable Tarifs layout"
```

---

## Self-Review Notes

- **Spec coverage:** Task 1 covers types/component/CSS/tests, Task 2 covers stories, Task 3 covers docs, Task 4 covers config migration, Task 5 covers manual + visual verification. All spec sections have a corresponding task.
- **Type consistency:** `MultiDataTableProps.tables: DataTableContent[]` (Task 1) matches what's passed in Task 2's stories and what Task 4's config produces (`"tables": [{ "columns": [...], "data": [...] }]`).
- **No placeholders:** every step has real, complete code.

## Post-Implementation Amendment

Task 4's code above uses JSON keys `"multiDataTable-1"`/`"multiDataTable-2"`. **This was a bug caught by code-quality review during implementation and fixed in the actual commit** — the app's dynamic loader (`multiDescriptions.component.tsx`) resolves each content block's *folder* from the JSON key (trailing `-N` stripped) and its *filename* from the `"type"` field, independently. Since `multiDataTable.component.tsx` lives in the `dataTable/` folder (per this plan's own file structure — same folder as `dataTable`, per the original request), the key prefix must strip down to `dataTable`, not `multiDataTable`. The keys actually committed are `"dataTable-1"`/`"dataTable-2"` (reusing the names freed up by removing the old `dataTable-1..7` blocks), while `"type": "multiDataTable"` is unchanged. Verified by rendering `/tarifs?customer=chillpaws` and confirming both anchor ids and all 7 tables render. If this plan is ever replayed from scratch, use `dataTable-1`/`dataTable-2` as the keys in Task 4, not `multiDataTable-1`/`multiDataTable-2`.
