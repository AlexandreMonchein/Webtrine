---
name: component-creation
description: '**COMPONENT CREATION SKILL** — Create new React components in the Webtrine Design System following strict architectural patterns and conventions. USE FOR: creating new banner/cards/description/footer/navbar components; setting up component files structure; implementing CSS Modules with responsive design; creating Storybook stories with Overview pattern; writing component tests. REQUIRES: component NAME, TYPE (banner/cards/description/etc.), and DESCRIPTION before starting. DO NOT USE FOR: modifying existing components (use standard editing); debugging components; general React questions. MANDATORY WORKFLOW: Always ask for NAME + TYPE + DESCRIPTION if missing, then create all 6 required files in correct type folder.'
---

# Component Creation Skill - Webtrine Design System

## ⚡ Critical Rules for AI

### BLOCKING REQUIREMENTS
**STOP and ASK if ANY of these are missing:**
1. **Component NAME** (e.g., `team`, `contactBanner`, `heroSection`)
2. **Component TYPE** (e.g., `description`, `banner`, `footer`, `cards`)
3. **Detailed DESCRIPTION** of functionality and features

**DO NOT proceed without all three pieces of information.**

### MUST (Absolute Rules)
- ✅ **Type-first architecture**: Files in `src/design-system/{TYPE}/nom.*`
- ✅ **6 required files**: `.component.tsx`, `.module.css`, `.types.ts`, `.stories.tsx`, `.docs.md`, `__tests__/*.int.tsx`
- ✅ **CSS import mandatory**: `@import url('../../../custom-media.css');` as first line
- ✅ **Mobile-first**: Media queries with `--bp-min-*` nested in selectors
- ✅ **Hardcoded data-testid**: `data-testid="{nom}Root"` (never as prop)
- ✅ **defaultArgs pattern**: Create `const defaultArgs` and spread `...defaultArgs` in stories
- ✅ **Default export**: `export default MyComponent` for dynamic loading
- ✅ **Minimalist types**: `.types.ts` files without comments (self-explanatory names)
- ✅ **Overview story MANDATORY**: First story showing all use cases for Chromatic visual testing
- ✅ **French language**: All stories, content, and descriptions in French
- ✅ **Even numbers only**: Use 8px, 16px, 24px, 32px for spacing/sizing (never odd numbers)

### MUST NOT (Forbidden)
- ❌ **NEVER create without** NAME + TYPE + DESCRIPTION
- ❌ **NEVER** create component-specific folders (no `components/team/`)
- ❌ **NEVER** use `any` type in TypeScript
- ❌ **NEVER** add JSDoc (neither on React components nor in `.types.ts`)
- ❌ **NEVER** add `data-testid` props in types
- ❌ **NEVER** use font-properties in CSS (`font-size`, `font-weight`, `font-family`, `font-style`)
- ❌ **NEVER** use template strings for CSS classes (use `classNames()`)
- ❌ **NEVER** put implementation docs in `.stories.tsx` (use `.docs.md`)
- ❌ **NEVER** separate media queries (always nested)
- ❌ **NEVER** forget the Overview story (MANDATORY for visual testing)
- ❌ **NEVER** describe types/CSS classes in `.docs.md` (JSON config only)
- ❌ **NEVER** write stories in English (always French)

## Architecture Pattern

### File Structure
```
src/design-system/{TYPE}/
├── {nom}.component.tsx      # React component with default export
├── {nom}.module.css         # CSS Modules styles
├── {nom}.types.ts           # TypeScript interfaces
├── {nom}.stories.tsx        # Storybook stories
├── {nom}.docs.md            # Implementation documentation
└── __tests__/               # Shared test folder per type
    └── {nom}.component.int.tsx
```

