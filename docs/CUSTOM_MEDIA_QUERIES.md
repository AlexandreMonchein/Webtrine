# Custom Media Queries - Documentation

Guide complet pour utiliser les custom media queries dans le projet Webtrine.

## ⚡ Quick Rules for AI

### MUST (Règles obligatoires)
- ✅ **Import ligne 1** : `@import url('../../../custom-media.css');` dans CHAQUE `.module.css`
- ✅ **Media queries imbriquées** : TOUJOURS imbriquer `@media` DANS les sélecteurs CSS
- ✅ **Mobile-first** : Utiliser `--bp-min-*` par défaut (styles mobiles d'abord, puis desktop)
- ✅ **Ordre croissant** : small → medium → large → xlarge (ne jamais inverser)
- ✅ **Noms sémantiques** : `--bp-min-medium` (pas `768px`)

### MUST NOT (Interdictions)
- ❌ **Jamais media queries séparées** : `@media { .selector { } }` en dehors du sélecteur
- ❌ **Jamais desktop-first** : Éviter `--bp-max-*` (sauf cas spécifiques)
- ❌ **Jamais breakpoints arbitraires** : `@media (min-width: 850px)` interdit
- ❌ **Jamais ordre décroissant** : large → medium → small (cause conflits CSS)

### PATTERN (Code standard)
```css
/* component.module.css */
@import url('../../../custom-media.css');

.container {
  /* Mobile (< 768px) - styles de base */
  width: 100%;
  padding: 1rem;

  /* Tablette (≥ 768px) */
  @media (--bp-min-medium) {
    width: 50%;
    padding: 2rem;
  }

  /* Desktop (≥ 1024px) */
  @media (--bp-min-large) {
    width: 33.33%;
    padding: 3rem;
  }
}
```

**Breakpoints disponibles** : `--bp-min-small` (600px), `--bp-min-medium` (768px), `--bp-min-large` (1024px), `--bp-min-xlarge` (1440px), `--bp-min-wide` (1920px)

---

## [OVERVIEW] Vue d'ensemble

Les custom media queries permettent de définir des breakpoints réutilisables dans un fichier central. Au lieu d'écrire `@media (min-width: 768px)` partout, vous utilisez `@media (--bp-min-medium)`.

**Avantages** : Maintenabilité ✅, Lisibilité ✅, Cohérence ✅, Mobile First ✅, Syntaxe moderne ✅

## [BREAKPOINTS] Breakpoints Disponibles

### Mobile First (MIN) - ✅ Recommandé

```css
@media (--bp-min-small)   /* ≥ 600px  - Grande mobile */
@media (--bp-min-medium)  /* ≥ 768px  - Tablette */
@media (--bp-min-large)   /* ≥ 1024px - Desktop */
@media (--bp-min-xlarge)  /* ≥ 1440px - Large Desktop */
@media (--bp-min-wide)    /* ≥ 1920px - Ultra Wide */
```

### Desktop First (MAX) - ⚠️ Cas spécifiques

```css
@media (--bp-max-xsmall)  /* < 600px  - Mobile uniquement */
@media (--bp-max-small)   /* < 768px  - Jusqu'à tablette */
@media (--bp-max-medium)  /* < 1024px - Jusqu'à desktop */
```

### Plages Spécifiques (ONLY)

```css
@media (--bp-only-medium)  /* 768px - 1023px - Tablette uniquement */
```

**Table de correspondance** :

| Custom Media      | Équivalent          | Cas d'usage   |
|-------------------|---------------------|---------------|
| `--bp-min-medium` | `(min-width: 768px)`| Tablette      |
| `--bp-min-large`  | `(min-width: 1024px)`| Desktop      |

## [USAGE] Utilisation

### Import OBLIGATOIRE

**TOUJOURS en ligne 1** de chaque `.module.css` :

```css
@import url('../../../custom-media.css');
```

### Exemple Standard

```css
/* component.module.css */
@import url('../../../custom-media.css');

.container {
  width: 100%; /* Mobile */

  @media (--bp-min-medium) { width: 50%; }
  @media (--bp-min-large) { width: 33.33%; }
}
```

### Combinaison avec d'autres features

```css
@import url('../../../custom-media.css');

/* Portrait sur tablette */
.container {
  @media (--bp-min-medium) and (orientation: portrait) {
    flex-direction: column;
  }
}

/* Préférence dark mode sur desktop */
.card {
  @media (--bp-min-large) and (prefers-color-scheme: dark) {
    background: var(--dark-blue);
  }
}
```

## [CONFIG] Configuration Technique

**Fichiers clés** :
- `src/custom-media.css` : Définitions des breakpoints
- `postcss.config.js` : Plugin postcss-custom-media
- Vite détecte automatiquement PostCSS ✅

## [BEST-PRACTICES] Best Practices

### 1. Mobile First + Imbriqué

```css
/* ✅ BON */
@import url('../../../custom-media.css');
.element {
  font-size: 14px;
  @media (--bp-min-medium) { font-size: 16px; }
}

/* ❌ MAUVAIS - Desktop first ou séparé */
.element { font-size: 16px; }
@media (--bp-max-small) { .element { font-size: 14px; } }
```

### 2. Ordre Croissant

```css
/* ✅ BON - small → medium → large */
.element {
  @media (--bp-min-small) { }
  @media (--bp-min-medium) { }
  @media (--bp-min-large) { }
}
```

### 3. Utiliser les Breakpoints Définis

```css
/* ❌ MAUVAIS - Valeur arbitraire */
@media (min-width: 850px) { }

/* ✅ BON - Breakpoint défini */
@media (--bp-min-large) { }
```

## [MIGRATION] Migration depuis Media Queries Classiques

**Remplacements rapides** :
```
(min-width: 768px)  → (--bp-min-medium)
(min-width: 1024px) → (--bp-min-large)
(max-width: 767px)  → (--bp-max-small)
```

**Exemple** :

```css
/* ❌ Avant - Séparé */
.navbar { height: 60px; }
@media (min-width: 768px) { .navbar { height: 80px; } }

/* ✅ Après - Imbriqué */
@import url('../../../custom-media.css');
.navbar {
  height: 60px;
  @media (--bp-min-medium) { height: 80px; }
}
```

## [TESTING] Tests

Les custom media queries sont compilées au build time - vos tests fonctionnent normalement ✅

## [CHECKLIST] Checklist

- [ ] `@import url('../../../custom-media.css');` ligne 1
- [ ] Styles mobile sans media query
- [ ] Media queries imbriquées (`--bp-min-*`)
- [ ] Ordre croissant (small → large)
- [ ] Tester sur différentes tailles

## [RESOURCES] Ressources

- **Fichier de définition** : `src/custom-media.css`
- **Exemple d'utilisation** : `src/design-system/example/example.module.css`
- **Configuration PostCSS** : `postcss.config.js`
- **Documentation PostCSS** : [postcss-custom-media](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media)
- **Spécification CSS** : [CSS Media Queries Level 5](https://drafts.csswg.org/mediaqueries-5/#custom-mq)
