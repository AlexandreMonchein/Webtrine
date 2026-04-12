# Project overview

**Webtrine** est une application web React/Redux multi-clients permettant de créer des sites vitrines personnalisés pour différentes marques. Construit avec Vite et TypeScript, il utilise une architecture multi-tenant où une seule base de code sert plusieurs clients (chillpaws, dipaolo, showcase, webtrine) avec des configurations, thèmes et assets spécifiques.

## 🏗️ Architecture & Technology Stack

- **Frontend**: React 18, Redux Toolkit, CSS Modules + Styled Components (migration en cours), TypeScript
- **Backend**: Express.js server (server.js pour servir les builds)
- **Build Tools**: Vite 6 avec plugins personnalisés
- **Package Manager**: pnpm (v10)
- **Node**: v22
- **Design System**: Système de composants réutilisables dans `src/design-system/`
- **Documentation**: Storybook 8.6.7

### Technologies Principales

- **UI/Styling**: CSS Modules (nouveau) + Styled Components 6.1.11 (legacy), CSS moderne avec variables
- **State Management**: Redux Toolkit (@reduxjs/toolkit 2.2.4)
- **Routing**: React Router DOM 6.23.1
- **Internationalization**: i18next 23.11.5 + react-i18next 14.1.1
- **Maps**: Leaflet 1.9.4 + React Leaflet avec gesture handling
- **Forms**: EmailJS pour l'envoi d'emails, React Calendly pour la planification
- **Testing**: Vitest 3.0.9 + Testing Library + Playwright
- **Linting**: ESLint 9 avec flat config + Prettier + Stylelint
- **CSS Modules**: typescript-plugin-css-modules pour le support TypeScript

### Migration vers CSS Modules

⚠️ **Le projet est en cours de migration de Styled Components vers CSS Modules** :
- **Nouveaux composants** : Doivent utiliser CSS Modules
- **Composants existants** : Peuvent rester avec Styled Components temporairement
- **Coexistence** : Les deux approches peuvent coexister pendant la migration
- **Documentation complète** : Voir `docs/CSS_MODULES_MIGRATION.md`
- **Composant exemple** : `src/design-system/example/` montre le pattern CSS Modules

### Plugins Vite Personnalisés

- **copyCustomerAssetsPlugin**: Copie automatique des assets spécifiques au client pendant le build
- **vite-plugin-imagemin**: Optimisation et compression des images (WebP, JPEG)

## 🏢 Multi-Tenant Architecture

L'application utilise un système de configuration par client sophistiqué. Chaque client dispose de sa propre configuration, traductions, thème et assets, permettant de servir plusieurs marques avec une seule base de code.

- **Clients**: `chillpaws`, `dipaolo`, `showcase`, `webtrine`
- **Configuration**: Fichiers JSON dans `/config/customer/{CUSTOMER}/`
  - `config.json`: Configuration complète du layout et des templates
  - `style.config.json`: Variables CSS (couleurs, tailles de police, z-index)
- **Traductions**: Fichiers JSON par langue dans `/lang/customer/{CUSTOMER}/`
- **Thèmes**: Styles globaux dans `/src/theme/customer/{CUSTOMER}/`
- **Assets**: Ressources statiques dans `/public/assets/{CUSTOMER}/`
- **Builds**: Sortie par client dans `/build/{CUSTOMER}/`

### Variable d'Environnement

```bash
VITE_CUSTOMER=showcase  # Client cible (par défaut: showcase)
```

### Système de Templates

Le projet utilise un système de templates basé sur JSON permettant de composer dynamiquement les pages :

- **Types de templates**: navbars, footers, banner, cards, description, contact, gallery, etc.
- **Configuration centralisée**: Chaque client a un `config.json` qui définit la structure complète du site
- **Chargement dynamique**: Les templates sont importés dynamiquement selon la configuration

### Structure de Configuration Client