### Available Types
Component types are defined by existing folders in `src/design-system/`:
- `components/banner/` - Main banners (hero, contact, etc.)
- `components/cards/` - Card lists and grids
- `components/description/` - Description and presentation sections
- `components/contact/` - Contact forms and sections
- `components/gallery/` - Image galleries
- `components/legals/` - Legal pages (terms, privacy, etc.)
- `components/list/` - Numbered or bulleted lists
- `components/prices/` - Pricing tables
- `navbars/` - Navigation bars
- `footers/` - Page footers
- `buttons/` - Button components
- `error/` - Error pages (404, 500, etc.)
- `utils/` - Utility components (displayers, etc.)

**Example**: "Create a **team** component of type **description**"
```
✅ CORRECT:
src/design-system/components/description/
├── team.component.tsx
├── team.module.css
├── team.types.ts
└── ...

❌ INCORRECT:
src/design-system/components/team/  ← No component-specific folder!
```

## Step-by-Step Creation Workflow

### Step 1: Verify Prerequisites (BLOCKING)
Before ANY file creation:
1. Confirm you have the component **NAME**
2. Confirm you have the component **TYPE**
3. Confirm you have a detailed **DESCRIPTION**

**If ANY is missing → STOP and ASK the user**

Example question format:
```
Je vais créer un nouveau composant. J'ai besoin de 3 informations :

1. **NOM** : Quel est le nom du composant ? (ex: team, contactBanner)
2. **TYPE** : Quelle catégorie ? (banner, cards, description, footer, navbar, etc.)
3. **DESCRIPTION** : Que doit faire ce composant ?
   - Quelles sont ses fonctionnalités principales ?
   - Quelles props sont nécessaires ?
   - Comment doit-il s'afficher ?
```

### Step 2: Create TypeScript Types

**File**: `{nom}.types.ts`

```typescript
import { type PropsWithChildren } from "react";

export type MyComponentVariant = "default" | "primary" | "secondary";

export type MyComponentProps = PropsWithChildren<{
  title?: string;
  description?: string;
  variant?: MyComponentVariant;
  /** Disables all interactions - Visual state only */
  disabled?: boolean;
  /** Image filename without extension (.webp added automatically) */
  image?: string;
}>;
```

**Key points**:
- ✅ Use `PropsWithChildren<>` if component accepts children
- ✅ Export variant types separately
- ✅ **Document ONLY non-obvious props** (implementation details, special behaviors)
- ❌ **DO NOT document obvious props** (title, description, name, etc.)
- ❌ **DO NOT include `data-testid` in props** - Will be hardcoded in component
- ❌ **NO comments by default** - Names must be self-explanatory

### Step 3: Create React Component

**File**: `{nom}.component.tsx`

```typescript
import classNames from "classnames";

import styles from "./{nom}.module.css";
import type { MyComponentProps } from "./{nom}.types";

export const MyComponent = ({
  children,
  title,
  description,
  variant = "default",
  disabled = false,
}: MyComponentProps) => {
  return (
    <section className={styles.myComponentRoot} data-testid="myComponentRoot">
      <div
        className={classNames(styles.content, {
          [styles.contentPrimary]: variant === "primary",
          [styles.contentSecondary]: variant === "secondary",
          [styles.contentDisabled]: disabled,
        })}
      >
        {title && <h2 className={styles.title}>{title}</h2>}
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>
    </section>
  );
};

export default MyComponent;
```

**Key points**:
- ✅ Use **CSS Modules** (not Styled Components)
- ✅ Use `classNames` for conditional classes
- ✅ **NO JSDoc comments** above component
- ✅ Destructure props with default values
- ✅ Root class name: `{componentName}Root`
- ✅ **Hardcode `data-testid="{componentName}Root"`** in root element
- ✅ **NO `any` type allowed** - Always type correctly
- ✅ Export as **default export** for dynamic loading

### Step 4: Create CSS Modules Styles

**File**: `{nom}.module.css`

