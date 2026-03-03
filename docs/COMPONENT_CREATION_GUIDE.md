# Guide de Création de Composants - Design System Webtrine

Ce guide détaille comment créer un nouveau composant dans le Design System Webtrine en suivant les meilleures pratiques et les conventions du projet.

## ⚡ Quick Rules for AI

### MUST (Règles absolues)
- ✅ **TOUJOURS demander** NOM + TYPE + DESCRIPTION avant de créer
- ✅ **Architecture TYPE-first** : fichiers dans `src/design-system/{TYPE}/nom.*`
- ✅ **6 fichiers requis** : `.component.tsx`, `.module.css`, `.types.ts`, `.stories.tsx`, `.docs.md`, `__tests__/*.int.tsx`
- ✅ **CSS** : `@import url('../../../custom-media.css');` en première ligne
- ✅ **Mobile-first** : Media queries avec `--bp-min-*` imbriquées dans sélecteurs
- ✅ **data-testid hardcodé** : `data-testid="{nom}Root"` (jamais en prop)
- ✅ **defaultArgs pattern** : Créer `const defaultArgs` et spread `...defaultArgs` dans stories
- ✅ **Default export** : `export default MyComponent` pour chargement dynamique

### MUST NOT (Interdictions)
- ❌ **JAMAIS créer sans** NOM + TYPE + DESCRIPTION
- ❌ **JAMAIS** de dossier par composant (pas de `components/team/`)
- ❌ **JAMAIS** de type `any` en TypeScript
- ❌ **JAMAIS** de JSDoc au-dessus des composants React
- ❌ **JAMAIS** de props `data-testid` dans les types
- ❌ **JAMAIS** de font-properties dans CSS (`font-size`, `font-weight`, `font-family`, `font-style`)
- ❌ **JAMAIS** de template strings pour classes CSS (utiliser `classNames()`)
- ❌ **JAMAIS** doc implementation dans `.stories.tsx` (utiliser `.docs.md`)
- ❌ **JAMAIS** media queries séparées (toujours imbriquées)
- ❌ **JAMAIS oublier** la story Overview (OBLIGATOIRE pour visual testing)
- ❌ **JAMAIS** de descriptions de types/classes CSS dans `.docs.md` (config JSON uniquement)
- ❌ **JAMAIS** de stories en anglais (toujours en français)

### ARCHITECTURE
- Pattern : `src/design-system/{TYPE}/{nom}.component.tsx`
- Types disponibles : `banner/`, `cards/`, `description/`, `footer/`, `navbar/`, etc.
- Storybook title : `"Design System/Components/{TYPE}/{NOM}"`

### CSS-CRITICAL
- Import obligatoire : `@import url('../../../custom-media.css');`
- Breakpoints : `--bp-min-medium` (768px), `--bp-min-large` (1024px), `--bp-min-xlarge` (1440px), `--bp-min-wide` (1920px)
- Nesting : Media queries DANS sélecteurs (pas séparées)
- Variables : Toujours `var(--theme-color-*)`, jamais de valeurs en dur