```json
{
  "client": {
    "name": "showcase",
    "fullName": "Showcase Inc",
    "contact": { "email", "phone", "mailTemplate" },
    "socials": { "instagram", "facebook", "linkedin" }
  },
  "layout": {
    "templates": [
      {
        "type": "navbars|footers|banner|cards|...",
        "id": "classicNavbar",
        "datas": { /* Configuration du template */ }
      }
    ]
  }
}
```

# Build and test commands

## 🚀 Development Commands

### Démarrer le Serveur de Développement

```bash
# Démarrer avec le client par défaut (showcase)
pnpm dev

# Démarrer avec un client spécifique
VITE_CUSTOMER=chillpaws pnpm dev
VITE_CUSTOMER=dipaolo pnpm dev
VITE_CUSTOMER=webtrine pnpm dev
```

### Production Build

```bash
# Build pour le client par défaut (showcase)
pnpm build

# Build pour un client spécifique
VITE_CUSTOMER=chillpaws pnpm build
VITE_CUSTOMER=dipaolo pnpm build

# Le script build.sh demande une confirmation avant de procéder
# Il crée le build dans ./build/{CUSTOMER}/
```

### Servir le Build de Production

```bash
# Servir le build avec le client spécifique
VITE_CUSTOMER=showcase pnpm serve

# Le serveur Express (server.js) sert les fichiers statiques du build
pnpm start  # Alternative qui lance server.js directement
```

### Storybook (Design System)

```bash
# Démarrer Storybook en mode développement
pnpm storybook

# Build Storybook pour la production
pnpm build:storybook
```

## 🧪 Testing Commands

### Tests Unitaires & Intégration (Vitest)

```bash
# Lancer les tests en mode watch
pnpm test

# Lancer les tests une seule fois
pnpm test:run

# Lancer avec un client spécifique
VITE_CUSTOMER=chillpaws pnpm test
```

**Configuration de test**: `vitest.component.config.ts` avec jsdom

### Tests E2E (Playwright)

Tests visuels de régression sur tous les clients avec capture de screenshots multi-viewports.

```bash
# Tester un client spécifique
TEST_CUSTOMER=showcase pnpm test:e2e
TEST_CUSTOMER=chillpaws pnpm test:e2e

# Tester tous les clients
pnpm test:e2e:all

# Interface UI pour débugger
pnpm test:e2e:ui

# Générer/mettre à jour les snapshots (après changement visuel)
TEST_CUSTOMER=showcase playwright test --update-snapshots
pnpm test:e2e:all:update  # Tous les clients
```

**Note** : Les snapshots sont ignorés dans Git (développement local uniquement). Voir `docs/VISUAL_TESTING.md` pour plus de détails.

## 🔧 Utility Commands

### Code Quality

```bash
# Linter le code
pnpm lint

# Convertir les images en WebP
pnpm convert:webp
```

# Code style guidelines

## 📝 Linting & Formatting

### ESLint Configuration

- **Config**: Flat config moderne dans `eslint.config.mjs`
- **Extends**: Base config, import sorting, TypeScript, React, Prettier
- **Plugins**: @stylistic, simple-import-sort, react-hooks, jsx-a11y, storybook
- **Structure modulaire**: Configs séparées dans `/config/eslint/`
  - `base.config.mjs`: Règles de base
  - `import.config.mjs`: Tri des imports
  - `configFiles.config.mjs`: Règles pour les fichiers de config

### Prettier Configuration

- **Config**: `prettierrc.json`
- **Règles**: Indentation 2 espaces, single quotes, trailing commas

### StyleLint Configuration

- **Config**: Package.json
- **Scope**: CSS et styled-components

## 🎨 Code Style Rules

### Règles Générales

- Le code doit être implémenté avec un impact minimal et des changements minimaux sur la base de code existante
- **Important**: Ne jamais générer de fichier "README.md" ou autre documentation à moins d'une demande explicite
- Le code doit être implémenté de la manière la plus simple possible, sans sacrifier la clarté ou la fonctionnalité
- Utiliser TypeScript pour les nouveaux composants et utilitaires
- Privilégier les composants fonctionnels avec hooks