```css
/* MANDATORY: Import as first line */
@import url('../../../custom-media.css');

/* Base styles - Mobile by default */
.myComponentRoot {
  padding: 1rem;
  background-color: var(--theme-color-background-1);
  border-radius: 8px;

  /* NESTED media queries */
  @media (--bp-min-medium) { padding: 2rem; }
  @media (--bp-min-large) { padding: 3rem; }
  @media (--bp-min-xlarge) { max-width: 1200px; margin: 0 auto; }
}

.title {
  color: var(--theme-color-primary);
  margin-bottom: 1rem;
  /* ❌ NO font-size, font-weight, font-family, font-style */
}

.description {
  color: var(--theme-color-secondary);
  line-height: 1.6; /* ✅ line-height is allowed */
}

/* Variants */
.myComponentRootPrimary { background-color: var(--theme-color-primary); }
.myComponentRootDisabled { opacity: 0.5; pointer-events: none; }
```

**Critical CSS Rules**:
- ✅ **@import MANDATORY** line 1: `@import url('../../../custom-media.css');`
- ✅ **Mobile First**: Mobile styles by default + `--bp-min-*`
- ✅ **Nesting**: Media queries INSIDE selectors
- ✅ **Variables**: `var(--theme-color-*)`, never hardcoded values
- ✅ **Even numbers only**: Use 8px, 16px, 24px, 32px (never 10px, 15px, 23px)
- ❌ **Font-properties FORBIDDEN**: `font-size`, `font-weight`, `font-family`, `font-style`
- ✅ **Allowed font-properties**: `line-height`, `letter-spacing`, `text-transform`, `text-align`

**Available Breakpoints**:
- `--bp-min-medium` (768px+) - Tablet
- `--bp-min-large` (1024px+) - Desktop
- `--bp-min-xlarge` (1440px+) - Large Desktop
- `--bp-min-wide` (1920px+) - Ultra Wide

**CSS Nesting Pattern**:
```css
/* ✅ GOOD - Nested states and children */
.button {
  background: var(--theme-color-primary);
  transition: background 0.2s ease;

  &:hover,
  &:focus {
    background: var(--theme-color-hover);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (--bp-min-medium) {
    padding: 2rem;
  }
}

/* ❌ BAD - Separated selectors */
.button { background: var(--theme-color-primary); }
.button:hover { background: var(--theme-color-hover); }
.button svg { width: 24px; }
```

### Step 5: Create Storybook Stories

**File**: `{nom}.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./{nom}.component";
import type { MyComponentProps } from "./{nom}.types";

// defaultArgs: Define ONCE, reuse everywhere
const defaultArgs: MyComponentProps = {
  title: "Mon composant",
  description: "Ceci est une variante par défaut",
  variant: "default",
};

const meta: Meta<typeof MyComponent> = {
  title: "Design System/Components/{TYPE}/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "primary", "secondary"] },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

// Overview: MANDATORY - All use cases for visual testing (Chromatic)
export const Overview: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>Par défaut</h3>
        <MyComponent {...defaultArgs} />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>Variante Primaire</h3>
        <MyComponent {...defaultArgs} variant="primary" />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>Variante Secondaire</h3>
        <MyComponent {...defaultArgs} variant="secondary" />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>Sans description</h3>
        <MyComponent {...defaultArgs} description={undefined} />
      </div>
    </div>
  ),
};

// Individual stories are optional (only if specific interaction needed)
// If all cases are in Overview, these stories are unnecessary
```

**Key points**:
- ✅ **Overview story MANDATORY**: First story displaying all component use cases (for Chromatic visual testing)
- ✅ **Titles in Overview**: Each use case must have a descriptive `<h3>`
- ✅ **defaultArgs pattern**: `const defaultArgs = {...}` then `...defaultArgs`
- ✅ **ONLY Overview is enough**: If all variants/features are in Overview, no need for other individual stories
- ✅ Individual stories optional: Only if specific interaction needed (e.g., Storybook controls for manual testing)
- ✅ Title format: `"Design System/Components/{TYPE}/{NAME}"`
- ✅ `tags: ["autodocs"]` for auto documentation
- ✅ **FRENCH LANGUAGE**: All story texts must be in French (titles, descriptions, content)
- ✅ **Showcase assets**: Always use `/assets/showcase/` in stories (not client-specific assets)
- ❌ **NO implementation docs** in stories (use `.docs.md`)

