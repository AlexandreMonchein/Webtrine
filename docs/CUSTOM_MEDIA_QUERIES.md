# Custom Media Queries - Documentation

Guide complet pour utiliser les custom media queries dans le projet Webtrine.

## 📱 Vue d'ensemble

Les custom media queries permettent de définir des breakpoints réutilisables et maintenables dans un seul fichier central. Au lieu d'écrire `@media (min-width: 768px)` partout, vous utilisez `@media (--bp-min-medium)`.

### Avantages

- ✅ **Maintenabilité** : Changez un breakpoint à un seul endroit
- ✅ **Lisibilité** : Noms sémantiques (`--bp-min-medium` vs `768px`)
- ✅ **Cohérence** : Mêmes breakpoints dans toute l'application
- ✅ **Mobile First** : Approche par défaut avec les `--bp-min-*`
- ✅ **Syntaxe moderne** : Utilise la syntaxe CSS moderne `width >=`

## 📋 Breakpoints Disponibles

### Mobile First (MIN) - **Recommandé**

Utilisez toujours l'approche mobile-first pour de meilleures performances :

```css
@media (--bp-min-small)   /* ≥ 600px */
@media (--bp-min-medium)  /* ≥ 768px  - Tablette */
@media (--bp-min-large)   /* ≥ 1024px - Desktop */
@media (--bp-min-xlarge)  /* ≥ 1440px - Large Desktop */
@media (--bp-min-wide)    /* ≥ 1920px - Ultra Wide */
```

### Desktop First (MAX)

Pour des cas spécifiques où vous devez cibler les petits écrans :

```css
@media (--bp-max-xsmall)  /* < 600px  - Mobile uniquement */
@media (--bp-max-small)   /* < 768px  - Mobile et petite tablette */
@media (--bp-max-medium)  /* < 1024px - Jusqu'à tablette */
@media (--bp-max-large)   /* < 1440px */
@media (--bp-max-xlarge)  /* < 1920px */
```

### Plages Spécifiques (ONLY)

Pour cibler une plage de taille exacte :

```css
@media (--bp-only-xsmall)  /* < 600px */
@media (--bp-only-small)   /* 600px - 767px */
@media (--bp-only-medium)  /* 768px - 1023px */
@media (--bp-only-large)   /* 1024px - 1439px */
@media (--bp-only-xlarge)  /* 1440px - 1919px */
@media (--bp-only-wide)    /* ≥ 1920px */
```

## 🎯 Utilisation

### Exemple de Base

**Au lieu de :**

```css
.container {
  width: 100%;
}

@media (min-width: 768px) {
  .container {
    width: 50%;
  }
}

@media (min-width: 1024px) {
  .container {
    width: 33.33%;
  }
}
```

**Écrivez :**

```css
.container {
  width: 100%;
}

@media (--bp-min-medium) {
  .container {
    width: 50%;
  }
}

@media (--bp-min-large) {
  .container {
    width: 33.33%;
  }
}
```

### Exemple Complet

```css
/* component.module.css */

.card {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Tablette : 768px+ */
@media (--bp-min-medium) {
  .card {
    padding: 1.5rem;
    flex-direction: row;
    gap: 1rem;
  }
}

/* Desktop : 1024px+ */
@media (--bp-min-large) {
  .card {
    padding: 2rem;
    gap: 2rem;
  }
}

/* Large Desktop : 1440px+ */
@media (--bp-min-xlarge) {
  .card {
    padding: 3rem;
  }
}
```

### Cas d'Usage Avancés

#### Combinaison avec d'autres media features

```css
/* Portrait sur tablette */
@media (--bp-min-medium) and (orientation: portrait) {
  .container {
    flex-direction: column;
  }
}

/* Préférence dark mode sur desktop */
@media (--bp-min-large) and (prefers-color-scheme: dark) {
  .card {
    background: var(--dark-blue);
  }
}
```

## 🔧 Configuration Technique

### 1. Fichier de Définition

**`src/custom-media.css`** : Contient toutes les définitions

```css
@custom-media --bp-min-medium screen and (width >= 768px);
@custom-media --bp-min-large screen and (width >= 1024px);
/* etc. */
```

### 2. PostCSS Configuration

**`postcss.config.js`** : Configure le plugin

```javascript
import postcssCustomMedia from 'postcss-custom-media';

export default {
  plugins: [
    postcssCustomMedia({
      importFrom: './src/custom-media.css',
    }),
  ],
};
```

### 3. Vite Intégration

Vite détecte automatiquement `postcss.config.js` et l'applique à tous les fichiers CSS.

## 📊 Table de Correspondance