### Conventions de Nommage

- **Composants React**: camelCase avec suffixe `.component.{tsx,jsx}`
  - Exemples: `classicNavbar.component.tsx`, `banner.component.tsx`
- **CSS Modules**: camelCase avec suffixe `.module.css`
  - Exemples: `banner.module.css`, `classicNavbar.module.css`
- **Utilitaires**: camelCase avec suffixe `.utils.{ts,js}`
  - Exemples: `customer.utils.js`, `analytics.utils.js`, `scrollToTop.utils.js`
- **Hooks React**: camelCase avec préfixe `use` et suffixe `.{ts,js}`
  - Exemples: `useAnalytics.js`
- **Stories Storybook**: camelCase avec suffixe `.stories.{tsx,jsx}`
  - Exemples: `banner.component.stories.tsx`
- **Styled Components** (legacy): camelCase avec suffixe `.styled.{ts,js}`
  - Exemples: `banner.styled.ts` (à migrer vers CSS Modules)
- **Redux**:
  - Actions: camelCase avec suffixe `.action.ts` (`state.action.ts`)
  - Reducers: camelCase avec suffixe `.reducer.ts` (`state.reducer.ts`)
  - Selectors: camelCase avec suffixe `.selector.ts` (`state.selector.ts`)
- **Types TypeScript**: camelCase avec suffixe `.types.ts`
- **Tests**:
  - Intégration: `.int.{ts,tsx}` dans dossiers `__tests__`
  - Unitaires: `.spec.{ts,tsx}` dans dossiers `__tests__`
- **Configuration**:
  - JSON: `config.json`, `style.config.json`
  - JS/TS: `{name}.config.{js,ts,mjs}`
- **Assets**:
  - Icônes SVG: `.component.tsx` dans `/src/assets/icons/`
  - Images client: dans `/public/assets/{CUSTOMER}/`

### Structure des Imports

Les imports doivent être automatiquement triés par `simple-import-sort` :

1. Imports React
2. Imports externes (node_modules)
3. Imports internes absolus
4. Imports relatifs
5. Imports de types

### Organisation des Composants

**Nouveau pattern (CSS Modules)** :
```
src/design-system/
  ├── components/        # Composants réutilisables
  │   ├── banner/
  │   │   ├── banner.component.tsx
  │   │   ├── banner.module.css
  │   │   ├── banner.types.ts
  │   │   ├── banner.stories.tsx
  │   │   └── __tests__/
  │   │       └── banner.component.spec.tsx
  │   └── ...
  ├── navbars/          # Barres de navigation
  ├── footers/          # Pieds de page
  ├── buttons/          # Boutons réutilisables
  ├── error/            # Pages d'erreur
  └── utils/            # Composants utilitaires (displayers, etc.)
```

**Legacy pattern (Styled Components - à migrer)** :
```
src/design-system/
  ├── components/        # Composants réutilisables
  │   ├── banner/
  │   │   ├── banner.component.tsx
  │   │   ├── banner.styled.ts      ← À remplacer par .module.css
  │   │   └── banner.stories.tsx
  │   └── ...
```

### CSS Modules Best Practices

- **Import** : `import styles from './component.module.css'`
- **Usage** : `<div className={styles.myClass}>`
- **Conditionnels** : Utiliser la librairie `classnames`
  ```tsx
  <div className={classNames(styles.root, {
    [styles.active]: isActive,
    [styles.disabled]: disabled
  })}>
  ```
- **CSS Nesting (OBLIGATOIRE)** : Imbriquer TOUS les sélecteurs dans la classe principale
  ```css
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

  /* ❌ MAUVAIS - Sélecteurs séparés */
  .description { width: 100%; }
  .description a { color: blue; }
  .description a:hover { color: red; }
  ```