**Why Overview story?**
- 📸 **Efficient visual testing**: Chromatic (free version) limits snapshots. One Overview = 1 snapshot for all use cases instead of N snapshots
- 👁️ **Quick validation**: See all variants and states at a glance
- 🐛 **Regression detection**: CSS changes affecting multiple variants are immediately visible
- 💰 **Cost savings**: Significantly reduces snapshots billed by Chromatic

### Step 6: Create Tests

**File**: `__tests__/{nom}.component.int.tsx`

```typescript
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { MyComponent } from "../{nom}.component";
import type { MyComponentProps } from "../{nom}.types";

describe("<MyComponent />", () => {
  let props: MyComponentProps;

  beforeEach(() => {
    props = { title: "Test Title", description: "Test Description" };
  });

  it("should render", () => {
    render(<MyComponent {...props} />);
    expect(screen.getByTestId("myComponentRoot")).toBeInTheDocument();
  });

  it("should render title", () => {
    render(<MyComponent {...props} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should apply variant", () => {
    render(<MyComponent {...props} variant="primary" />);
    expect(screen.getByTestId("myComponentRoot").querySelector('[class*="contentPrimary"]')).toBeInTheDocument();
  });
});
```

**Key points**:
- ✅ `beforeEach` to initialize props
- ✅ `screen.getByTestId("{nom}Root")` to target root
- ✅ Test: basic render + conditional props + variants

### Step 7: Create Implementation Documentation

**File**: `{nom}.docs.md`

```markdown
# MyComponent

Brief description of the component and its main features.

## Configuration JSON

### Basic Example

\`\`\`json
{
  "type": "description",
  "id": "myComponent-1",
  "datas": {
    "title": "Mon titre",
    "description": "Ma description",
    "variant": "primary"
  }
}
\`\`\`

### With Advanced Options

\`\`\`json
{
  "type": "description",
  "id": "myComponent-2",
  "datas": {
    "title": "Mon titre",
    "description": "Ma description",
    "variant": "secondary",
    "images": [
      { "name": "image_1" },
      { "name": "image_2" }
    ]
  }
}
\`\`\`

## Keyboard Navigation

(Only if applicable - example: component with carousel, menu, etc.)

Selectors support keyboard navigation:
- **Enter**: Activate
- **Space**: Activate
- **Tab**: Navigate between elements

## Accessibility

(Only if specific important notes)

- ✅ Full keyboard navigation
- ✅ Appropriate ARIA attributes
```

**Documentation Guidelines**:
- ✅ **MINIMALIST**: Only JSON config, keyboard behavior, accessibility
- ✅ **Title and brief description**: 1-2 sentences maximum
- ✅ **JSON examples**: Multiple examples covering common use cases
- ✅ **Specific behaviors**: Keyboard navigation, carousel, etc. (if applicable)
- ✅ **Accessibility**: Only if important notes
- ❌ **DO NOT include**: TypeScript types, CSS classes, direct JSX examples, props interface

## JSON Configuration Structure

Components are **NEVER imported directly** - they're loaded via `config.json`.

### 4-Level Configuration Structure

```json
{
  "type": "{layoutType}",
  "id": "multiDescriptions",
  "name": "{routeName}",
  "datas": {
    "title": "{pageTitle}",
    "description": "{metaDescription}",
    "content": {
      "{folder}-{number}": {
        "type": "{componentName}",
        "datas": {
          "prop1": "value1",
          "prop2": "value2"
        }
      }
    }
  }
}
```

