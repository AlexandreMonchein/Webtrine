---
name: css-modules-migration
description: '**CSS MIGRATION SKILL** — Migrate React components from Styled Components to CSS Modules following Webtrine standards. USE FOR: converting styled.ts files to .module.css; removing styled-components; implementing CSS nesting patterns; migrating conditional props to classNames(); fixing font-properties violations. REQUIRES: CSS Modules import mandatory, nesting for all selectors (descendants/pseudo-classes/media queries), mobile-first breakpoints, no font-properties. DO NOT USE FOR: creating new components (use component-creation skill); debugging CSS issues; general styling questions; non-migration CSS work.'
---

# CSS Modules Migration Skill - Webtrine

## ⚡ Quick Rules for AI

### MUST (Migration Rules)
- ✅ **Create `.module.css`** with `@import url('../../../custom-media.css');` line 1
- ✅ **Import with** `import styles from './component.module.css'`
- ✅ **Use classNames()** for multiple/conditional classes
- ✅ **CSS Nesting MANDATORY**: Nest ALL selectors (descendants, pseudo-classes, media queries) inside main class
- ✅ **Nested media queries** INSIDE selectors (mobile-first)
- ✅ **Same CSS variables**: `var(--theme-color-*)` works identically
- ✅ **Default export** if dynamic loading
- ✅ **camelCase** class names
- ✅ **Even numbers only**: Use 8px, 16px, 24px, 32px for spacing/sizing

### MUST NOT (Forbidden)
- ❌ **NEVER use font-properties** (`font-size`, `font-weight`, `font-family`, `font-style`)
- ❌ **NEVER template strings** for classes (`${styles.a} ${styles.b}`)
- ❌ **NEVER separated selectors** (descendants, pseudo-classes → always nested)
- ❌ **NEVER separated media queries** (always nested)
- ❌ **NEVER desktop-first** (use `--bp-min-*`)
- ❌ **NEVER odd numbers** for spacing/sizing (use even numbers only)

## Migration Pattern Overview

### Quick Conversion Pattern

```tsx
// ❌ BEFORE (Styled Components)
import styled from 'styled-components';

const Title = styled.h1`
  color: var(--theme-color-primary);
  font-size: 2rem; // ❌ font property
`;

const Container = styled.div<{ $active?: boolean }>`
  padding: 1rem;
  background: ${props => props.$active ? 'blue' : 'gray'};
`;

export const MyComponent = ({ active }) => (
  <Container $active={active}>
    <Title>Hello</Title>
  </Container>
);

// ✅ AFTER (CSS Modules)
// myComponent.module.css
@import url('../../../custom-media.css');

.container {
  padding: 1rem;
  background: gray;
}

.containerActive {
  background: blue;
}

.title {
  color: var(--theme-color-primary);
  /* ❌ NO font-size */
  margin: 0;
}

// myComponent.component.tsx
import classNames from 'classnames';
import styles from './myComponent.module.css';

export const MyComponent = ({ active }) => (
  <div className={classNames(styles.container, {
    [styles.containerActive]: active
  })}>
    <h1 className={styles.title}>Hello</h1>
  </div>
);
```

### CSS Nesting Pattern (MANDATORY)

```css
/* ❌ BAD - Separated selectors */
.description { width: 100%; }
.description a { color: blue; }
.description a:hover { color: red; }
.description a:focus { color: red; }

/* ✅ GOOD - Nested selectors */
.description {
  width: 100%;

  a {
    color: blue;

    &:hover,
    &:focus {
      color: red;
    }
  }
}
```

## Why CSS Modules?

### Advantages
- ✅ **Performance**: No JS runtime, static CSS
- ✅ **Bundle size**: ~30kb reduction (styled-components runtime removed)
- ✅ **Simplicity**: Clear HTML/CSS separation
- ✅ **Tooling**: Better IDE support, IntelliSense
- ✅ **SSR**: No hydration mismatch
- ✅ **Debug**: Readable classes in dev mode

### Coexistence
Both systems coexist during migration (component by component).

## Step-by-Step Migration Workflow

### Step 1: Create CSS Module File

**Action**: Create `{component}.module.css` file next to component

**Critical**: First line MUST be:
```css
@import url('../../../custom-media.css');
```

### Step 2: Convert Styled Components to CSS Classes

**Pattern**: Each styled component becomes a CSS class

```tsx
// ❌ BEFORE
const Container = styled.div`
  padding: 2rem;
  background: var(--theme-color-primary);