- **Variables CSS** : Utiliser les variables de `style.config.json`
  ```css
  .title {
    color: var(--dark-blue);
    font-size: var(--subtitle-font-size);
  }
  ```
- **Custom Media Queries** : Utiliser les breakpoints définis dans `src/custom-media.css`
  ```css
  @media (--bp-min-medium) {
    .container { padding: 2rem; }
  }
  ```
  - `--bp-min-medium` (768px+) - Tablette
  - `--bp-min-large` (1024px+) - Desktop
  - `--bp-min-xlarge` (1440px+) - Large Desktop
  - Documentation complète : `docs/CUSTOM_MEDIA_QUERIES.md`

### Styled Components Best Practices (Legacy)

⚠️ **Pour les composants existants seulement - à migrer progressivement**

- Utiliser les variables CSS définies dans `style.config.json`
- Accéder aux variables via `var(--variable-name)`
- Utiliser les breakpoints définis (`bp.min()`, `bp.max()`)
- Créer des fichiers `.styled.ts` séparés pour les styles

### TypeScript Guidelines

- Typer tous les props des composants
- Utiliser des interfaces pour les objets complexes
- Éviter `any`, préférer `unknown` si nécessaire
- Typer les retours de fonctions explicitement

# Testing instructions

## 🧪 Testing Strategy & Frameworks

### Pyramide de Tests

1. **Tests Unitaires**: Vitest + Testing Library (composants individuels)
2. **Tests d'Intégration**: Vitest + Testing Library (interactions entre modules)
3. **Tests E2E**: Playwright (parcours utilisateur complets)

### Configuration de Test

- **Framework**: Vitest 3.0.9
- **Environment**: jsdom pour simuler le DOM
- **Testing Library**: @testing-library/react + @testing-library/user-event
- **Coverage**: @vitest/coverage-v8

### Tests d'Intégration

**Localisation**: Fichiers `.int.tsx` dans dossiers `__tests__`
**Objectif**: Tester les interactions entre composants et le chargement dynamique

**Exemple**:
```typescript
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock des imports dynamiques
vi.mock('../../../assets/icons/instagram.component.tsx', () => ({
  default: () => <div>Instagram Icon</div>
}));

describe('<FloatingSocials />', () => {
  it('should render social links', () => {
    const socials = { instagram: { link: 'https://instagram.com' } };
    render(<FloatingSocials socials={socials} />);
    expect(screen.getByText('Instagram Icon')).toBeInTheDocument();
  });
});
```

### Best Practices de Test

1. **Mock des imports dynamiques**: Utiliser `vi.mock()` pour les `import.meta.glob`
2. **Tests isolés**: Chaque test doit être indépendant
3. **User-centric**: Tester du point de vue de l'utilisateur
4. **Accessibilité**: Utiliser les queries par rôle ARIA
5. **Async/Await**: Utiliser `waitFor` pour les chargements asynchrones

# Commit guidelines

## 📝 Git Workflow & Commit Standards

### Format des Messages de Commit

Suivre les conventions de commits pour une historique claire :

```
type(scope): description

[corps optionnel]

[footer optionnel]
```

**Types**:
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Modifications de documentation
- `style`: Changements de style de code (formatting, etc.)
- `refactor`: Refactoring de code
- `perf`: Améliorations de performance
- `test`: Ajout ou mise à jour de tests
- `build`: Changements du système de build
- `ci`: Changements de configuration CI
- `chore`: Tâches de maintenance

**Scope (optionnel)**:
- Nom du client: `chillpaws`, `dipaolo`, `showcase`, `webtrine`
- Nom du composant: `navbar`, `footer`, `banner`, `contact`
- Nom du module: `i18n`, `store`, `theme`, `build`

**Exemples**:
```bash
feat(chillpaws): add new banner component with video background
fix(navbar): resolve mobile menu closing issue
docs: update AGENTS.md with testing guidelines
refactor(theme): migrate from JS to TypeScript
perf: optimize image loading with lazy loading
test(banner): add integration tests for responsive behavior
```