**Explanation**:
- **Level 1 (Layout)**: `type`, `id`, `name` → Routing and layout
- **Level 2 (Metadata)**: `title`, `description` → SEO
- **Level 3 (Content)**: Keys `{folder}-{number}` → Component organization
- **Level 4 (Component)**: `type` (filename) + `datas` (props)

### Key + Type → Component Mapping

| Config Key | Type | Component Path |
|------------|------|----------------|
| `description-1` | `team` | `components/description/team.component.tsx` |
| `banner-1` | `contactBanner` | `components/banner/contactBanner.component.tsx` |
| `cards-1` | `cardsList` | `components/cards/cardsList.component.tsx` |

**Rule**: `src/design-system/{folder}/{type}.component.tsx`

## Creation Checklist

### ⚠️ Prerequisites (BLOCKER)
- [ ] **NAME** defined
- [ ] **TYPE** identified
- [ ] **DESCRIPTION** detailed provided
- [ ] If missing → **ASK before creating**

### Architecture
- [ ] Type identified → correct folder (`{TYPE}/`)
- [ ] Files in `src/design-system/{TYPE}/` (no component-specific folder)
- [ ] Nomenclature: `{nom}.component.tsx`, `{nom}.module.css`, etc.
- [ ] Storybook title: `"Design System/Components/{TYPE}/{NAME}"`

### Required Files (6)
- [ ] `{nom}.component.tsx` - React + `export default`
- [ ] `{nom}.module.css` - @import custom-media line 1
- [ ] `{nom}.types.ts` - TypeScript interfaces
- [ ] `{nom}.stories.tsx` - defaultArgs + spread
- [ ] `{nom}.docs.md` - Full JSON implementation
- [ ] `__tests__/{nom}.component.int.tsx` - Vitest

### Code Quality
- [ ] No `any` TypeScript
- [ ] Props typed without `any`
- [ ] Types exported
- [ ] Variants separated as types
- [ ] No comments (self-explanatory names)
- [ ] CSS Modules (not Styled Components)
- [ ] `@import url('../../../custom-media.css');` line 1 in CSS
- [ ] Theme variables: `var(--theme-color-*)`
- [ ] Even numbers only for spacing/sizing (8px, 16px, 24px)
- [ ] ❌ **No font-properties** (size/weight/family/style)
- [ ] Mobile-first: `--bp-min-*` nested
- [ ] `classNames()` for multiple classes
- [ ] `data-testid="{nom}Root"` hardcoded (not as prop)

### Stories
- [ ] **Overview story created**: Displays all use cases (MANDATORY for Chromatic)
- [ ] **Titles in Overview**: Each use case has a descriptive `<h3>`
- [ ] **Showcase assets**: Uses `/assets/showcase/` (not client assets)
- [ ] `const defaultArgs` created + typed
- [ ] **ONLY Overview is enough**: No need for individual stories if everything is in Overview
- [ ] Individual stories optional: Only if specific interaction needed
- [ ] No arbitrary variations
- [ ] `tags: ["autodocs"]`
- [ ] ❌ No implementation docs in .stories.tsx
- [ ] ✅ French language (titles, descriptions, content)

### Tests
- [ ] Integration tests written
- [ ] Coverage: base + variants + states
- [ ] `beforeEach` for props

### Documentation
- [ ] `.docs.md` with complete JSON structure
- [ ] `.docs.md` MINIMALIST: only JSON config, no type/CSS class descriptions
- [ ] Stories in French (titles, descriptions, content)
- [ ] No JSDoc comments (neither in types nor on components)

### Final Verification
- [ ] Storybook display OK
- [ ] Tests pass: `pnpm test`
- [ ] No errors: `pnpm lint`
- [ ] Responsive: mobile → desktop
- [ ] Accessible (keyboard, screen readers)

## Common Theme Variables