`;

const Title = styled.h1`
  color: var(--theme-color-secondary);
  margin-bottom: 1rem;
`;

// ✅ AFTER (CSS)
.container {
  padding: 2rem;
  background: var(--theme-color-primary);
}

.title {
  color: var(--theme-color-secondary);
  margin-bottom: 1rem;
}
```

### Step 3: Convert Conditional Props to classNames()

**Pattern**: Props-based styles → conditional classes

```tsx
// ❌ BEFORE
const Button = styled.button<{ $primary?: boolean; $disabled?: boolean }>`
  background: ${props => props.$primary ? 'blue' : 'gray'};
  opacity: ${props => props.$disabled ? 0.5 : 1};
`;

<Button $primary $disabled>Click</Button>

// ✅ AFTER (CSS)
.button { background: gray; }
.buttonPrimary { background: blue; }
.buttonDisabled { opacity: 0.5; cursor: not-allowed; }

// ✅ AFTER (TSX)
import classNames from 'classnames';

<button className={classNames(styles.button, {
  [styles.buttonPrimary]: isPrimary,
  [styles.buttonDisabled]: disabled
})} disabled={disabled}>
  Click
</button>
```

### Step 4: Convert Breakpoints to Nested Media Queries

**Pattern**: `bp.min()` helper → `@media (--bp-min-*)` nested

```css
// ❌ BEFORE (Styled Components)
import { bp } from '@/breakpoint';

const Container = styled.div`
  width: 100%;
  padding: 1rem;

  ${bp.min('tablet')} {
    width: 50%;
    padding: 2rem;
  }

  ${bp.min('desktop')} {
    width: 33%;
    padding: 3rem;
  }
`;

// ✅ AFTER (CSS Modules with nesting)
@import url('../../../custom-media.css');

.container {
  width: 100%;
  padding: 1rem;

  @media (--bp-min-medium) {
    width: 50%;
    padding: 2rem;
  }

  @media (--bp-min-large) {
    width: 33%;
    padding: 3rem;
  }
}
```

**Available Breakpoints**:
- `--bp-min-medium` (768px+) - Tablet
- `--bp-min-large` (1024px+) - Desktop
- `--bp-min-xlarge` (1440px+) - Large Desktop
- `--bp-min-wide` (1920px+) - Ultra Wide

### Step 5: Remove Font Properties

**Critical**: Remove ALL font-properties (managed globally by theme)

```css
// ❌ BEFORE (Styled Components)
const Title = styled.h1`
  font-size: var(--subtitle-font-size);
  font-weight: bold;
  font-family: Arial;
  color: var(--theme-color-primary);
  line-height: 1.5;
`;

// ✅ AFTER (CSS Modules)
.title {
  /* ❌ NO font-size, font-weight, font-family */
  color: var(--theme-color-primary);
  line-height: 1.5; /* ✅ line-height OK */
}
```

**Forbidden font-properties**:
- ❌ `font-size`
- ❌ `font-weight`
- ❌ `font-family`
- ❌ `font-style`

**Allowed font-related properties**:
- ✅ `line-height`
- ✅ `letter-spacing`
- ✅ `text-transform`
- ✅ `text-align`

**Why?** Font properties are managed globally in `src/theme/customer/default/globalStyle.css` to ensure consistency across the entire application.

### Step 6: Update Component Imports

**Pattern**: Replace styled imports with CSS Modules

```tsx
// ❌ BEFORE
import { Container, Title, Button } from './myComponent.styled';

export const MyComponent = () => (
  <Container>
    <Title>Hello</Title>
    <Button>Click</Button>
  </Container>
);

// ✅ AFTER
import styles from './myComponent.module.css';

export const MyComponent = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Hello</h1>
    <button className={styles.button}>Click</button>
  </div>
);
```

### Step 7: Apply CSS Nesting

**MANDATORY**: All selectors must be nested inside their parent class

```css
/* ❌ BAD - Flat separated selectors */
.cardWrapper { display: flex; }
.cardWrapper img { width: 100%; }
.cardWrapper img:hover { opacity: 0.8; }
.cardWrapper .title { color: blue; }

/* ✅ GOOD - Nested structure */
.cardWrapper {
  display: flex;

  img {
    width: 100%;

    &:hover {
      opacity: 0.8;
    }
  }

  .title {
    color: blue;
  }
}
```

