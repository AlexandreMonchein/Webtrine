# Guide de Création de Composants - Design System Webtrine

Ce guide détaille comment créer un nouveau composant dans le Design System Webtrine en suivant les meilleures pratiques et les conventions du projet.

## 📋 Table des matières

1. [Structure de fichiers](#structure-de-fichiers)
2. [Création pas à pas](#création-pas-à-pas)
3. [Fichiers requis](#fichiers-requis)
4. [Best Practices](#best-practices)
5. [Checklist](#checklist)

## Structure de fichiers

Un composant complet dans le Design System suit cette structure :

```
src/design-system/components/myComponent/
├── myComponent.component.tsx      # Composant React principal
├── myComponent.module.css         # Styles CSS Modules
├── myComponent.types.ts           # Types TypeScript
├── myComponent.stories.tsx        # Stories Storybook
├── myComponent.docs.mdx           # Documentation (optionnel)
├── __tests__/                     # Tests
│   └── myComponent.component.int.tsx
├── customer/                      # Configurations par client (optionnel)
│   └── default/
└── shared/                        # Constantes partagées (optionnel)
    └── myComponent.constants.ts
```

### Exemple de référence

Le dossier `src/design-system/example/` contient un composant complet qui démontre toutes les bonnes pratiques.

## Création pas à pas

### 1. Créer le dossier du composant

Choisir l'emplacement approprié selon le type de composant :

- **`components/`** : Composants réutilisables généraux (cards, buttons, forms, etc.)
- **`navbars/`** : Barres de navigation
- **`footers/`** : Pieds de page
- **`buttons/`** : Composants boutons
- **`error/`** : Pages d'erreur
- **`utils/`** : Composants utilitaires

```bash
mkdir -p src/design-system/components/myComponent
cd src/design-system/components/myComponent
```

### 2. Créer le fichier de types

**`myComponent.types.ts`** :

```typescript
import { type PropsWithChildren } from "react";

export type MyComponentVariant = "default" | "primary" | "secondary";

export type MyComponentProps = PropsWithChildren<{
  /** Optional title for the component */
  title?: string;
  /** Optional description text */
  description?: string;
  /** Visual variant of the component */
  variant?: MyComponentVariant;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Test ID for testing */
  "data-testid"?: string;
}>;
```

**Points clés** :
- ✅ Utiliser `PropsWithChildren<>` si le composant accepte des children
- ✅ Exporter les types de variants séparément
- ✅ Documenter chaque prop avec JSDoc
- ✅ Inclure `data-testid` pour les tests
- ✅ Définir des valeurs par défaut dans les types si nécessaire

### 3. Créer le composant React

**`myComponent.component.tsx`** :

```tsx
import classNames from "classnames";

import styles from "./myComponent.module.css";
import type { MyComponentProps } from "./myComponent.types";

/**
 * MyComponent - Description du composant
 *
 * Ce composant permet de [décrire la fonctionnalité principale].
 *
 * @example
 * ```tsx
 * <MyComponent title="Hello" variant="primary">
 *   Content here
 * </MyComponent>
 * ```
 */
export const MyComponent = ({
  children,
  title,
  description,
  variant = "default",
  disabled = false,
  "data-testid": dataTestid,
}: MyComponentProps) => {
  return (
    <div
      className={classNames(styles.myComponentRoot, {
        [styles.myComponentRootPrimary]: variant === "primary",
        [styles.myComponentRootSecondary]: variant === "secondary",
        [styles.myComponentRootDisabled]: disabled,
      })}
      data-testid={dataTestid}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  );
};
```

**Points clés** :
- ✅ Utiliser **CSS Modules** (pas de Styled Components)
- ✅ Utiliser `classNames` pour les classes conditionnelles
- ✅ Documenter le composant avec JSDoc
- ✅ Destructurer les props avec valeurs par défaut
- ✅ Nommer la classe racine `{componentName}Root` (ex: `myComponentRoot`)
- ✅ **Aucun type `any` autorisé** - Toujours typer correctement

### 4. Créer les styles CSS Modules

**`myComponent.module.css`** :

```css
/* MyComponent Styles */

/* Base container */
.myComponentRoot {
  padding: 1rem;
  background-color: var(--theme-color-background-1);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Title element */
.title {
  color: var(--theme-color-primary);
  font-size: var(--subtitle-font-size);
  margin-bottom: 1rem;
  font-weight: bold;
}

/* Description text */
.description {
  color: var(--theme-color-secondary);
  font-size: var(--description-font-size);
  line-height: 1.6;
}

/* Variant modifiers */
.myComponentRootPrimary {
  background-color: var(--theme-color-primary);
  color: var(--theme-color-background-1);
}

.myComponentRootSecondary {
  background-color: var(--theme-color-secondary);
}

/* State modifiers */
.myComponentRootDisabled {
  opacity: 0.5;
  pointer-events: none;
}

/* Responsive design with custom media queries */
@media (--bp-min-medium) {
  .myComponentRoot {
    padding: 2rem;
  }

  .title {
    font-size: calc(var(--subtitle-font-size) * 1.2);
  }
}

@media (--bp-min-large) {
  .myComponentRoot {
    padding: 3rem;
  }
}

/* Hover states */
.myComponentRoot:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
```

**Points clés** :
- ✅ Utiliser les **variables CSS du theme** (`--theme-color-*`, `--*-font-size`)
- ✅ Utiliser les **custom media queries** (`--bp-min-medium`, `--bp-min-large`)
- ✅ Nommage BEM-like : `{componentName}Root`, `{componentName}RootPrimary`, `{componentName}RootDisabled`
- ✅ Commenter les sections du fichier
- ✅ Grouper les styles par catégorie (base, variants, states, responsive)

### Variables CSS disponibles

Voir la liste complète dans `src/design-system/tokens/tokens.stories.tsx` :

**Couleurs** :
- Brand : `--theme-color-primary`, `--theme-color-secondary`, `--theme-color-tertiary`, `--theme-color-quaternary`, `--theme-color-quinary`
- Utility : `--theme-color-utility-1` (red), `--theme-color-utility-2` (green), `--theme-color-utility-3` (orange), `--theme-color-utility-4` (blue)
- Extended : `--theme-color-hover`, `--theme-color-background-1`, `--theme-color-background-2`

**Typographie** :
- `--navbar-font-size`, `--subtitle-font-size`, `--text-font-size`, `--description-font-size`

**Z-index** :
- `--z-index-navbars`, etc.

### Breakpoints disponibles

Définis dans `src/custom-media.css` :
- `--bp-min-medium` (768px+) - Tablette
- `--bp-min-large` (1024px+) - Desktop
- `--bp-min-xlarge` (1440px+) - Large Desktop

Documentation complète : `docs/CUSTOM_MEDIA_QUERIES.md`

### 5. Créer les Stories Storybook

**`myComponent.stories.tsx`** :

```tsx
import type { Meta, StoryObj } from "@storybook/react";

import { MyComponent } from "./myComponent.component";

const meta: Meta<typeof MyComponent> = {
  title: "Components/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof MyComponent>;

// Story par défaut
export const Default: Story = {
  args: {
    title: "Default Component",
    description: "This is a default variant",
    children: "Component content here",
  },
};

// Story Primary
export const Primary: Story = {
  args: {
    title: "Primary Component",
    description: "This is a primary variant",
    variant: "primary",
    children: "Primary content",
  },
};

// Story Secondary
export const Secondary: Story = {
  args: {
    title: "Secondary Component",
    description: "This is a secondary variant",
    variant: "secondary",
    children: "Secondary content",
  },
};

// Story Disabled
export const Disabled: Story = {
  args: {
    title: "Disabled Component",
    description: "This component is disabled",
    disabled: true,
    children: "Disabled content",
  },
};

// Playground interactif
export const Playground: Story = {
  args: {
    title: "Interactive Component",
    description: "Play with the controls below",
    children: "Playground content",
  },
};
```

**Points clés** :
- ✅ Organiser dans la hiérarchie Storybook (`Components/MyComponent`)
- ✅ Ajouter `tags: ["autodocs"]` pour la documentation automatique
- ✅ Définir les `argTypes` pour les contrôles interactifs
- ✅ Créer plusieurs stories pour chaque variant/état
- ✅ Inclure une story `Playground` pour les tests interactifs

### 6. Créer les tests

**`__tests__/myComponent.component.int.tsx`** :

```tsx
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { MyComponent } from "../myComponent.component";
import type { MyComponentProps } from "../myComponent.types";

describe("<MyComponent />", () => {
  let props: MyComponentProps;

  beforeEach(() => {
    props = {
      "data-testid": "my-component",
      title: "Test Title",
      description: "Test Description",
    };
  });

  it("should render the component", () => {
    render(<MyComponent {...props} />);
    expect(screen.getByTestId("my-component")).toBeInTheDocument();
  });

  it("should render title when provided", () => {
    render(<MyComponent {...props} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should render description when provided", () => {
    render(<MyComponent {...props} />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("should render children", () => {
    render(<MyComponent {...props}>Child content</MyComponent>);
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("should apply primary variant class", () => {
    render(<MyComponent {...props} variant="primary" />);
    const element = screen.getByTestId("my-component");
    expect(element).toHaveClass(/myComponentRootPrimary/);
  });

  it("should apply disabled class when disabled", () => {
    render(<MyComponent {...props} disabled />);
    const element = screen.getByTestId("my-component");
    expect(element).toHaveClass(/myComponentRootDisabled/);
  });
});
```

**Points clés** :
- ✅ Utiliser `describe` et `it` de Vitest
- ✅ Utiliser `beforeEach` pour initialiser les props
- ✅ Tester le rendu de base
- ✅ Tester les props conditionnelles
- ✅ Tester les variants et états
- ✅ Utiliser `data-testid` pour cibler les éléments

### 7. Documentation additionnelle (optionnel)

**`myComponent.docs.mdx`** :

````mdx
import { Meta, ArgTypes } from '@storybook/addon-docs/blocks';
import * as MyComponentStories from './myComponent.stories';
import { MyComponent } from './myComponent.component';

<Meta of={MyComponentStories} />

# MyComponent

Description détaillée du composant et de ses cas d'usage.

## Usage

```jsx
<MyComponent
  title="Example Title"
  description="Example description"
  variant="primary"
>
  Content here
</MyComponent>
```

## When to use

- Utiliser ce composant quand...
- Ne pas utiliser quand...

## Props

<ArgTypes of={MyComponent} />

## Examples

### Avec variant primary

```jsx
<MyComponent variant="primary">
  Primary content
</MyComponent>
```

### Désactivé

```jsx
<MyComponent disabled>
  Disabled content
</MyComponent>
```
````

## Best Practices

### Nommage

- **Fichiers** : camelCase avec suffixes
  - `.component.tsx` pour les composants
  - `.module.css` pour les styles
  - `.types.ts` pour les types
  - `.stories.tsx` pour Storybook
  - `.int.tsx` pour les tests d'intégration

- **Classes CSS** : camelCase, descriptif
  - `{componentName}Root`, `title`, `description`
  - Modificateurs : `{componentName}RootPrimary`, `{componentName}RootDisabled`

- **Props** : camelCase, préfixer les booleans avec `is`, `has`, `should`
  - ✅ `isDisabled`, `hasError`, `shouldRender`
  - ❌ `disabled`, `error`, `render`

### TypeScript

- **AUCUN type `any` autorisé** - Utiliser des types spécifiques ou `unknown` si nécessaire
- Toujours typer les props avec une interface/type exporté
- Utiliser `PropsWithChildren` pour les composants avec children
- Documenter avec JSDoc
- Exporter les types de variants séparément
- Typer les retours de fonctions explicitement
- Typer tous les paramètres de fonctions
- Utiliser des génériques pour la réutilisabilité

### CSS Modules

- Utiliser les variables CSS du theme
- Utiliser les custom media queries
- Éviter les valeurs en dur (couleurs, tailles)
- **Ne pas écraser les styles globaux** (font-style, font-weight, etc.) - Le style global est défini dans `src/theme/customer/default/globalStyle.css`
- Organiser par sections : base, variants, states, responsive
- Commenter les sections

### Accessibilité

- Ajouter des attributs ARIA appropriés
- Utiliser des éléments sémantiques HTML
- Gérer le focus keyboard
- Tester avec screen readers

### Performance

- Mémoriser les valeurs calculées avec `useMemo`
- Mémoriser les callbacks avec `useCallback`
- Lazy load les composants lourds
- Optimiser les images

## Checklist de création

### Fichiers requis ✅

- [ ] `myComponent.component.tsx` - Composant React
- [ ] `myComponent.module.css` - Styles CSS Modules
- [ ] `myComponent.types.ts` - Types TypeScript
- [ ] `myComponent.stories.tsx` - Stories Storybook
- [ ] `__tests__/myComponent.component.int.tsx` - Tests

### Fichiers optionnels

- [ ] `myComponent.docs.mdx` - Documentation détaillée
- [ ] `customer/default/` - Configuration par client
- [ ] `shared/myComponent.constants.ts` - Constantes

### Code Quality ✅

- [ ] Pas de `any` dans le code TypeScript
- [ ] Props typées et documentées
- [ ] Utilisation de CSS Modules (pas de Styled Components)
- [ ] Variables CSS du theme utilisées
- [ ] Custom media queries pour le responsive
- [ ] Classes CSS nommées de manière cohérente

### Tests ✅

- [ ] Tests d'intégration écrits
- [ ] Couverture des variants principaux
- [ ] Tests des états (disabled, loading, etc.)
- [ ] Tests de rendu conditionnel

### Documentation ✅

- [ ] JSDoc sur le composant principal
- [ ] Props documentées dans les types
- [ ] Stories Storybook créées (Default, variants, Playground)
- [ ] Tag `autodocs` ajouté
- [ ] ArgTypes configurés pour les contrôles

### Vérification finale ✅

- [ ] Le composant s'affiche correctement dans Storybook
- [ ] Les tests passent (`pnpm test`)
- [ ] Pas d'erreurs ESLint (`pnpm lint`)
- [ ] Le composant est responsive (tester sur mobile, tablette, desktop)
- [ ] Accessible (clavier, screen readers)
- [ ] Performance optimale (pas de re-renders inutiles)

## Ressources

- **Exemple de référence** : `src/design-system/example/`
- **Tokens & Variables** : Storybook → `Design System/Tokens`
- **Custom Media Queries** : `docs/CUSTOM_MEDIA_QUERIES.md`
- **Migration CSS Modules** : `docs/CSS_MODULES_MIGRATION.md`
- **Hooks réutilisables** : `src/design-system/utils/useLoadComponents.hook.tsx`

## Commandes utiles

```bash
# Lancer Storybook
pnpm storybook

# Lancer les tests en watch mode
pnpm test

# Lancer les tests pour un fichier spécifique
pnpm test myComponent

# Linter le code
pnpm lint

# Vérifier les types TypeScript
pnpm type-check
```

## Workflow recommandé

1. **Planifier** : Définir les props, variants, états nécessaires
2. **Créer les types** : Commencer par `myComponent.types.ts`
3. **Créer le composant** : Structure de base dans `.component.tsx`
4. **Créer les styles** : CSS Modules avec variables theme
5. **Créer les stories** : Tester visuellement dans Storybook
6. **Itérer** : Ajuster design et fonctionnalités
7. **Écrire les tests** : Assurer la qualité et la non-régression
8. **Documenter** : JSDoc et optionnellement `.docs.mdx`
9. **Review** : Vérifier la checklist complète
10. **Commit** : Suivre les conventions de commit du projet

---

**Bonne création de composants ! 🎨✨**