| Custom Media          | Équivalent Classique      | Cas d'usage                    |
|-----------------------|---------------------------|--------------------------------|
| `--bp-min-small`      | `(min-width: 600px)`      | Grande mobile / Petite tablette|
| `--bp-min-medium`     | `(min-width: 768px)`      | Tablette                       |
| `--bp-min-large`      | `(min-width: 1024px)`     | Desktop                        |
| `--bp-min-xlarge`     | `(min-width: 1440px)`     | Large Desktop                  |
| `--bp-min-wide`       | `(min-width: 1920px)`     | Ultra Wide                     |
| `--bp-max-small`      | `(max-width: 767px)`      | Mobile uniquement              |
| `--bp-only-medium`    | `(768px <= width < 1024px)`| Tablette uniquement           |

## 🎨 Best Practices

### 1. Toujours Mobile First

```css
/* ✅ BON - Mobile first */
.element {
  font-size: 14px;
}

@media (--bp-min-medium) {
  .element {
    font-size: 16px;
  }
}

/* ❌ MAUVAIS - Desktop first */
.element {
  font-size: 16px;
}

@media (--bp-max-small) {
  .element {
    font-size: 14px;
  }
}
```

### 2. Utiliser des Noms Sémantiques

```css
/* ✅ BON - Classe sémantique avec media query */
.productGrid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (--bp-min-medium) {
  .productGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (--bp-min-large) {
  .productGrid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 3. Grouper les Media Queries

```css
/* ✅ BON - Groupé par breakpoint */
.card {
  padding: 1rem;
}

.title {
  font-size: 1.5rem;
}

@media (--bp-min-medium) {
  .card {
    padding: 2rem;
  }

  .title {
    font-size: 2rem;
  }
}
```

### 4. Éviter les Valeurs Arbitraires

```css
/* ❌ MAUVAIS - Breakpoint personnalisé */
@media (min-width: 850px) {
  .element { /* ... */ }
}

/* ✅ BON - Utiliser les breakpoints définis */
@media (--bp-min-large) {
  .element { /* ... */ }
}
```

## 🔄 Migration depuis les Media Queries Classiques

### Script de Remplacement Rapide

Vous pouvez utiliser ces remplacements dans votre éditeur :

```
(min-width: 600px)  → (--bp-min-small)
(min-width: 768px)  → (--bp-min-medium)
(min-width: 1024px) → (--bp-min-large)
(min-width: 1440px) → (--bp-min-xlarge)
(min-width: 1920px) → (--bp-min-wide)

(max-width: 599px)  → (--bp-max-xsmall)
(max-width: 767px)  → (--bp-max-small)
(max-width: 1023px) → (--bp-max-medium)
```

### Exemple de Migration

**Avant :**

```css
.navbar {
  height: 60px;
}

@media (min-width: 768px) {
  .navbar {
    height: 80px;
  }
}

@media (min-width: 1024px) {
  .navbar {
    height: 100px;
  }
}
```

**Après :**

```css
.navbar {
  height: 60px;
}

@media (--bp-min-medium) {
  .navbar {
    height: 80px;
  }
}

@media (--bp-min-large) {
  .navbar {
    height: 100px;
  }
}
```

## 🧪 Tests

Les custom media queries sont compilées au build time, donc vos tests fonctionnent normalement :

```tsx
import { render, screen } from '@testing-library/react';
import { Component } from './component.component';

describe('<Component />', () => {
  it('should render responsive layout', () => {
    // Les media queries sont déjà compilées
    render(<Component />);
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });
});
```

## 📝 Checklist d'Utilisation

Pour chaque nouveau composant :

- [ ] Commencer par le style mobile (sans media query)
- [ ] Ajouter `@media (--bp-min-medium)` pour tablette
- [ ] Ajouter `@media (--bp-min-large)` pour desktop
- [ ] Ajouter d'autres breakpoints si nécessaire
- [ ] Tester sur différentes tailles d'écran
- [ ] Vérifier que les styles sont appliqués correctement

## ⚠️ Points d'Attention

### 1. Support Navigateur

PostCSS compile les custom media queries en media queries classiques, donc **100% de compatibilité** avec tous les navigateurs.

### 2. Hot Reload

Si vous modifiez `src/custom-media.css`, vous devez relancer le serveur de développement :

```bash
# Arrêter (Ctrl+C) puis
pnpm dev
```

### 3. Ordre des Media Queries

Respectez l'ordre croissant pour éviter les conflits :

```css
/* ✅ BON - Ordre croissant */
@media (--bp-min-small) { /* 600px */ }
@media (--bp-min-medium) { /* 768px */ }
@media (--bp-min-large) { /* 1024px */ }

/* ❌ MAUVAIS - Ordre décroissant */
@media (--bp-min-large) { /* 1024px */ }
@media (--bp-min-medium) { /* 768px */ }
@media (--bp-min-small) { /* 600px */ }
```

## 🔗 Ressources

- **Fichier de définition** : `src/custom-media.css`
- **Exemple d'utilisation** : `src/design-system/example/example.module.css`
- **Configuration PostCSS** : `postcss.config.js`
- **Documentation PostCSS** : [postcss-custom-media](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media)
- **Spécification CSS** : [CSS Media Queries Level 5](https://drafts.csswg.org/mediaqueries-5/#custom-mq)