# Custom notes

## 🎯 Important Development Context

### Multi-Client Development

- **Client par défaut**: `showcase` si `VITE_CUSTOMER` n'est pas défini
- **Changement de client**: Utiliser le préfixe `VITE_CUSTOMER=` pour toutes les commandes
- **Gestion des assets**: Assets spécifiques au client automatiquement copiés via plugin Vite
- **Configuration**: Chaque client a sa propre structure de config complète
- **Isolation**: Les builds sont complètement isolés par client dans `/build/{CUSTOMER}/`

### Architecture des Templates

Le système de templates est le cœur de l'application :

1. **Chargement de config**: Au démarrage, `index.tsx` charge `config.json` et `style.config.json`
2. **Store Redux**: Config stockée dans Redux pour accès global
3. **Rendering dynamique**: `App.tsx` itère sur les templates et les rend dynamiquement
4. **Types de templates**:
   - `navbars`: Barres de navigation (classicNavbar, etc.)
   - `footers`: Pieds de page (bigLogosFooter, classicFooter)
   - `banner`: Bannières principales
   - `cards`: Listes de cartes
   - `description`: Sections de description
   - `contact`: Formulaires de contact
   - `gallery`: Galeries d'images
   - `legals`: Mentions légales
   - `multiDescriptions`: Descriptions multiples avec navigation

### Système d'Icônes

- **Localisation**: `/src/assets/icons/`
- **Format**: Composants React SVG (`.component.tsx`)
- **Chargement**: Import dynamique via `import.meta.glob`
- **Usage**: Référencé par nom dans les configs (ex: `"logo_chillpaws_color_2"`)

### Internationalisation (i18n)

- **Framework**: i18next avec détection automatique de langue
- **Structure**: `/lang/customer/{CUSTOMER}/{lang}.json`
- **Langues supportées**: fr (défaut), en, et autres selon le client
- **Fallback**: Toujours français (`fr`) par défaut
- **Chargement**: Dynamique selon le client via `resourcesToBackend`

### Responsive Design

- **Breakpoints**: Définis dans `breakpointDef.js` et utilisés via `breakpoint.js`
- **Helper**: `bp.min()` et `bp.max()` pour les media queries
- **Noms**: Basés sur `breakpointNames` (ex: mobile, tablet, desktop)
- **Styled Components**: Intégration native des breakpoints

### Redux Store

**Structure**:
- `state.action.ts`: Actions pour mettre à jour la config
- `state.reducer.ts`: Reducer principal
- `state.selector.ts`: Selectors pour accéder aux données
  - `getClient()`: Infos client
  - `getStyle()`: Variables de style
  - `getTemplates()`: Liste des templates
  - `getRoutes()`: Routes de l'application

### Analytics

- **Google Analytics**: Intégration via `initializeGA()`
- **Google Tag Manager**: Intégration via `initializeGTM()`
- **Hook personnalisé**: `useAnalytics()` pour tracking
- **Configuration**: Tracking ID dans `config.json` du client

### Performance

- **Images**: Conversion automatique en WebP avec compression
- **Code splitting**: Import dynamique des templates
- **Lazy loading**: Chargement différé des composants lourds
- **Build optimisé**: Vite avec minification esbuild
- **Console logs**: Supprimés en production

### Points d'Attention Communs

- **Assets manquants**: Vérifier que tous les assets du client existent avant le build
- **Config JSON**: Valider la structure avant de commit (typage strict)
- **Traductions**: Toutes les clés doivent exister dans toutes les langues
- **Styled Components**: Utiliser les variables CSS définies dans `style.config.json`
- **Import dynamique**: Bien mocker les `import.meta.glob` dans les tests
- **Routes**: Les routes sont générées dynamiquement depuis la config

### Structure du Workspace