### STORIES
- Pattern : `const defaultArgs = {...}` puis `...defaultArgs` dans stories
- **Overview story** : TOUJOURS créer une story Overview qui affiche tous les cas d'usage possibles du composant (pour Chromatic visual testing)
- **UNIQUEMENT Overview** : Si tous les cas d'usage sont dans Overview, les autres stories individuelles (Primary, Secondary, etc.) sont inutiles
- **Titres dans Overview** : Chaque cas d'usage doit avoir un `<h3>` descriptif
- **Assets** : TOUJOURS utiliser `/assets/showcase/` dans les stories (pas d'assets clients spécifiques)
- **Langue** : TOUJOURS en français (titres, descriptions, contenu des stories)
- Pas de story Default ni Playground séparées (tout est dans Overview)

### TESTING
- Framework : Vitest + Testing Library
- Target : `screen.getByTestId("{nom}Root")`
- Structure : `describe` → `beforeEach` → `it`

### DECISION TREE
```
START
  ├─ Ai-je NOM + TYPE + DESCRIPTION ?
  │  ├─ NON → STOP et DEMANDER maintenant
  │  └─ OUI → Continue
  │
  ├─ Identifier dossier TYPE dans src/design-system/
  │  └─ Exemples : banner/, description/, cards/, footer/, navbar/
  │
  ├─ Créer 6 fichiers dans {TYPE}/
  │  ├─ {nom}.component.tsx (React + hardcoded data-testid)
  │  ├─ {nom}.module.css (@import custom-media + mobile-first)
  │  ├─ {nom}.types.ts (interfaces + JSDoc si utile)
  │  ├─ {nom}.stories.tsx (defaultArgs + spread)
  │  ├─ {nom}.docs.md (full JSON implementation)
  │  └─ __tests__/{nom}.component.int.tsx (Vitest)
  │
  └─ Vérifier checklist finale
```

---

## 📋 Table des matières

1. [⚠️ Informations requises AVANT de commencer](#%EF%B8%8F-informations-requises-avant-de-commencer)
2. [Structure de fichiers](#structure-de-fichiers)
3. [Création pas à pas](#création-pas-à-pas)
4. [Fichiers requis](#fichiers-requis)
5. [Best Practices](#best-practices)
6. [Checklist](#checklist)

## ⚠️ Informations requises AVANT de commencer

### 🚨 RÈGLE OBLIGATOIRE

**AVANT de créer un composant, vous DEVEZ fournir les 3 informations suivantes** :

1. **NOM du composant** : Le nom unique du composant (ex: `team`, `contactBanner`, `heroSection`)
2. **TYPE du composant** : La catégorie fonctionnelle (ex: `description`, `banner`, `footer`, `cards`)
3. **DESCRIPTION du composant** : Une description claire de ce que fait le composant et de ses fonctionnalités principales

### ⛔ Si ces informations manquent

**Si l'une de ces 3 informations manque, vous devez les DEMANDER AVANT de commencer à créer quoi que ce soit.**

Ne commencez JAMAIS à créer un composant sans avoir :
- ✅ Le nom du composant
- ✅ Le type du composant
- ✅ Une description détaillée des fonctionnalités

### 📝 Format de demande recommandé

Lorsque vous demandez de créer un composant, utilisez ce format :

```
Créer un composant [NOM] de type [TYPE]

Description :
- [Liste des fonctionnalités]
- [Structure attendue]
- [Props spécifiques]
```

**Exemples** :

```
Créer un composant "team" de type "description"

Description :
- Afficher une grille de membres d'équipe
- Chaque membre a : photo ronde, nom, poste (optionnel)
- Inclure un pré-titre, titre et description (tous optionnels)
- Responsive : 1→2→3→4 colonnes selon la taille d'écran
```

```
Créer un composant "contactBanner" de type "banner"

Description :
- Bannière d'appel à l'action pour la page contact
- Inclure : titre, description, bouton CTA, image de fond
- Overlay semi-transparent sur l'image
- Centré verticalement et horizontalement
```

---

## [ARCHITECTURE] Structure de fichiers

### 🏗️ Architecture : Type + Nom

**IMPORTANT** : L'architecture du projet organise les composants par **TYPE** (dossier) et non par nom de composant.

- Le **TYPE** définit le **dossier** dans lequel créer le composant (banner, description, footer, navbar, cards, etc.)
- Le **NOM** définit le **nom du fichier** du composant

**Exemple** : "Créer un composant **team** de type **description**"
```
✅ CORRECT:
src/design-system/components/description/
├── team.component.tsx
├── team.module.css
├── team.types.ts
├── team.stories.tsx
├── team.docs.md
└── __tests__/
    └── team.component.int.tsx

❌ INCORRECT:
src/design-system/components/team/  ← Pas de dossier par composant !
```

**Autre exemple** : "Créer un composant **contactBanner** de type **banner**"
```
✅ CORRECT:
src/design-system/components/banner/
├── contactBanner.component.tsx
├── contactBanner.module.css
├── contactBanner.types.ts
└── ...

❌ INCORRECT:
src/design-system/components/contactBanner/  ← Pas de dossier par composant !
```

### Structure standard d'un composant

Les fichiers d'un composant suivent ce pattern (exemple avec `myComponent`) :

```
src/design-system/components/{TYPE}/
├── myComponent.component.tsx      # Composant React principal
├── myComponent.module.css         # Styles CSS Modules
├── myComponent.types.ts           # Types TypeScript
├── myComponent.stories.tsx        # Stories Storybook
├── myComponent.docs.md            # Documentation (optionnel)
└── __tests__/                     # Tests (dossier partagé par type)
    └── myComponent.component.int.tsx
```

### Exemples de référence

- `src/design-system/example/` : Composant complet démontrant toutes les bonnes pratiques
- `src/design-system/components/description/team.*` : Composant team dans le dossier description
- `src/design-system/components/description/description.*` : Composant description dans son propre dossier type

## Création pas à pas

> **⚠️ RAPPEL** : Avant de commencer, assurez-vous d'avoir les 3 informations requises :
> 1. **NOM** du composant
> 2. **TYPE** du composant
> 3. **DESCRIPTION** détaillée des fonctionnalités
>
> Si l'une manque, demandez-la AVANT de continuer.

### [ARCHITECTURE] 1. Identifier le TYPE de composant

**ÉTAPE CRITIQUE** : Avant de créer un composant, identifiez son TYPE pour choisir le bon dossier.

#### Types de composants disponibles

Les types sont définis par les dossiers existants dans `src/design-system/` :

- **`components/banner/`** : Bannières principales (hero, contact, etc.)
- **`components/cards/`** : Listes de cartes et grilles
- **`components/description/`** : Sections de description et présentation
- **`components/contact/`** : Formulaires et sections de contact
- **`components/gallery/`** : Galeries d'images
- **`components/legals/`** : Pages légales (mentions, CGV, etc.)
- **`components/list/`** : Listes numérotées ou à puces
- **`components/prices/`** : Tarifications et pricing tables
- **`navbars/`** : Barres de navigation
- **`footers/`** : Pieds de page
- **`buttons/`** : Composants boutons
- **`error/`** : Pages d'erreur (404, 500, etc.)
- **`utils/`** : Composants utilitaires (displayers, etc.)

#### Comment choisir le type ?

Posez-vous la question : **"À quelle catégorie fonctionnelle appartient mon composant ?"**

**Exemples** :
- "Composant pour présenter l'équipe" → Type **`description`** (présentation)
- "Bannière de contact avec CTA" → Type **`banner`** (bannière)
- "Liste de services avec icônes" → Type **`cards`** (cartes)
- "Footer avec logos partenaires" → Type **`footers`** (pied de page)

#### Créer les fichiers dans le bon dossier

Une fois le type identifié, créez les fichiers directement dans le dossier du type :

```bash
# Exemple : Créer un composant "team" de type "description"
cd src/design-system/components/description/

# Les fichiers seront créés ici :
# - team.component.tsx
# - team.module.css
# - team.types.ts
# - team.stories.tsx
# - team.docs.md (optionnel)
```

**Note** : Le dossier `__tests__/` est partagé par tous les composants du même type.

### 2. Créer le fichier de types

**`myComponent.types.ts`** :

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

**Points clés** :
- ✅ Utiliser `PropsWithChildren<>` si le composant accepte des children
- ✅ Exporter les types de variants séparément
- ✅ **Documenter UNIQUEMENT les props qui nécessitent des explications** (détails d'implémentation, comportements non-évidents)
- ❌ **NE PAS documenter les props évidentes** (title, description, name, etc.)
- ✅ Documenter si la prop a un comportement spécial (transformation automatique, side-effects, etc.)
- ✅ Définir des valeurs par défaut dans les types si nécessaire
- ❌ **NE PAS inclure `data-testid` dans les props** - Sera hardcodé dans le composant

**⚠️ COMMENTAIRES : Par défaut, NE PAS en ajouter !**

Les noms de propriétés et types doivent être self-explanatory. Ajouter un commentaire UNIQUEMENT s'il apporte une information non-évidente.

**Exemples de commentaires utiles** :
```typescript
// ✅ BON - Information non-évidente
/** Image filename without extension (.webp added automatically) */
image: string;

/** Interval in milliseconds (default: 3000) */
interval?: number;

/** Callback fired on close - Cleans up external state */
onClose?: () => void;

// ❌ MAUVAIS - Information évidente (redondant)
/** Name of the user */
name: string;

/** Optional description text */
description?: string;

/** Array of banner images */
images: BannerImage[];

/** Main title (h1) */
title?: string;

// ✅ BON - Pas de commentaire, tout est clair
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}
description?: string;

/** Whether the component is disabled */
disabled?: boolean;
```

### 3. Créer le composant React

**`myComponent.component.tsx`** :

```tsx
import classNames from "classnames";

import styles from "./myComponent.module.css";
import type { MyComponentProps } from "./myComponent.types";

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

**Points clés** :
- ✅ Utiliser **CSS Modules** (pas de Styled Components)
- ✅ Utiliser `classNames` pour les classes conditionnelles multiples
- ✅ **NE PAS ajouter de commentaires JSDoc** au-dessus du composant (documentation dans stories et .docs.md)
- ✅ Destructurer les props avec valeurs par défaut
- ✅ Nommer la classe racine `{componentName}Root` (ex: `myComponentRoot`)
- ✅ **Hardcoder `data-testid="{componentName}Root"`** directement dans l'élément racine
- ✅ **Aucun type `any` autorisé** - Toujours typer correctement
- ✅ Exporter le composant en **default export** pour le chargement dynamique via config.json

**Usage de `classNames` pour classes multiples** :
```tsx
// ✅ BON - Utiliser classNames
className={classNames(styles.textBlock, styles.textBlockTop)}

// ✅ BON - Avec conditions
className={classNames(styles.button, {
  [styles.buttonPrimary]: isPrimary,
  [styles.buttonDisabled]: disabled,
})}

// ❌ MAUVAIS - Template strings
className={`${styles.textBlock} ${styles.textBlockTop}`}
```

### [CSS-CRITICAL] 4. Créer les styles CSS Modules

**`myComponent.module.css`** :

```css
/* OBLIGATOIRE : Import en première ligne */
@import url('../../../custom-media.css');

/* Base styles - Mobile par défaut */
.myComponentRoot {
  padding: 1rem;
  background-color: var(--theme-color-background-1);
  border-radius: 8px;

  /* Media queries IMBRIQUÉES */
  @media (--bp-min-medium) { padding: 2rem; }
  @media (--bp-min-large) { padding: 3rem; }
  @media (--bp-min-xlarge) { max-width: 1200px; margin: 0 auto; }
}

.title {
  color: var(--theme-color-primary);
  margin-bottom: 1rem;
  /* ❌ PAS de font-size, font-weight, font-family, font-style */
}

.description {
  color: var(--theme-color-secondary);
  line-height: 1.6; /* ✅ line-height autorisé */
}

/* Variants */
.myComponentRootPrimary { background-color: var(--theme-color-primary); }
.myComponentRootDisabled { opacity: 0.5; pointer-events: none; }
```

**Points clés** :
- ✅ **@import OBLIGATOIRE** en ligne 1 : `@import url('../../../custom-media.css');`
- ✅ **Mobile First** : Styles mobile par défaut + `--bp-min-*`
- ✅ **Nesting** : Media queries DANS sélecteurs
- ✅ **Variables** : `var(--theme-color-*)`, jamais de valeurs en dur
- ✅ **Nommage** : `{nom}Root`, `{nom}RootVariant`
- ❌ **Font-properties interdites** : Voir section Best Practices

**Exemple rapide** :
```css
/* ✅ BON */
.myRoot {
  padding: 1rem;
  @media (--bp-min-medium) { padding: 2rem; }
}

/* ❌ MAUVAIS - Séparée */
.myRoot { padding: 1rem; }
@media (--bp-min-medium) { .myRoot { padding: 2rem; } }
```

### [CSS-NESTING] Nesting CSS : États, Pseudo-classes et Sélecteurs enfants

**RÈGLE OBLIGATOIRE** : Toujours utiliser le **nesting CSS** pour les états, pseudo-classes, pseudo-éléments et sélecteurs enfants. Ne JAMAIS les séparer.

#### États et pseudo-classes (&:hover, &:focus, &:active, etc.)

```css
/* ✅ BON - Nesting avec & */
.button {
  background: var(--theme-color-primary);
  transition: background 0.2s ease;

  &:hover,
  &:focus {
    background: var(--theme-color-hover);
  }

  &:active {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}

/* ❌ MAUVAIS - Sélecteurs séparés */
.button { background: var(--theme-color-primary); }
.button:hover { background: var(--theme-color-hover); }
.button:active { opacity: 0.8; }
```

#### Sélecteurs enfants directs (svg, img, etc.)

```css
/* ✅ BON - Nesting pour les enfants */
.iconButton {
  width: 50px;
  height: 50px;

  svg {
    width: 24px;
    height: 24px;
    transition: width 0.2s ease;

    @media (--bp-min-medium) {
      width: 28px;
      height: 28px;
    }
  }

  img {
    width: 100%;
    object-fit: cover;
  }
}

/* ❌ MAUVAIS - Sélecteurs séparés */
.iconButton { width: 50px; }
.iconButton svg { width: 24px; }
.iconButton img { width: 100%; }
```

#### Modificateurs et variantes (&.active, &.disabled)

```css
/* ✅ BON - Nesting pour les variantes */
.menuLink {
  color: var(--theme-color-tertiary);
  transition: color 0.2s ease;

  &:hover {
    color: var(--theme-color-quaternary);
  }

  &.active {
    color: var(--theme-color-primary);
    font-weight: bold;
  }
}

/* ❌ MAUVAIS - Sélecteurs séparés */
.menuLink { color: var(--theme-color-tertiary); }
.menuLink:hover { color: var(--theme-color-quaternary); }
.menuLink.active { color: var(--theme-color-primary); }
```

#### Nesting combiné : états + media queries

```css
/* ✅ BON - Nesting complet */
.closeButton {
  width: 40px;
  height: 40px;
  transition: width 0.2s ease, height 0.2s ease;

  &:hover {
    width: 44px;
    height: 44px;
  }

  @media (--bp-min-large) {
    width: 80px;
    height: 80px;

    &:hover {
      width: 88px;
      height: 88px;
    }
  }
}

/* ❌ MAUVAIS - Tout séparé */
.closeButton { width: 40px; height: 40px; }
.closeButton:hover { width: 44px; height: 44px; }
@media (--bp-min-large) {
  .closeButton { width: 80px; height: 80px; }
  .closeButton:hover { width: 88px; height: 88px; }
}
```

#### Pourquoi le nesting ?

- ✅ **Lisibilité** : Toute la logique d'un élément au même endroit
- ✅ **Maintenabilité** : Modifications groupées, moins d'oublis
- ✅ **Performance** : Moins de répétitions, CSS plus compact
- ✅ **Cohérence** : Standard du projet, approche moderne

#### Transform vs Dimensions réelles

**PRÉFÉRER** : Changements de dimensions réelles (width/height) plutôt que `transform: scale()`

```css
/* ✅ BON - Dimensions réelles */
.icon {
  width: 24px;
  height: 24px;

  &:hover {
    width: 28px;
    height: 28px;
  }
}

/* ❌ À ÉVITER - Transform scale */
.icon {
  width: 24px;
  height: 24px;

  &:hover {
    transform: scale(1.2);
  }
}
```

**Pourquoi ?** Les dimensions réelles sont plus prédictibles, n'affectent pas le layout environnant, et sont plus simples à débugger.

#### Valeurs paires uniquement

**RÈGLE** : Toujours utiliser des **valeurs paires** (even numbers) pour les dimensions, espacements, et tailles. Jamais de valeurs impaires sauf exceptions minimales (1px pour les bordures).

```css
/* ✅ BON - Valeurs paires */
.button {
  width: 50px;
  height: 50px;
  padding: 16px 24px;
  gap: 8px;

  &:hover {
    width: 56px;
    height: 56px;
  }

  @media (--bp-min-medium) {
    width: 60px;
    height: 60px;
  }
}

.icon {
  width: 24px;
  height: 24px;

  @media (--bp-min-medium) {
    width: 30px;
    height: 30px;
  }
}

/* ❌ MAUVAIS - Valeurs impaires */
.button {
  width: 51px;    /* ❌ impair */
  height: 49px;   /* ❌ impair */
  gap: 9px;       /* ❌ impair */

  @media (--bp-min-medium) {
    width: 55px;  /* ❌ impair */
  }
}

/* ✅ EXCEPTION - Bordures minimales */
.line {
  height: 1px;  /* ✅ OK pour les bordures */
  border: 1px solid;  /* ✅ OK */
}
```

**Pourquoi ?**
- ✅ **Cohérence visuelle** : Grille alignée sur des multiples de 2
- ✅ **Divisibilité** : Plus facile de diviser ou doubler
- ✅ **Standard design** : Convention des systèmes de design modernes
- ✅ **Pixel parfait** : Évite les demi-pixels sur certains écrans

**Valeurs recommandées** : 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 100, etc.

### Variables CSS disponibles

Voir la liste complète dans `src/design-system/tokens/tokens.stories.tsx` :

**Couleurs** :
- Brand : `--theme-color-primary`, `--theme-color-secondary`, `--theme-color-tertiary`, `--theme-color-quaternary`, `--theme-color-quinary`
- Utility : `--theme-color-utility-1` (red), `--theme-color-utility-2` (green), `--theme-color-utility-3` (orange), `--theme-color-utility-4` (blue)
- Extended : `--theme-color-hover`, `--theme-color-background-1`, `--theme-color-background-2`, `--theme-color-foreground-1`, `--theme-color-foreground-2`, `--theme-color-foreground-3`

**Typographie** :
- `--navbar-font-size`, `--subtitle-font-size`, `--text-font-size`, `--description-font-size`

**Z-index** :
- `--z-index-navbars`, etc.

### [CSS-REFERENCE] Breakpoints

**Mobile First (--bp-min-*)** - À UTILISER :
- `--bp-min-medium` (768px+) - Tablette
- `--bp-min-large` (1024px+) - Desktop
- `--bp-min-xlarge` (1440px+) - Large Desktop
- `--bp-min-wide` (1920px+) - Ultra Wide

**Desktop First (--bp-max-*)** - À ÉVITER :
- Utiliser seulement si ciblage mobile strict nécessaire

📚 **Doc complète** : `docs/CUSTOM_MEDIA_QUERIES.md`

### [STORIES] 5. Créer les Stories Storybook

**`myComponent.stories.tsx`** :

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./myComponent.component";
import type { MyComponentProps } from "./myComponent.types";

// defaultArgs : Définir UNE FOIS, réutiliser partout
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

// Overview : OBLIGATOIRE - Tous les cas d'usage pour visual testing (Chromatic)
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

// Stories individuelles optionnelles (seulement si interaction spécifique nécessaire)
// Si tous les cas sont déjà dans Overview, ces stories sont inutiles
// export const Primary: Story = { args: { ...defaultArgs, variant: "primary" } };
// export const Secondary: Story = { args: { ...defaultArgs, variant: "secondary" } };
```

**Points clés** :
- ✅ **Story Overview OBLIGATOIRE** : Première story qui affiche tous les cas d'usage du composant (pour Chromatic visual testing)
- ✅ **Titres dans Overview** : Chaque cas d'usage doit avoir un `<h3>` descriptif pour identification claire
- ✅ Pattern **defaultArgs** : `const defaultArgs = {...}` puis `...defaultArgs`
- ✅ **UNIQUEMENT Overview suffit** : Si tous les variants/features sont dans Overview, pas besoin d'autres stories individuelles
- ✅ Stories individuelles optionnelles : Uniquement si interaction spécifique nécessaire (ex: contrôles Storybook pour tester manuellement)
- ✅ Title format : `"Design System/Components/{TYPE}/{NOM}"`
- ✅ `tags: ["autodocs"]` pour documentation auto
- ✅ **LANGUE FRANÇAISE** : Tous les textes des stories doivent être en français (titres, descriptions, contenu)
- ❌ **PAS de doc implementation** dans stories (utiliser `.docs.md`)
- ❌ **PAS de variations arbitraires** de contenu

**🇫🇷 Langue des Stories**

**RÈGLE OBLIGATOIRE** : Toutes les stories doivent être **en français**.

Cela inclut :
- ✅ Titres des sections `<h3>` dans Overview
- ✅ Contenu textuel dans `defaultArgs` (titres, descriptions, labels, etc.)
- ✅ Descriptions dans argTypes

**Exemple** :
```tsx
const defaultArgs: MyComponentProps = {
  title: "Notre entreprise",           // ✅ BON - français
  description: "Découvrez nos services", // ✅ BON - français
  // title: "Our Company",              // ❌ MAUVAIS - anglais
};
```

**⚡ Pourquoi la story Overview ?**

La story **Overview** est **OBLIGATOIRE** car elle permet de :
- 📸 **Visual testing efficace** : Chromatic (version gratuite) a une limite de snapshots. Une story Overview = 1 snapshot pour tous les cas d'usage au lieu de N snapshots
- 👁️ **Validation rapide** : Voir d'un coup d'œil tous les variants et états du composant
- 🐛 **Détection de régressions** : Les changements CSS affectant plusieurs variants sont immédiatement visibles
- 💰 **Économie** : Réduit considérablement le nombre de snapshots facturés par Chromatic

**📁 Assets pour les Stories**

**RÈGLE OBLIGATOIRE** : Toujours utiliser les assets du dossier **`/assets/showcase/`** dans les stories.

**Pourquoi showcase ?**
- ✅ **Cohérence** : Tous les composants utilisent les mêmes assets de test
- ✅ **Client neutre** : Les exemples Storybook ne sont pas liés à un client spécifique
- ✅ **Visual testing** : Assets génériques facilitent la détection de régressions CSS

**Assets disponibles dans showcase** :
- Images : `banner_1.webp`, `horizontal_image_1/2/3.webp`, `vertical_image_1.webp`, `square_image_1/2/3.webp` (voir le dossier pour la liste complète)
- Vidéos : `the_studio.mp4` (voir le dossier pour la liste complète)

**Exemple** :
```tsx
const defaultArgs: MyComponentProps = {
  image: "/assets/showcase/banner_1.webp",  // ✅ BON
  // image: "/assets/apt235/image.jpg",     // ❌ MAUVAIS
};
```

**Structure de la story Overview** :
```tsx
export const Overview: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Cas d'usage 1 : Default */}
      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>Default</h3>
        <MyComponent {...defaultArgs} />
      </div>

      {/* Cas d'usage 2 : Variants */}
      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>Variant Primary</h3>
        <MyComponent {...defaultArgs} variant="primary" />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>Variant Secondary</h3>
        <MyComponent {...defaultArgs} variant="secondary" />
      </div>

      {/* Cas d'usage 3 : États spéciaux */}
      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>Disabled</h3>
        <MyComponent {...defaultArgs} disabled />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>Sans description</h3>
        <MyComponent {...defaultArgs} description={undefined} />
      </div>
    </div>
  ),
};
```

**Exemple rapide** :
```tsx
// ✅ BON - Uniquement Overview avec tous les cas d'usage
export const Overview: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3>Par défaut</h3>
        <MyComponent {...defaultArgs} />
      </div>
      <div>
        <h3>Variante principale</h3>
        <MyComponent {...defaultArgs} variant="primary" />
      </div>
      <div>
        <h3>Sans titre</h3>
        <MyComponent {...defaultArgs} title={undefined} />
      </div>
    </div>
  )
};

// Stories individuelles optionnelles (généralement inutiles si tout est dans Overview)
// Uniquement si vous avez besoin de tester des interactions spécifiques manuellement
// export const Primary: Story = { args: { ...defaultArgs, variant: "primary" } };

// ❌ MAUVAIS - Variations arbitraires ou duplications
// export const AlternativeTitle: Story = { args: { ...defaultArgs, title: "Autre" } };
// export const Default: Story = { args: defaultArgs };  // ❌ Redondant avec Overview
// export const Playground: Story = { args: defaultArgs };  // ❌ Redondant avec Overview
```

### [TESTING] 6. Créer les tests

**`__tests__/myComponent.component.int.tsx`** :

```tsx
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { MyComponent } from "../myComponent.component";
import type { MyComponentProps } from "../myComponent.types";

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

**Points clés** :
- ✅ `beforeEach` pour initialiser props
- ✅ `screen.getByTestId("{nom}Root")` pour cibler root
- ✅ Tester : rendu de base + props conditionnelles + variants

### [IMPLEMENTATION-DOC] 7. Documentation d'implémentation (OBLIGATOIRE)

⚠️ **CRITIQUE** : Documentation d'implémentation dans `.docs.md` UNIQUEMENT (jamais dans `.stories.tsx`).

⚠️ **CONTENU MINIMALISTE** : Le fichier `.docs.md` doit contenir UNIQUEMENT :
- **Configuration JSON** : Exemples complets de configuration pour `config.json`
- **Comportements spécifiques** : Navigation clavier, comportements de carrousel, etc. (si applicable)
- **Accessibilité** : Notes spécifiques (si pertinent)

❌ **NE PAS inclure** :
- Descriptions de types TypeScript (déjà dans `.types.ts`)
- Exemples d'appels directs de composants (utiliser config JSON uniquement)
- Liste des classes CSS (implémentation interne)
- Props interface complète (déjà documentée par autodocs)
- Informations redondantes déjà explicites dans le code

**`myComponent.docs.md`** (structure complète dans section "Comment les composants sont chargés") :

````markdown
# MyComponent

Brève description du composant et de ses fonctionnalités principales.

## Configuration JSON

### Exemple de base

```json
{
  "type": "description",
  "id": "myComponent-1",
  "datas": {
    "title": "Mon titre",
    "description": "Ma description",
    "variant": "primary"
  }
}
```

### Avec options avancées

```json
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
```

## Navigation clavier

(Seulement si applicable - exemple : composant avec carrousel, menu, etc.)

Les sélecteurs supportent la navigation au clavier :
- **Enter** : Activer
- **Space** : Activer
- **Tab** : Naviguer entre éléments

## Accessibilité

(Seulement si notes spécifiques importantes)

- ✅ Navigation clavier complète
- ✅ Attributs ARIA appropriés
````

**Guidelines pour .docs.md** :
- ✅ **Titre et description brève** : 1-2 phrases maximum
- ✅ **Exemples JSON** : Multiples exemples couvrant les cas d'usage courants
- ✅ **Comportements spécifiques** : Navigation clavier, carrousel, etc. (si applicable)
- ✅ **Accessibilité** : Seulement si notes importantes
- ❌ **PAS de** : Types TypeScript, classes CSS, exemples JSX directs, props interface

📚 **Structure JSON complète** : Voir section "Comment les composants sont chargés"

## [DYNAMIC-LOADING] Comment les composants sont chargés

### Système de templates dynamiques

**IMPORTANT** : Composants **JAMAIS importés directement** - chargement via `config.json`.

### Workflow

1. **Config client** : `config/customer/{CLIENT}/config.json`
2. **Parsing** : Extraction composants depuis `content` (clés `{folder}-{number}`)
3. **Chargement dynamique** : Import `src/design-system/{folder}/{type}.component.tsx`
4. **Props** : `datas` passées au composant

### [JSON-STRUCTURE] Structure de configuration (4 niveaux)

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

**Explication** :

- **Niveau 1 (Layout)** : `type`, `id`, `name` → Routing et layout
- **Niveau 2 (Metadata)** : `title`, `description` → SEO
- **Niveau 3 (Content)** : Clés `{folder}-{number}` → Organisation composants
- **Niveau 4 (Component)** : `type` (nom fichier) + `datas` (props)

### Exemple : Composant Team

```json
{
  "type": "description",
  "id": "multiDescriptions",
  "name": "Team",
  "datas": {
    "title": "Our Team",
    "description": "Meet our amazing team members",
    "content": {
      "description-1": {
        "type": "team",
        "datas": {
          "preTitle": "Meet the team",
          "title": "Our Amazing Team",
          "description": "We are professionals...",
          "members": [
            {
              "name": "John Doe",
              "position": "CEO",
              "image": "team_john",
              "imageAlt": "John profile"
            }
          ]
        }
      }
    }
  }
}
```

### Mapping Clé + Type → Composant

| Clé Config | Type | Chemin Composant |
|------------|------|------------------|
| `description-1` | `team` | `components/description/team.component.tsx` |
| `banner-1` | `contactBanner` | `components/banner/contactBanner.component.tsx` |
| `cards-1` | `cardsList` | `components/cards/cardsList.component.tsx` |

**Règle** : `src/design-system/{folder}/{type}.component.tsx`

### Conséquences développement

1. **Default export obligatoire** : `export default MyComponent`
2. **Types stricts** : Props = interface TypeScript exacte
3. **Documentation .docs.md** : Expliquer structure JSON complète
4. **Testing isolé** : Tester composant seul, pas chargement dynamique

## [CODE-STYLE] Best Practices

### [NAMING] Nommage

- **Fichiers** : camelCase + suffixes
  - `.component.tsx`, `.module.css`, `.types.ts`, `.stories.tsx`, `.docs.md`, `.int.tsx`
- **Classes CSS** : camelCase
  - `{nom}Root`, `title`, `description`
  - Modificateurs : `{nom}RootPrimary`, `{nom}RootDisabled`
- **Props boolean** : Préfixer avec `is`, `has`, `should`
  - ✅ `isDisabled`, `hasError`, `shouldRender`
  - ❌ `disabled`, `error`, `render`

### [TYPESCRIPT] TypeScript

- ❌ **AUCUN `any`** autorisé (utiliser types spécifiques ou `unknown`)
- ✅ Props typées avec interface/type exporté
- ✅ `PropsWithChildren` pour composants avec children
- ⚠️ **JSDoc : Par défaut, NE PAS en ajouter** - Uniquement si apporte info non-évidente
- ❌ **Jamais de JSDoc sur composants React** (documentation dans stories/docs)
- ✅ Exporter variants séparément
- ✅ Typer retours de fonctions explicitement

### [CODE-RULES] Règles de Code

#### ❌ Pas de JSDoc sur composants React

```tsx
// ❌ MAUVAIS
/** Team component... */
export const Team = ({ ... }: TeamProps) => {...}

// ✅ BON
export const Team = ({ ... }: TeamProps) => {...}
```

#### ✅ data-testid Hardcodé

```tsx
// ❌ MAUVAIS - En prop
interface Props { dataTestId?: string; }
<section data-testid={dataTestId}>

// ✅ BON - Hardcodé
<section data-testid="teamRoot">
```

#### ✅ classNames() pour Styles

```tsx
import classNames from 'classnames';

// ❌ MAUVAIS - Template strings
<div className={`${styles.button} ${isPrimary ? styles.primary : ''}`}>

// ✅ BON - classNames()
<div className={classNames(styles.button, { [styles.primary]: isPrimary })}>
```

#### ❌ Font Properties Interdites

```css
/* ❌ MAUVAIS */
.title {
  font-size: 2rem;
  font-weight: bold;
  font-family: Arial;
  font-style: italic;
}

/* ✅ BON */
.title {
  color: var(--theme-color-primary);
  line-height: 1.5; /* ✅ line-height OK */
  letter-spacing: 0.05em; /* ✅ letter-spacing OK */
}
```

**Interdits** : `font-size`, `font-weight`, `font-family`, `font-style`
**Autorisés** : `line-height`, `letter-spacing`, `text-transform`, `text-align`

### [CSS-CONSOLIDATED] CSS Modules & Responsive

**Règles** :
- ✅ **@import obligatoire** : `@import url('../../../custom-media.css');` ligne 1
- ✅ **Mobile First** : Styles mobile par défaut + `--bp-min-*`
- ✅ **Nesting** : Media queries DANS sélecteurs
- ✅ **Variables** : `var(--theme-color-*)`, jamais hardcoded
- ❌ **Font-properties interdites** : `font-size`, `font-weight`, `font-family`, `font-style`

**Exemple** :
```css
@import url('../../../custom-media.css');

.myComponent {
  padding: 1rem;
  @media (--bp-min-medium) { padding: 2rem; }
}
```

📚 **Variables complètes** : `src/design-system/tokens/tokens.stories.tsx`

### [CSS-SUMMARY] CSS Modules

- ✅ Variables theme obligatoires : `var(--theme-color-*)`
- ✅ @import custom-media en ligne 1
- ✅ Mobile-first avec `--bp-min-*` imbriqué
- ❌ **Pas de font-properties** (size/weight/family/style) - géré par theme global
- ✅ Organisation : base → variants → states

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

## [CHECKLIST] Checklist de création

### ⚠️ Prérequis (BLOCKER)
- [ ] **NOM** défini
- [ ] **TYPE** identifié
- [ ] **DESCRIPTION** détaillée fournie
- [ ] Si manquant → **DEMANDER avant de créer**

### Architecture
- [ ] Type identifié → dossier correct (`{TYPE}/`)
- [ ] Fichiers dans `src/design-system/{TYPE}/` (pas de dossier par composant)
- [ ] Nomenclature : `{nom}.component.tsx`, `{nom}.module.css`, etc.
- [ ] Storybook title : `"Design System/Components/{TYPE}/{NOM}"`

### Fichiers requis (6)
- [ ] `{nom}.component.tsx` - React + `export default`
- [ ] `{nom}.module.css` - @import custom-media ligne 1
- [ ] `{nom}.types.ts` - Interfaces TypeScript
- [ ] `{nom}.stories.tsx` - defaultArgs + spread
- [ ] `{nom}.docs.md` - Full JSON implementation
- [ ] `__tests__/{nom}.component.int.tsx` - Vitest

### Code Quality
- [ ] Pas de `any` TypeScript
- [ ] Props typées + JSDoc **si utile uniquement**
- [ ] CSS Modules (pas Styled Components)
- [ ] `@import url('../../../custom-media.css');` ligne 1 CSS
- [ ] Variables theme : `var(--theme-color-*)`
- [ ] ❌ **Aucune font-property** (size/weight/family/style)
- [ ] Mobile-first : `--bp-min-*` imbriquées
- [ ] `classNames()` pour classes multiples
- [ ] `data-testid="{nom}Root"` hardcodé (pas en prop)

### Stories
- [ ] **Story Overview créée** : Affiche tous les cas d'usage (OBLIGATOIRE pour Chromatic)
- [ ] **Titres dans Overview** : Chaque cas d'usage a un `<h3>` descriptif
- [ ] **Assets showcase** : Utilise `/assets/showcase/` (pas d'assets clients)
- [ ] `const defaultArgs` créé + typé
- [ ] **UNIQUEMENT Overview suffit** : Pas besoin de stories individuelles si tout est dans Overview
- [ ] Stories individuelles optionnelles : Uniquement si interaction spécifique nécessaire
- [ ] Pas de variations arbitraires
- [ ] `tags: ["autodocs"]`
- [ ] ❌ Pas de doc implementation dans .stories.tsx

### Tests
- [ ] Tests intégration écrits
- [ ] Couverture : base + variants + states
- [ ] `beforeEach` pour props

### Documentation
- [ ] ❌ Pas JSDoc sur composant React
- [ ] Props documentées **si utile** dans types
- [ ] `.docs.md` avec structure JSON complète
- [ ] `.docs.md` MINIMALISTE : uniquement config JSON, pas de descriptions de types/classes CSS
- [ ] Stories en français (titres, descriptions, contenu)

### Vérification finale
- [ ] Affichage Storybook OK
- [ ] Tests passent : `pnpm test`
- [ ] Pas erreurs : `pnpm lint`
- [ ] Responsive : mobile → desktop
- [ ] Accessible (clavier, screen readers)

## [RESOURCES] Ressources

- **Exemple complet** : `src/design-system/example/`
- **Composant référence** : `src/design-system/components/description/team.*`
- **Tokens** : Storybook → `Design System/Tokens`
- **Media queries** : `docs/CUSTOM_MEDIA_QUERIES.md`
- **Migration CSS** : `docs/CSS_MODULES_MIGRATION.md`

## [COMMANDS] Commandes

```bash
pnpm storybook          # Storybook
pnpm test               # Tests watch
pnpm test {nom}         # Tests spécifiques
pnpm lint               # Linter
```

## [WORKFLOW] Workflow recommandé

1. **Vérifier prérequis** : NOM + TYPE + DESCRIPTION
2. **Identifier TYPE** : Choisir dossier dans `src/design-system/`
3. **Créer types** : `.types.ts` avec interfaces
4. **Créer composant** : `.component.tsx` (React + data-testid hardcodé)
5. **Créer styles** : `.module.css` (@import + mobile-first + variables)
6. **Créer stories** : `.stories.tsx` (defaultArgs + spread)
7. **Créer docs** : `.docs.md` (structure JSON complète)
8. **Créer tests** : `__tests__/*.int.tsx` (Vitest)
9. **Vérifier** : Checklist complète
10. **Commit** : Suivre conventions projet

---

**🎯 Bonne création de composants !**
