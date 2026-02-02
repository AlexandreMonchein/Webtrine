# CSS Modules - Quick Start Guide

Guide rapide pour créer des composants avec CSS Modules dans le projet Webtrine.

## 🚀 Création Automatique d'un Composant

```bash
# Utiliser le script de création
./scripts/create-component.sh MyComponent

# Avec un chemin personnalisé
./scripts/create-component.sh MyButton src/design-system/buttons
```

Cela génère automatiquement :
- ✅ `myComponent.component.tsx` - Composant React
- ✅ `myComponent.module.css` - Styles CSS Modules
- ✅ `myComponent.types.ts` - Types TypeScript
- ✅ `myComponent.stories.tsx` - Stories Storybook
- ✅ `__tests__/myComponent.component.spec.tsx` - Tests

## 📝 Pattern de Base

### 1. Fichier CSS Module (`component.module.css`)

```css
/* Component styles */
.root {
  padding: 1rem;
  background: var(--white);
}

.title {
  color: var(--dark-blue);
  font-size: var(--subtitle-font-size);
}

/* Variants */
.rootPrimary {
  background: var(--blue);
}

/* States */
.rootDisabled {
  opacity: 0.5;
  pointer-events: none;
}

/* Responsive */
@media (min-width: 768px) {
  .root {
    padding: 2rem;
  }
}
```

### 2. Composant React (`component.component.tsx`)

```tsx
import classNames from "classnames";
import styles from "./component.module.css";
import type { ComponentProps } from "./component.types";

export const Component = ({
  variant = "default",
  disabled = false,
  children,
}: ComponentProps) => {
  return (
    <div
      className={classNames(styles.root, {
        [styles.rootPrimary]: variant === "primary",
        [styles.rootDisabled]: disabled,
      })}
    >
      <h2 className={styles.title}>Title</h2>
      {children}
    </div>
  );
};
```

### 3. Types TypeScript (`component.types.ts`)

```tsx
import { type PropsWithChildren } from "react";

export type ComponentVariant = "default" | "primary" | "secondary";

export type ComponentProps = PropsWithChildren<{
  variant?: ComponentVariant;
  disabled?: boolean;
  className?: string;
  "data-testid"?: string;
}>;
```

## 🎨 Variables CSS Disponibles

Utilisables via `var(--nom-variable)` :

### Couleurs
- `--white`, `--black`
- `--blue`, `--dark-blue`
- `--gold`, `--light-grey`

### Tailles de Police
- `--navbar-font-size`
- `--subtitle-font-size`
- `--text-font-size`
- `--description-font-size`

### Z-Index
- `--z-index-navbars`
- `--z-index-text`
- `--z-index-backgrounds`

Variables complètes dans `config/customer/{CUSTOMER}/style.config.json`

## 📱 Breakpoints Standards

**Nous utilisons des custom media queries pour une meilleure maintenabilité :**

```css
/* Mobile first approach */
.container {
  width: 100%;
}

/* Tablet (768px+) */
@media (--bp-min-medium) {
  .container {
    width: 50%;
  }
}

/* Desktop (1024px+) */
@media (--bp-min-large) {
  .container {
    width: 33.33%;
  }
}

/* Large Desktop (1440px+) */
@media (--bp-min-xlarge) {
  .container {
    max-width: 1200px;
  }
}
```

**Breakpoints disponibles :**
- `--bp-min-small` (600px+)
- `--bp-min-medium` (768px+) - Tablette
- `--bp-min-large` (1024px+) - Desktop
- `--bp-min-xlarge` (1440px+) - Large Desktop
- `--bp-min-wide` (1920px+) - Ultra Wide

**📖 Documentation complète** : `docs/CUSTOM_MEDIA_QUERIES.md`

## 🎯 Classes Conditionnelles avec classNames

```tsx
import classNames from "classnames";
import styles from "./component.module.css";

// Simple
<div className={styles.button} />

// Avec classe supplémentaire
<div className={classNames(styles.button, "global-class")} />

// Avec conditions
<div className={classNames(styles.button, {
  [styles.buttonActive]: isActive,
  [styles.buttonDisabled]: disabled,
})} />

// Combinaison
<div className={classNames(
  styles.button,
  props.className, // Permet d'ajouter des classes externes
  {
    [styles.buttonPrimary]: variant === "primary",
    [styles.buttonLarge]: size === "large",
  }
)} />
```

## 🧪 Tests

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Component } from "../component.component";

describe("<Component />", () => {
  it("should render with correct styles", () => {
    render(<Component variant="primary">Content</Component>);
    const element = screen.getByText("Content");
    expect(element).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(
      <Component className="custom" data-testid="comp">
        Content
      </Component>
    );
    expect(screen.getByTestId("comp")).toHaveClass("custom");
  });
});
```

## 📚 Storybook

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Component } from "./component.component";

const meta: Meta<typeof Component> = {
  title: "Components/Component",
  component: Component,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    children: "Default Component",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Component",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Component",
  },
};
```

## 🔄 Migration depuis Styled Components

### Avant (Styled Components)

```tsx
// component.styled.ts
import styled from 'styled-components';

export const Container = styled.div<{ $active?: boolean }>`
  padding: 1rem;
  background: ${props => props.$active ? 'blue' : 'white'};
`;

// component.component.tsx
import { Container } from './component.styled';
<Container $active={isActive}>Content</Container>
```

### Après (CSS Modules)

```css
/* component.module.css */
.container {
  padding: 1rem;
  background: white;
}

.containerActive {
  background: blue;
}
```

```tsx
// component.component.tsx
import classNames from 'classnames';
import styles from './component.module.css';

<div className={classNames(styles.container, {
  [styles.containerActive]: isActive
})}>
  Content
</div>
```

## ✅ Checklist Nouveau Composant

- [ ] Créer fichier `.module.css` avec styles
- [ ] Créer composant `.component.tsx`
- [ ] Définir types dans `.types.ts`
- [ ] Utiliser `classnames` pour les conditionnels
- [ ] Utiliser les variables CSS du client
- [ ] Ajouter les breakpoints responsive
- [ ] Créer les stories Storybook
- [ ] Écrire les tests unitaires
- [ ] Tester dans le navigateur
- [ ] Vérifier l'accessibilité (ARIA)

## 🆘 Support

- Documentation complète : `docs/CSS_MODULES_MIGRATION.md`
- Composant exemple : `src/design-system/example/`
- Questions : Consulter le fichier AGENTS.md

## 🔗 Ressources

- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [classnames Library](https://github.com/JedWatson/classnames)
- [Vite CSS Modules](https://vitejs.dev/guide/features.html#css-modules)