**Nesting rules**:
- ✅ Descendants: `a`, `img`, `div` → nested
- ✅ Pseudo-classes: `&:hover`, `&:focus`, `&:active` → nested
- ✅ Pseudo-elements: `&::before`, `&::after` → nested
- ✅ Media queries: `@media (...)` → nested
- ✅ Modifiers: Separate class (`.buttonPrimary`) or composed (`.button.primary`)

**Complex nesting example**:
```css
.card {
  padding: 1rem;
  border: 1px solid var(--theme-color-tertiary);

  /* Media queries nested */
  @media (--bp-min-medium) {
    padding: 2rem;
  }

  /* Element selectors nested */
  img {
    width: 100%;
    border-radius: 8px;

    /* Nested media query inside img */
    @media (--bp-min-large) {
      width: 50%;
    }
  }

  /* Pseudo-classes nested */
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);

    /* Nested descendant inside pseudo-class */
    img {
      opacity: 0.9;
    }
  }

  /* Class selectors nested */
  .title {
    margin-bottom: 1rem;
  }
}

/* Variants as separate classes */
.cardHighlighted {
  border-color: var(--theme-color-primary);
  background: var(--theme-color-background-1);
}
```

### Step 8: Test and Verify

1. **Visual check**: Component looks identical
2. **Storybook**: All stories render correctly
3. **Tests pass**: `pnpm test`
4. **Responsive**: Check all breakpoints
5. **Interactions**: Hover, focus, active states

### Step 9: Delete Styled Components File

**Only after verification**:
- Delete `{component}.styled.ts`
- Remove styled-components import if not used elsewhere

## Complete Migration Examples

### Example 1: Banner Component

```tsx
// ❌ BEFORE (banner.styled.ts)
import styled from 'styled-components';
import { bp } from '@/breakpoint';

export const BannerContainer = styled.div`
  padding: 2rem;
  background: var(--theme-color-primary);
  text-align: center;

  ${bp.min('tablet')} {
    padding: 4rem;
  }
`;

export const BannerTitle = styled.h1`
  color: var(--theme-color-secondary);
  font-size: var(--subtitle-font-size);
  margin-bottom: 1rem;
`;

export const BannerDescription = styled.p`
  color: var(--theme-color-background-1);
  line-height: 1.6;
`;

// ❌ BEFORE (banner.component.tsx)
import { BannerContainer, BannerTitle, BannerDescription } from './banner.styled';

export const Banner = ({ title, description }) => (
  <BannerContainer>
    <BannerTitle>{title}</BannerTitle>
    <BannerDescription>{description}</BannerDescription>
  </BannerContainer>
);
```

```css
/* ✅ AFTER (banner.module.css) */
@import url('../../../custom-media.css');

.container {
  padding: 2rem;
  background: var(--theme-color-primary);
  text-align: center;

  @media (--bp-min-medium) {
    padding: 4rem;
  }
}

.title {
  color: var(--theme-color-secondary);
  /* ❌ NO font-size */
  margin-bottom: 1rem;
}

.description {
  color: var(--theme-color-background-1);
  line-height: 1.6;
}
```

```tsx
// ✅ AFTER (banner.component.tsx)
import styles from './banner.module.css';

export const Banner = ({ title, description }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.description}>{description}</p>
  </div>
);
```

### Example 2: Button with Variants and States

```tsx
// ❌ BEFORE (button.styled.ts)
import styled from 'styled-components';

export const StyledButton = styled.button<{
  $variant?: 'primary' | 'secondary';
  $disabled?: boolean;
  $fullWidth?: boolean;
}>`
  padding: 1rem 2rem;
  border: none;
  cursor: pointer;
  background: ${props =>
    props.$variant === 'primary'
      ? 'var(--theme-color-primary)'
      : 'var(--theme-color-secondary)'};
  opacity: ${props => props.$disabled ? 0.5 : 1};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};

  &:hover {
    opacity: 0.8;
  }
`;

// ❌ BEFORE (button.component.tsx)
import { StyledButton } from './button.styled';

export const Button = ({ variant, disabled, fullWidth, children }) => (
  <StyledButton $variant={variant} $disabled={disabled} $fullWidth={fullWidth}>
    {children}
  </StyledButton>
);
```

```css
/* ✅ AFTER (button.module.css) */
@import url('../../../custom-media.css');

.button {
  padding: 1rem 2rem;
  border: none;
  cursor: pointer;
  background: var(--theme-color-secondary);

  &:hover {
    opacity: 0.8;
  }
}

.buttonPrimary {
  background: var(--theme-color-primary);
}

.buttonDisabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.buttonFullWidth {
  width: 100%;
}
```

