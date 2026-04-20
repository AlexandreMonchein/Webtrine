# Guide de Migration : Styled Components → CSS Modules

Ce guide vous accompagne dans la migration progressive de Styled Components vers CSS Modules.

## ⚡ Quick Rules for AI

### MUST (Règles de migration)
- ✅ **Créer `.module.css`** avec `@import url('../../../custom-media.css');` ligne 1
- ✅ **Importer avec** `import styles from './component.module.css'`
- ✅ **Utiliser classNames()** pour classes multiples/conditionnelles
- ✅ **CSS Nesting OBLIGATOIRE** : Imbriquer TOUS sélecteurs (descendants, pseudo-classes, media queries) dans classe principale
- ✅ **Media queries imbriquées** DANS sélecteurs (mobile-first)
- ✅ **Variables CSS identiques** : `var(--theme-color-*)` fonctionne pareil
- ✅ **Default export** si chargement dynamique

### MUST NOT (Interdictions)
- ❌ **Jamais de font-properties** (`font-size`, `font-weight`, `font-family`, `font-style`)
- ❌ **Jamais template strings** pour classes (`${styles.a} ${styles.b}`)
- ❌ **Jamais sélecteurs séparés** (descendants, pseudo-classes → toujours imbriqués)
- ❌ **Jamais media queries séparées** (toujours imbriquées)
- ❌ **Jamais desktop-first** (utiliser `--bp-min-*`)

### PATTERN (Conversion rapide)
```tsx
// ❌ Styled Components
const Title = styled.h1`
  color: var(--theme-color-primary);
  font-size: 2rem; // ❌ font property
`;

// ✅ CSS Modules
// component.module.css
@import url('../../../custom-media.css');
.title {
  color: var(--theme-color-primary);
  /* ❌ PAS de font-size */
  margin: 0;
}

// component.tsx
<h1 className={styles.title}>
```

**CSS Nesting obligatoire** :
```css
/* ❌ MAUVAIS - Sélecteurs séparés */
.description { width: 100%; }
.description a { color: blue; }
.description a:hover { color: red; }

/* ✅ BON - Sélecteurs imbriqués */
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

---

## 📋 Table des matières

1. [Pourquoi CSS Modules ?](#pourquoi-css-modules)
2. [Configuration](#configuration)
3. [Patterns de Migration](#patterns-de-migration)
4. [Exemples de Conversion](#exemples-de-conversion)
5. [Best Practices](#best-practices)
6. [Checklist](#checklist)

## [WHY] Pourquoi CSS Modules ?

### Avantages

- ✅ **Performance** : Pas de runtime JS, CSS statique
- ✅ **Bundle** : Réduction ~30kb (styled-components runtime)
- ✅ **Simplicité** : Séparation HTML/CSS claire
- ✅ **Tooling** : Meilleur support IDE, IntelliSense
- ✅ **SSR** : Pas de hydration mismatch
- ✅ **Debug** : Classes lisibles en dev

### Coexistence
Les deux systèmes coexistent pendant la migration (composant par composant).

## [CONFIG] Configuration

### TypeScript Support

**`tsconfig.json`** + **`src/css-modules.d.ts`** : Support TypeScript configuré ✅

### Vite

**`vite.config.js`** : CSS Modules avec `camelCase` + scoping local ✅

## [PATTERNS] Patterns de Migration

### 1. Structure

```
// ❌ Avant
component/
  ├── myComponent.component.tsx
  ├── myComponent.styled.ts

// ✅ Après
component/
  ├── myComponent.component.tsx
  ├── myComponent.module.css
```

### 2. Import

```tsx
// ❌ Avant
import { Container, Title } from './myComponent.styled';
<Container><Title>Hello</Title></Container>

// ✅ Après
import styles from './myComponent.module.css';
<div className={styles.container}>
  <h1 className={styles.title}>Hello</h1>
</div>
```

### 3. Props conditionnelles

```tsx
// ❌ Avant
const Button = styled.button<{ $primary?: boolean }>`
  background: ${props => props.$primary ? 'blue' : 'gray'};
`;
<Button $primary>Click</Button>

// ✅ Après (CSS)
.button { background: gray; }
.buttonPrimary { background: blue; }

// ✅ Après (TSX)
import classNames from 'classnames';
<button className={classNames(styles.button, {
  [styles.buttonPrimary]: isPrimary
})}>
```

### 4. Variables CSS

Variables de `style.config.json` fonctionnent identiquement! ✅

```css
.title {
  color: var(--theme-color-primary);
  /* Voir tous tokens : Storybook → Design System/Tokens */
}
```

### 5. Breakpoints

```css
// ❌ Avant (Styled Components)
import { bp } from '@/breakpoint';
const Container = styled.div`
  width: 100%;
  ${bp.min('tablet')} { width: 50%; }
`;

// ✅ Après (CSS Modules avec nesting)
@import url('../../../custom-media.css');
.container {
  width: 100%;
  @media (--bp-min-medium) { width: 50%; }
}
```

### 6. Font Properties

❌ **INTERDITES** : `font-size`, `font-weight`, `font-family`, `font-style`
✅ **Autorisées** : `line-height`, `letter-spacing`, `text-transform`, `text-align`

```css
// ❌ Avant (Styled Components)
const Title = styled.h1`
  font-size: var(--subtitle-font-size);
  font-weight: bold;
`;