```
/
├── config/
│   ├── customer/           # Configurations par client
│   │   ├── chillpaws/
│   │   │   ├── config.json
│   │   │   └── style.config.json
│   │   ├── dipaolo/
│   │   ├── showcase/
│   │   └── webtrine/
│   └── eslint/            # Configs ESLint modulaires
│
├── lang/
│   └── customer/          # Traductions par client
│       ├── chillpaws/
│       │   ├── fr.json
│       │   └── en.json
│       └── ...
│
├── public/
│   ├── assets/            # Assets statiques par client
│   │   ├── chillpaws/
│   │   ├── dipaolo/
│   │   ├── showcase/
│   │   └── webtrine/
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   └── icons/         # Icônes SVG en composants React
│   │
│   ├── design-system/     # Système de design réutilisable
│   │   ├── buttons/
│   │   ├── components/    # Composants réutilisables
│   │   ├── error/
│   │   ├── footers/
│   │   ├── navbars/
│   │   └── utils/
│   │
│   ├── hooks/             # React hooks personnalisés
│   │
│   ├── store/             # Redux store
│   │   ├── index.js
│   │   ├── state.action.ts
│   │   ├── state.reducer.ts
│   │   └── state.selector.ts
│   │
│   ├── theme/             # Thèmes par client
│   │   ├── customer/
│   │   │   ├── chillpaws/
│   │   │   ├── default/
│   │   │   ├── dipaolo/
│   │   │   └── webtrine/
│   │   └── font/
│   │
│   ├── utils/             # Utilitaires
│   │
│   ├── App.tsx            # Composant principal
│   ├── index.tsx          # Point d'entrée
│   ├── customer.utils.js  # Utilitaires client
│   ├── i18n.js            # Configuration i18n
│   └── breakpoint.js      # Helpers responsive
│
├── build/                 # Builds de production par client
│   ├── chillpaws/
│   ├── dipaolo/
│   ├── showcase/
│   └── webtrine/
│
├── scripts/
│   ├── build.sh           # Script de build avec confirmation
│   ├── serve.sh           # Script pour servir un build
│   └── convert-to-webp.js # Conversion d'images
│
├── storybook-static/      # Build Storybook
│
├── server.js              # Serveur Express pour production
├── vite.config.js         # Configuration Vite avec plugins
├── vitest.component.config.ts
├── eslint.config.mjs
└── package.json
```

### Ressources de Documentation

- **Commandes**: Voir section "Build and test commands"
- **Architecture**: Voir section "Multi-Tenant Architecture"
- **Design System**: Documentation Storybook (pnpm storybook)
- **Composants**: Stories dans `/src/design-system/**/**.stories.tsx`

### Workflows Courants

#### Ajouter un Nouveau Client

1. Créer la structure dans `config/customer/{CLIENT}/`
2. Créer les traductions dans `lang/customer/{CLIENT}/`
3. Créer le thème dans `src/theme/customer/{CLIENT}/` (optionnel)
4. Ajouter les assets dans `public/assets/{CLIENT}/`
5. Tester avec `VITE_CUSTOMER={CLIENT} pnpm dev`
6. Builder avec `VITE_CUSTOMER={CLIENT} pnpm build`

#### Ajouter un Nouveau Template

1. Créer le composant dans `src/design-system/{TYPE}/src/{NAME}.component.tsx`
2. Créer les styles dans `{NAME}.styled.ts`
3. Créer la story dans `{NAME}.component.stories.tsx`
4. Ajouter dans la config client `config.json`
5. Tester dans Storybook et en développement

#### Modifier un Style Global

1. Éditer `config/customer/{CLIENT}/style.config.json`
2. Les variables CSS sont automatiquement injectées
3. Utiliser via `var(--nom-variable)` dans styled-components

#### Débugger un Problème de Build

1. Vérifier que `VITE_CUSTOMER` est bien défini
2. Vérifier que tous les assets existent pour le client
3. Vérifier la structure du `config.json`
4. Vérifier les traductions (toutes les clés)
5. Consulter les erreurs dans la console Vite