**Colors**:
- Brand: `--theme-color-primary`, `--theme-color-secondary`, `--theme-color-tertiary`, `--theme-color-quaternary`, `--theme-color-quinary`
- Utility: `--theme-color-utility-1` (red), `--theme-color-utility-2` (green), `--theme-color-utility-3` (orange), `--theme-color-utility-4` (blue)
- Extended: `--theme-color-hover`, `--theme-color-background-1`, `--theme-color-background-2`, `--theme-color-foreground-1`, `--theme-color-foreground-2`

**Typography**:
- `--navbar-font-size`, `--subtitle-font-size`, `--text-font-size`, `--description-font-size`

**Z-index**:
- `--z-index-navbars`, etc.

Full list in: `src/design-system/tokens/tokens.stories.tsx`

## Useful Commands

```bash
pnpm storybook          # Start Storybook
pnpm test               # Tests in watch mode
pnpm test {nom}         # Specific tests
pnpm lint               # Linter
```

## Reference Examples

- **Complete example**: `src/design-system/example/`
- **Reference component**: `src/design-system/components/description/team.*`
- **Tokens**: Storybook → `Design System/Tokens`
- **Media queries**: `docs/CUSTOM_MEDIA_QUERIES.md`
- **CSS Migration**: `docs/CSS_MODULES_MIGRATION.md`

## Decision Tree

```
START
  ├─ Do I have NAME + TYPE + DESCRIPTION?
  │  ├─ NO → STOP and ASK now
  │  └─ YES → Continue
  │
  ├─ Identify TYPE folder in src/design-system/
  │  └─ Examples: banner/, description/, cards/, footer/, navbar/
  │
  ├─ Create 6 files in {TYPE}/
  │  ├─ {nom}.component.tsx (React + hardcoded data-testid)
  │  ├─ {nom}.module.css (@import custom-media + mobile-first)
  │  ├─ {nom}.types.ts (pure types, no comments)
  │  ├─ {nom}.stories.tsx (defaultArgs + spread)
  │  ├─ {nom}.docs.md (full JSON implementation)
  │  └─ __tests__/{nom}.component.int.tsx (Vitest)
  │
  └─ Verify final checklist
```

## Custom React Hooks

### Location and Naming

Custom React hooks are stored in **`src/hooks/`** and follow strict naming conventions:

**Convention**: `{hookName}.hooks.{ts|tsx|js}`

**Examples**:
```
src/hooks/
├── useImageUpload.hooks.ts        # TypeScript hook
├── useImageUpload.docs.md         # Hook documentation (optional)
├── useStructuredData.hooks.tsx    # TypeScript hook with JSX
└── __tests__/                     # Hook tests
    └── useImageUpload.hooks.test.ts
```

### Hook Naming Rules

- ✅ **ALWAYS** prefix name with `use` (React convention)
- ✅ **ALWAYS** use suffix `.hooks.{ts|tsx|js}`
- ✅ **camelCase** for filename: `useMyCustomHook.hooks.ts`
- ✅ Extension `.ts` for TypeScript hooks without JSX
- ✅ Extension `.tsx` for TypeScript hooks with JSX

### Hook Structure

```typescript
// src/hooks/useMyCustomHook.hooks.ts
import { useCallback, useState } from "react";

export type MyCustomHookConfig = {
  option1: string;
  option2?: number;
};

export type MyCustomHookResult = {
  data: string[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
};

export const useMyCustomHook = (config: MyCustomHookConfig): MyCustomHookResult => {
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    // Logic here
  }, []);

  return {
    data,
    isLoading,
    error,
    refresh,
  };
};
```

## Edge Cases and Tips

### When to Create Types vs Inline

- **Separate `.types.ts`**: When component has multiple variants, complex props, or reusable types
- **Inline types**: Simple components with 1-2 props (rare)

### classNames() Usage

```typescript
// ✅ GOOD - Using classNames
import classNames from 'classnames';

<div className={classNames(styles.button, {
  [styles.buttonPrimary]: isPrimary,
  [styles.buttonDisabled]: disabled,
})}>

// Multiple static classes
<div className={classNames(styles.textBlock, styles.textBlockTop)}>

// ❌ BAD - Template strings
<div className={`${styles.button} ${isPrimary ? styles.primary : ''}`}>
```