// ✅ Après (CSS Modules)
.title {
  line-height: 1.5; /* ✅ OK */
  /* ❌ PAS de font-size, font-weight */
}
```

**Pourquoi ?** Géré globalement par `src/theme/customer/default/globalStyle.css`

### 7. classNames()

✅ **TOUJOURS utiliser** pour classes multiples/conditionnelles

```tsx
// ❌ MAUVAIS
<div className={`${styles.button} ${isPrimary ? styles.primary : ''}`}>

// ✅ BON
import classNames from 'classnames';
<div className={classNames(styles.button, { [styles.primary]: isPrimary })}>
```

## [EXAMPLES] Exemples de Conversion

### Banner Component

```tsx
// ❌ Avant (Styled)
import { BannerContainer, BannerTitle } from './banner.styled';
export const Banner = ({ title }) => (
  <BannerContainer><BannerTitle>{title}</BannerTitle></BannerContainer>
);

// ✅ Après (CSS Modules)
import styles from './banner.module.css';
export const Banner = ({ title }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>{title}</h1>
  </div>
);
```

```css
/* banner.module.css */
@import url('../../../custom-media.css');

.container {
  padding: 2rem;
  background: var(--theme-color-primary);
  @media (--bp-min-medium) { padding: 4rem; }
}

.title {
  color: var(--theme-color-secondary);
  margin-bottom: 1rem;
}
```

### Button avec Variants

```tsx
// ❌ Avant
const StyledButton = styled.button<{ $variant, $disabled }>`
  background: ${p => p.$variant === 'primary' ? 'blue' : 'gray'};
  opacity: ${p => p.$disabled ? 0.5 : 1};
`;

// ✅ Après (TSX)
import classNames from 'classnames';
import styles from './button.module.css';

export const Button = ({ variant = 'primary', disabled }) => (
  <button
    className={classNames(styles.button, {
      [styles.buttonPrimary]: variant === 'primary',
      [styles.buttonSecondary]: variant === 'secondary',
      [styles.buttonDisabled]: disabled,
    })}
    disabled={disabled}
  />
);
```

```css
/* button.module.css */
.button { padding: 1rem 2rem; border: none; }
.buttonPrimary { background: var(--theme-color-primary); }
.buttonSecondary { background: var(--theme-color-secondary); }
.buttonDisabled { opacity: 0.5; cursor: not-allowed; }
```

## [BEST-PRACTICES] Best Practices

### 1. Nommage
- ✅ **camelCase** : `styles.myClass`
- ✅ **BEM-like** : `.componentName__element--modifier`
- ✅ **Descriptif** : `.cardTitle` > `.t1`

### 2. Composition
```css
.baseButton { padding: 1rem 2rem; border: none; }
.primaryButton { composes: baseButton; background: var(--primary); }
```

### 3. CSS Nesting (OBLIGATOIRE)
Imbriquer **TOUS** les sélecteurs dans la classe principale pour une structure claire et maintenable.

```css
/* ❌ MAUVAIS - Sélecteurs plats séparés */
.description { width: 100%; }
.description a { color: blue; }
.description a:hover { color: red; }
.description a:focus { color: red; }

/* ✅ BON - Structure imbriquée */
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

**Règles de nesting** :
- ✅ Descendants : `a`, `img`, `div` → imbriqués
- ✅ Pseudo-classes : `&:hover`, `&:focus`, `&:active` → imbriquées
- ✅ Pseudo-éléments : `&::before`, `&::after` → imbriqués
- ✅ Media queries : `@media (...)` → imbriquées
- ✅ Modifieurs : Dans classe séparée (`.buttonPrimary`) ou composée (`.button.primary`)

**Exemple complexe** :
```css
.cardWrapper {
  display: flex;
  padding: 1rem;

  img {
    width: 100%;
    border-radius: 8px;

    @media (--bp-min-large) {
      width: 50%;
    }
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
}

.cardWrapperIsLogo {
  padding: 0;

  img {
    border-radius: 0;
  }
}
```

### 4. Tests
Les tests restent identiques - classes CSS automatiquement appliquées ✅

## [CHECKLIST] Checklist

### Par composant
- [ ] Créer `.module.css` avec @import ligne 1
- [ ] Convertir styled components → classes CSS
- [ ] **CSS Nesting : Imbriquer tous sélecteurs (descendants, pseudo-classes, media queries)**
- [ ] Props conditionnelles → `classNames()`
- [ ] Media queries → imbriquées + mobile-first
- [ ] Supprimer propriétés font
- [ ] Tester
- [ ] Vérifier Storybook
- [ ] Supprimer `.styled.ts`

### Migration complète
- [ ] Nouveaux composants : CSS Modules uniquement
- [ ] Composants simples d'abord (buttons, cards)
- [ ] Puis layout (banner, description)
- [ ] Navigation en dernier (navbars, footers)
- [ ] Tous tests passent
- [ ] Supprimer `styled-components` de `package.json`
- [ ] Migrer `globalStyled.ts` → `globalStyle.css`

## [RESOURCES] Ressources

- **Exemple** : `src/design-system/example/`
- **Documentation** : [CSS Modules](https://github.com/css-modules/css-modules), [Vite](https://vitejs.dev/guide/features.html#css-modules)
- **Librairies** : [classnames](https://github.com/JedWatson/classnames)