```tsx
// ✅ AFTER (button.component.tsx)
import classNames from 'classnames';
import styles from './button.module.css';

export const Button = ({
  variant = 'secondary',
  disabled = false,
  fullWidth = false,
  children
}) => (
  <button
    className={classNames(styles.button, {
      [styles.buttonPrimary]: variant === 'primary',
      [styles.buttonDisabled]: disabled,
      [styles.buttonFullWidth]: fullWidth,
    })}
    disabled={disabled}
  >
    {children}
  </button>
);
```

### Example 3: Card with Nested Elements

```tsx
// ❌ BEFORE (card.styled.ts)
import styled from 'styled-components';

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid var(--theme-color-tertiary);

  img {
    width: 100%;
    border-radius: 8px;
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);

    img {
      opacity: 0.9;
    }
  }
`;

export const CardTitle = styled.h3`
  color: var(--theme-color-primary);
  font-weight: bold;
  margin: 1rem 0;
`;
```

```css
/* ✅ AFTER (card.module.css) */
@import url('../../../custom-media.css');

.wrapper {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid var(--theme-color-tertiary);

  img {
    width: 100%;
    border-radius: 8px;
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);

    img {
      opacity: 0.9;
    }
  }
}

.title {
  color: var(--theme-color-primary);
  /* ❌ NO font-weight */
  margin: 1rem 0;
}
```

## CSS Variables Reference

All CSS variables from `style.config.json` work identically in CSS Modules!

**Theme colors**:
- Brand: `--theme-color-primary`, `--theme-color-secondary`, `--theme-color-tertiary`, `--theme-color-quaternary`, `--theme-color-quinary`
- Utility: `--theme-color-utility-1` (red), `--theme-color-utility-2` (green), `--theme-color-utility-3` (orange), `--theme-color-utility-4` (blue)
- Extended: `--theme-color-hover`, `--theme-color-background-1`, `--theme-color-background-2`, `--theme-color-foreground-1`, `--theme-color-foreground-2`

**Typography** (values only, not properties):
- `--navbar-font-size`, `--subtitle-font-size`, `--text-font-size`, `--description-font-size`

**Z-index**:
- `--z-index-navbars`, etc.

Full list: `src/design-system/tokens/tokens.stories.tsx`

## classNames() Library

**Install**: Already included in dependencies ✅

**Usage patterns**:

```tsx
import classNames from 'classnames';

// Multiple static classes
<div className={classNames(styles.card, styles.cardBordered)}>

// Conditional classes (object syntax)
<div className={classNames(styles.button, {
  [styles.buttonPrimary]: isPrimary,
  [styles.buttonDisabled]: disabled,
  [styles.buttonActive]: isActive,
})}>

// Mixed static + conditional
<div className={classNames(
  styles.input,
  styles.inputLarge,
  {
    [styles.inputError]: hasError,
    [styles.inputFocused]: isFocused,
  }
)}>