### Font Properties Explained

**FORBIDDEN in CSS**:
- `font-size` - Managed by global theme
- `font-weight` - Managed by global theme
- `font-family` - Managed by global theme
- `font-style` - Managed by global theme

**ALLOWED in CSS**:
- `line-height` - Affects text readability
- `letter-spacing` - Affects text spacing
- `text-transform` - uppercase, lowercase, capitalize
- `text-align` - left, center, right, justify

### Transform vs Real Dimensions

**PREFER**: Real dimension changes (width/height) over `transform: scale()`

```css
/* ✅ GOOD - Real dimensions */
.icon {
  width: 24px;
  height: 24px;

  &:hover {
    width: 28px;
    height: 28px;
  }
}

/* ❌ AVOID - Transform scale */
.icon {
  width: 24px;
  height: 24px;

  &:hover {
    transform: scale(1.2);
  }
}
```

**Why?** Real dimensions are more predictable, don't affect surrounding layout, and are simpler to debug.

### Even Numbers Explained

**RULE**: Always use **even numbers** for dimensions, spacing, and sizes. Never odd numbers except minimal exceptions (1px for borders).

```css
/* ✅ GOOD - Even values */
.button {
  width: 50px;
  height: 50px;
  padding: 16px 24px;
  gap: 8px;
}

/* ❌ BAD - Odd values */
.button {
  width: 51px;    /* ❌ odd */
  height: 49px;   /* ❌ odd */
  gap: 9px;       /* ❌ odd */
}

/* ✅ EXCEPTION - Minimal borders */
.line {
  height: 1px;  /* ✅ OK for borders */
  border: 1px solid;  /* ✅ OK */
}
```

**Recommended values**: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 100, etc.

## Common Pitfalls

### Missing Prerequisites
**Problem**: Starting to create files without NAME/TYPE/DESCRIPTION
**Solution**: Always verify prerequisites first, ASK if any are missing

### Wrong Folder Structure
**Problem**: Creating `src/design-system/components/team/team.component.tsx`
**Solution**: Files go directly in TYPE folder: `src/design-system/components/description/team.component.tsx`

### Separated Media Queries
**Problem**:
```css
.root { padding: 1rem; }
@media (--bp-min-medium) { .root { padding: 2rem; } }
```
**Solution**:
```css
.root {
  padding: 1rem;
  @media (--bp-min-medium) { padding: 2rem; }
}
```

### Missing Overview Story
**Problem**: Only individual stories (Primary, Secondary, etc.) without Overview
**Solution**: Always create Overview story first with all use cases

### English in Stories
**Problem**: `title: "Our Company"` or `<h3>Default variant</h3>`
**Solution**: Everything in French: `title: "Notre entreprise"` or `<h3>Variante par défaut</h3>`

### Font Properties in CSS
**Problem**: `.title { font-size: 2rem; font-weight: bold; }`
**Solution**: Remove font properties, use theme variables for colors only

### Template Strings for Classes
**Problem**: `className={\`\${styles.root} \${styles.active}\`}`
**Solution**: `className={classNames(styles.root, styles.active)}`

### data-testid as Prop
**Problem**: Adding `dataTestId?: string` to props interface
**Solution**: Hardcode `data-testid="{componentName}Root"` directly in JSX

## When to Use This Skill

**Use this skill when**:
- Creating a new component from scratch
- User asks to create a banner, card, description, footer, or navbar component
- Setting up a complete component structure with all required files
- Need guidance on Webtrine component architecture

**Do NOT use this skill when**:
- Modifying existing components (use standard editing)
- Debugging component issues
- General React questions
- Creating hooks (hooks follow different patterns, see hooks section)
- Creating utilities or helpers (different location and structure)