// ❌ NEVER use template strings
<div className={`${styles.button} ${isPrimary ? styles.primary : ''}`}>
```

## Migration Checklist

### Per Component
- [ ] Create `.module.css` with @import line 1
- [ ] Convert styled components → CSS classes with proper naming
- [ ] **CSS Nesting: Nest all selectors (descendants, pseudo-classes, media queries)**
- [ ] Conditional props → `classNames()`
- [ ] Media queries → nested + mobile-first (`--bp-min-*`)
- [ ] Remove ALL font-properties (size/weight/family/style)
- [ ] Even numbers only for spacing/sizing (8px, 16px, not 9px, 15px)
- [ ] Update component imports
- [ ] Test visual appearance
- [ ] Verify Storybook stories
- [ ] Run tests: `pnpm test`
- [ ] Check responsive breakpoints
- [ ] Verify hover/focus/active states
- [ ] Delete `.styled.ts` file

### Full Migration (Project-wide)
- [ ] New components: CSS Modules only (use component-creation skill)
- [ ] Simple components first (buttons, cards)
- [ ] Then layout components (banner, description)
- [ ] Navigation last (navbars, footers)
- [ ] All tests pass
- [ ] No visual regressions
- [ ] Remove `styled-components` from `package.json`
- [ ] Migrate `globalStyled.ts` → `globalStyle.css` (if exists)

## Common Pitfalls

### Separated Selectors
**Problem**:
```css
.container { padding: 1rem; }
.container a { color: blue; }
.container a:hover { color: red; }
```
**Solution**:
```css
.container {
  padding: 1rem;

  a {
    color: blue;

    &:hover {
      color: red;
    }
  }
}
```

### Font Properties
**Problem**: `.title { font-size: 2rem; font-weight: bold; }`
**Solution**: `.title { line-height: 1.5; }` (remove font-size/weight)

### Template Strings for Classes
**Problem**: `className={\`\${styles.button} \${styles.active}\`}`
**Solution**: `className={classNames(styles.button, styles.active)}`

### Desktop-First Media Queries
**Problem**: `@media (max-width: 767px) { ... }`
**Solution**: `@media (--bp-min-medium) { ... }` (mobile-first)

### Missing @import
**Problem**: Custom media queries not working
**Solution**: Add `@import url('../../../custom-media.css');` as first line

### Odd Numbers
**Problem**: `padding: 15px; width: 33px;`
**Solution**: `padding: 16px; width: 32px;` (even numbers only)

## Best Practices

### 1. Naming Conventions
- ✅ **camelCase**: `styles.myClass`
- ✅ **Descriptive**: `.cardTitle` > `.t1`
- ✅ **BEM-like**: `.componentName__element--modifier` (optional)
- ✅ **Variants**: `.buttonPrimary`, `.buttonSecondary`
- ✅ **States**: `.buttonDisabled`, `.buttonActive`

### 2. Class Composition
```css
.baseButton {
  padding: 1rem 2rem;
  border: none;
  cursor: pointer;
}

.primaryButton {
  composes: baseButton;
  background: var(--theme-color-primary);
}

.secondaryButton {
  composes: baseButton;
  background: var(--theme-color-secondary);
}
```

### 3. Mobile-First Responsive
```css
.container {
  /* Mobile styles (default) */
  padding: 1rem;
  width: 100%;

  /* Tablet and up */
  @media (--bp-min-medium) {
    padding: 2rem;
    width: 80%;
  }

  /* Desktop and up */
  @media (--bp-min-large) {
    padding: 3rem;
    width: 60%;
  }
}
```

### 4. Scoped Styles
CSS Modules automatically scope styles to the component. No need for unique class names across components.

```css
/* card.module.css */
.title { color: blue; }

/* banner.module.css */
.title { color: red; }

/* ✅ No conflict! Each .title is scoped to its component */
```

## TypeScript Support

TypeScript support for CSS Modules is already configured ✅

**Configuration**:
- `tsconfig.json`: Includes `src/css-modules.d.ts`
- `typescript-plugin-css-modules`: Provides IntelliSense

**Usage**:
```tsx
import styles from './component.module.css';

// ✅ TypeScript autocomplete for class names
<div className={styles.container}>
  <h1 className={styles.title}>
```

## Testing

Tests remain identical! CSS Modules classes are automatically applied during rendering.

```tsx
// Tests work the same way
import { render, screen } from '@testing-library/react';
import { MyComponent } from './myComponent.component';

it('should render', () => {
  render(<MyComponent />);
  expect(screen.getByTestId('myComponentRoot')).toBeInTheDocument();
});
```

## Resources

- **Example**: `src/design-system/example/` - Complete CSS Modules example
- **Documentation**:
  - [CSS Modules](https://github.com/css-modules/css-modules)
  - [Vite CSS Modules](https://vitejs.dev/guide/features.html#css-modules)
- **Libraries**:
  - [classnames](https://github.com/JedWatson/classnames)
- **Custom media queries**: `docs/CUSTOM_MEDIA_QUERIES.md`

## When to Use This Skill

**Use this skill when**:
- Migrating a component from Styled Components to CSS Modules
- Converting `.styled.ts` files to `.module.css`
- Removing styled-components dependency
- Fixing font-properties violations
- Implementing CSS nesting for existing flat CSS
- Converting conditional props to classNames()

**Do NOT use this skill when**:
- Creating new components (use component-creation skill instead)
- Debugging CSS issues (use standard debugging)
- General styling questions
- Non-migration CSS work
- Already using CSS Modules (no migration needed)

## Migration Priority Order

1. **New components**: Use CSS Modules from the start (component-creation skill)
2. **Simple components**: Buttons, badges, cards
3. **Utility components**: Loaders, icons, displayers
4. **Layout components**: Banners, descriptions, galleries
5. **Complex components**: Forms, modals, carousels
6. **Navigation**: Navbars, footers (migrate last due to complexity)
