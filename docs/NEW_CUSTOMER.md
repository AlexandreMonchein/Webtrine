# Guide d'Ajout d'un Nouveau Client

Ce guide détaille comment ajouter un nouveau client dans le système multi-tenant de Webtrine.

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Structure des dossiers](#structure-des-dossiers)
3. [Configuration](#configuration)
4. [Traductions](#traductions)
5. [Thème et styles](#thème-et-styles)
6. [Assets](#assets)
7. [Tests et build](#tests-et-build)
8. [Checklist complète](#checklist-complète)

## Vue d'ensemble

L'architecture multi-tenant permet de servir plusieurs clients avec une seule base de code. Chaque client dispose de :
- **Configuration** : Layout, templates, contact, réseaux sociaux
- **Traductions** : Fichiers JSON par langue
- **Thème** : Variables CSS pour les couleurs, typographie, z-index
- **Assets** : Images, icônes, logos spécifiques

## Structure des dossiers

Pour un nouveau client nommé `myclient`, vous devez créer la structure suivante :

```
Webtrine/
├── config/
│   └── customer/
│       └── myclient/
│           ├── config.fr.json
│           ├── config.en.json
│           └── style.config.json
│
├── lang/
│   └── customer/
│       └── myclient/
│           ├── fr.json
│           └── en.json
│
├── src/
│   └── theme/
│       └── customer/
│           └── myclient/
│               └── variables.css
│
└── public/
    └── assets/
        └── myclient/
            ├── images/
            ├── icons/
            └── logos/
```

## Configuration

### 1. Créer les fichiers de configuration

#### `config/customer/myclient/config.fr.json`

Ce fichier définit toute la structure du site :

```json
{
  "client": {
    "name": "myclient",
    "fullName": "My Client Inc",
    "contact": {
      "email": "contact@myclient.com",
      "phone": "+33 1 23 45 67 89",
      "mailTemplate": "template_xxxxx"
    },
    "socials": {
      "instagram": {
        "link": "https://instagram.com/myclient",
        "title": "Instagram"
      },
      "facebook": {
        "link": "https://facebook.com/myclient",
        "title": "Facebook"
      },
      "linkedin": {
        "link": "https://linkedin.com/company/myclient",
        "title": "LinkedIn"
      }
    },
    "logo": "logo_myclient"
  },
  "layout": {
    "templates": [
      {
        "type": "navbars",
        "id": "classicNavbar",
        "datas": {
          "logo": "logo_myclient",
          "links": [
            { "label": "Accueil", "path": "/" },
            { "label": "Présentation", "path": "/presentation" },
            { "label": "Contact", "path": "/contact" }
          ]
        }
      },
      {
        "type": "banner",
        "id": "mainBanner",
        "datas": {
          "title": "Bienvenue chez My Client",
          "subtitle": "Votre partenaire de confiance",
          "backgroundImage": "banner_background"
        }
      },
      {
        "type": "footers",
        "id": "classicFooter",
        "datas": {
          "logo": "logo_myclient",
          "description": "My Client Inc - Tous droits réservés",
          "links": [
            { "label": "Mentions légales", "path": "/mentions-legals" },
            { "label": "Confidentialité", "path": "/confidentialite" },
            { "label": "CGU/CGV", "path": "/cgu-cgv" }
          ]
        }
      }
    ]
  },
  "analytics": {
    "googleAnalytics": "G-XXXXXXXXXX",
    "googleTagManager": "GTM-XXXXXXX"
  }
}
```

**Points importants** :
- `client.name` : Doit correspondre au nom du dossier et à `VITE_CUSTOMER`
- `client.logo` : Nom du fichier logo (sans extension) dans `/public/assets/myclient/logos/`
- `layout.templates` : Array de tous les templates de la page
- Types de templates disponibles : `navbars`, `footers`, `banner`, `cards`, `description`, `contact`, `gallery`, `legals`, `multiDescriptions`

#### `config/customer/myclient/config.en.json`

Version anglaise de la configuration (même structure, textes traduits).

#### `config/customer/myclient/style.config.json`

Variables CSS injectées dynamiquement :

```json
{
  "navbar-font-size": "1rem",
  "subtitle-font-size": "1.5rem",
  "text-font-size": "1rem",
  "description-font-size": "0.875rem",

  "z-index-navbars": "1000",
  "z-index-text": "100",
  "z-index-backgrounds": "1",

  "theme-color-primary": "#1a1a1a",
  "theme-color-secondary": "#ffffff",
  "theme-color-tertiary": "#f5f5f5",
  "theme-color-quaternary": "#666666",
  "theme-color-quinary": "#cccccc",

  "theme-color-utility-1": "#ff4444",
  "theme-color-utility-2": "#44ff44",
  "theme-color-utility-3": "#ff8800",
  "theme-color-utility-4": "#4488ff",

  "theme-color-hover": "#e0e0e0",
  "theme-color-background-1": "#ffffff",
  "theme-color-background-2": "#f9f9f9",
  "theme-color-foreground-1": "#ffffff",
  "theme-color-foreground-2": "#000000",
  "theme-color-foreground-3": "#e0e0e0"
}
```

**Variables disponibles** :

**Typographie** :
- `navbar-font-size`
- `subtitle-font-size`
- `text-font-size`
- `description-font-size`

**Z-index** :
- `z-index-navbars`
- `z-index-text`
- `z-index-backgrounds`

**Couleurs de marque** :
- `theme-color-primary` : Couleur principale
- `theme-color-secondary` : Couleur secondaire
- `theme-color-tertiary` : Couleur tertiaire
- `theme-color-quaternary` : Couleur quaternaire
- `theme-color-quinary` : Couleur quinaire

**Couleurs utilitaires** :
- `theme-color-utility-1` : Rouge (erreur)
- `theme-color-utility-2` : Vert (succès)
- `theme-color-utility-3` : Orange (warning)
- `theme-color-utility-4` : Bleu (info)

**Couleurs étendues** :
- `theme-color-hover` : État hover
- `theme-color-background-1` : Fond principal
- `theme-color-background-2` : Fond secondaire
- `theme-color-foreground-1` : Premier plan (blanc par défaut)
- `theme-color-foreground-2` : Premier plan alternatif (noir par défaut)
- `theme-color-foreground-3` : Premier plan tertiaire (couleur hover par défaut)

## Traductions

### `lang/customer/myclient/fr.json`

Fichier de traductions françaises :

```json
{
  "nav": {
    "home": "Accueil",
    "presentation": "Présentation",
    "contact": "Contact"
  },
  "banner": {
    "title": "Bienvenue",
    "subtitle": "Votre partenaire de confiance"
  },
  "footer": {
    "copyright": "© 2026 My Client Inc - Tous droits réservés"
  },
  "contact": {
    "title": "Nous contacter",
    "email": "Email",
    "phone": "Téléphone",
    "message": "Message",
    "send": "Envoyer"
  },
  "errors": {
    "404": "Page non trouvée",
    "500": "Erreur serveur"
  }
}
```

### `lang/customer/myclient/en.json`

Version anglaise (même structure, clés traduites).

**Important** :
- Toutes les clés doivent exister dans toutes les langues
- Le français (`fr`) est la langue par défaut (fallback)
- Utiliser `useTranslation()` dans les composants pour accéder aux traductions

## Thème et styles

### `src/theme/customer/myclient/variables.css`

Fichier CSS pour les variables dynamiques :

```css
/* MyClient - CSS Variables Injection */

:root {
  /* ============================================
     TYPOGRAPHY
     ============================================ */
  --navbar-font-size: var(--navbar-font-size-override, 1rem);
  --subtitle-font-size: var(--subtitle-font-size-override, 1.5rem);
  --text-font-size: var(--text-font-size-override, 1rem);
  --description-font-size: var(--description-font-size-override, 0.875rem);

  /* ============================================
     Z-INDEX
     ============================================ */
  --z-index-navbars: var(--z-index-navbars-override, 1000);
  --z-index-text: var(--z-index-text-override, 100);
  --z-index-backgrounds: var(--z-index-backgrounds-override, 1);

  /* ============================================
     BRAND PALETTE
     ============================================ */
  --theme-color-primary: var(--theme-color-primary-override, #000);
  --theme-color-secondary: var(--theme-color-secondary-override, #333);
  --theme-color-tertiary: var(--theme-color-tertiary-override, #666);
  --theme-color-quaternary: var(--theme-color-quaternary-override, #999);
  --theme-color-quinary: var(--theme-color-quinary-override, #ccc);

  /* ============================================
     UTILITY COLORS
     ============================================ */
  --theme-color-utility-1: var(--theme-color-utility-1-override, #ff0000);
  --theme-color-utility-2: var(--theme-color-utility-2-override, #00ff00);
  --theme-color-utility-3: var(--theme-color-utility-3-override, #ff8800);
  --theme-color-utility-4: var(--theme-color-utility-4-override, #0088ff);

  /* ============================================
     EXTENDED PALETTE
     ============================================ */
  --theme-color-hover: var(--theme-color-hover-override, #eee);
  --theme-color-background-1: var(--theme-color-background-1-override, #fff);
  --theme-color-background-2: var(--theme-color-background-2-override, #f5f5f5);
}
```

**Note** : Ce fichier utilise des valeurs par défaut avec le pattern `var(--variable-override, default)`. Les valeurs de `style.config.json` seront injectées dynamiquement avec le suffixe `-override`.

## Assets

### Structure des assets

```
public/assets/myclient/
├── images/
│   ├── banner_background.webp
│   ├── hero_image.webp
│   └── gallery/
│       ├── image1.webp
│       ├── image2.webp
│       └── ...
├── icons/
│   ├── logo_myclient.webp
│   ├── favicon.webp
│   └── social/
│       ├── instagram.svg
│       ├── facebook.svg
│       └── linkedin.svg
└── logos/
    ├── logo_myclient.webp
    ├── logo_myclient_color.webp
    └── logo_myclient_white.webp
```

### Format des images

- **Format recommandé** : WebP (compression optimale)
- **Icônes SVG** : Pour les icônes réutilisables dans `src/assets/icons/`
- **Favicon** : Format WebP ou ICO, nom basé sur `client.logo`

### Conversion des images en WebP

```bash
# Utiliser le script de conversion
pnpm convert:webp
```

### Nommage des assets

**Convention** :
- Minuscules avec underscores : `banner_background.webp`
- Préfixer avec le type : `logo_myclient.webp`, `icon_service.webp`
- Grouper par dossiers : `images/`, `icons/`, `logos/`

**Référencement** :
- Dans `config.json` : Utiliser le nom sans extension ni chemin
- Exemple : `"logo": "logo_myclient"` → `/assets/myclient/logos/logo_myclient.webp`

## Tests et build

### 1. Développement

Démarrer le serveur de développement pour le nouveau client :

```bash
VITE_CUSTOMER=myclient pnpm dev
```

Le site sera accessible sur `http://localhost:5173`

### 2. Tests

Lancer les tests pour vérifier que tout fonctionne :

```bash
# Tests unitaires et d'intégration
VITE_CUSTOMER=myclient pnpm test

# Linter
pnpm lint
```

### 3. Build de production

Builder le site pour le nouveau client :

```bash
VITE_CUSTOMER=myclient pnpm build
```

Le build sera créé dans `./build/myclient/`

### 4. Servir le build localement

Tester le build de production localement :

```bash
VITE_CUSTOMER=myclient pnpm serve
```

### 5. Storybook

Vérifier les composants dans Storybook :

```bash
VITE_CUSTOMER=myclient pnpm storybook
```

## Checklist complète

### Configuration ✅

- [ ] Créer `config/customer/myclient/config.fr.json`
- [ ] Créer `config/customer/myclient/config.en.json` (et autres langues si nécessaire)
- [ ] Créer `config/customer/myclient/style.config.json`
- [ ] Vérifier la structure JSON (pas d'erreurs de syntaxe)
- [ ] Définir tous les templates nécessaires dans `layout.templates`
- [ ] Configurer `client.name`, `client.fullName`, `client.contact`
- [ ] Configurer `client.socials` (Instagram, Facebook, LinkedIn, etc.)
- [ ] Définir `client.logo` (nom du fichier logo)
- [ ] Configurer `analytics.googleAnalytics` et `analytics.googleTagManager` (si applicable)

### Traductions ✅

- [ ] Créer `lang/customer/myclient/fr.json`
- [ ] Créer `lang/customer/myclient/en.json`
- [ ] Vérifier que toutes les clés existent dans toutes les langues
- [ ] Traduire tous les textes (nav, banner, footer, contact, errors, etc.)
- [ ] Tester le changement de langue dans l'application

### Thème ✅

- [ ] Créer `src/theme/customer/myclient/variables.css`
- [ ] Définir toutes les variables CSS (typography, z-index, colors)
- [ ] Tester les variables dans les composants
- [ ] Vérifier les couleurs en mode clair/sombre (si applicable)

### Assets ✅

- [ ] Créer `public/assets/myclient/images/`
- [ ] Créer `public/assets/myclient/icons/`
- [ ] Créer `public/assets/myclient/logos/`
- [ ] Ajouter toutes les images nécessaires (banner, hero, gallery, etc.)
- [ ] Ajouter le logo principal (format WebP)
- [ ] Ajouter le favicon
- [ ] Convertir toutes les images en WebP (`pnpm convert:webp`)
- [ ] Optimiser la taille des images (compression)
- [ ] Vérifier le nommage (minuscules, underscores)

### Tests ✅

- [ ] Démarrer en mode dev : `VITE_CUSTOMER=myclient pnpm dev`
- [ ] Vérifier que toutes les pages se chargent correctement
- [ ] Tester la navigation (navbar, footer, links)
- [ ] Tester le changement de langue
- [ ] Vérifier que les images s'affichent
- [ ] Tester le formulaire de contact (si applicable)
- [ ] Vérifier les réseaux sociaux (liens corrects)
- [ ] Tester sur mobile, tablette, desktop (responsive)
- [ ] Vérifier l'accessibilité (keyboard, screen readers)
- [ ] Lancer les tests : `VITE_CUSTOMER=myclient pnpm test`
- [ ] Corriger les erreurs ESLint : `pnpm lint`

### Build ✅

- [ ] Builder le site : `VITE_CUSTOMER=myclient pnpm build`
- [ ] Vérifier qu'il n'y a pas d'erreurs de build
- [ ] Vérifier la taille du bundle (acceptable ?)
- [ ] Servir localement : `VITE_CUSTOMER=myclient pnpm serve`
- [ ] Tester le build en production (même tests que dev)
- [ ] Vérifier les logs de la console (pas d'erreurs)

### Documentation ✅

- [ ] Documenter les spécificités du client (si nécessaire)
- [ ] Ajouter des notes sur les templates personnalisés
- [ ] Documenter les choix de design/UX
- [ ] Mettre à jour `README.md` si nécessaire

### Déploiement ✅

- [ ] Préparer l'environnement de production
- [ ] Configurer les variables d'environnement
- [ ] Déployer le build sur le serveur
- [ ] Configurer le domaine (DNS, SSL)
- [ ] Tester en production
- [ ] Monitorer les erreurs (Sentry, etc.)

## Ressources

### Documentation

- **Architecture** : `AGENTS.md` - Vue d'ensemble du projet
- **CSS Modules** : `docs/CSS_MODULES_MIGRATION.md` - Guide de migration
- **Custom Media Queries** : `docs/CUSTOM_MEDIA_QUERIES.md` - Breakpoints responsive
- **Création de composants** : `docs/COMPONENT_CREATION_GUIDE.md` - Guide DS

### Templates disponibles

- **navbars** : `classicNavbar`, etc.
- **footers** : `classicFooter`, `bigLogosFooter`, etc.
- **banner** : Bannières principales
- **cards** : Listes de cartes
- **description** : Sections de description
- **contact** : Formulaires de contact
- **gallery** : Galeries d'images
- **legals** : Mentions légales, CGU/CGV, confidentialité
- **multiDescriptions** : Pages avec navigation entre descriptions
Il y en a plus dans le design system, n'hésitez pas à explorer et réutiliser !

### Commandes utiles

```bash
# Développement
VITE_CUSTOMER=myclient pnpm dev

# Tests
VITE_CUSTOMER=myclient pnpm test
pnpm lint

# Build
VITE_CUSTOMER=myclient pnpm build
VITE_CUSTOMER=myclient pnpm serve

# Storybook
pnpm storybook
pnpm build:storybook

# Utilitaires
pnpm convert:webp
```

## Troubleshooting

### Erreur : Config not found

**Problème** : Le fichier `config.{lang}.json` n'existe pas.

**Solution** :
1. Vérifier que le fichier existe dans `config/customer/myclient/`
2. Vérifier le nommage : `config.fr.json`, `config.en.json`
3. Fallback automatique vers `config.fr.json` si la langue n'existe pas

### Erreur : Assets not found

**Problème** : Les images ne s'affichent pas.

**Solution** :
1. Vérifier le chemin : `/assets/myclient/images/image_name.webp`
2. Vérifier le nommage dans `config.json` (sans extension)
3. Vérifier que l'image existe dans `public/assets/myclient/`

### Erreur : Translation key not found

**Problème** : Clé de traduction manquante.

**Solution** :
1. Ajouter la clé dans `lang/customer/myclient/fr.json`
2. Ajouter la même clé dans `lang/customer/myclient/en.json`
3. Redémarrer le serveur de développement

### Erreur : Variables CSS not applied

**Problème** : Les variables CSS ne sont pas appliquées.

**Solution** :
1. Vérifier que `variables.css` existe dans `src/theme/customer/myclient/`
2. Vérifier que `style.config.json` contient toutes les variables
3. Vérifier la console pour les erreurs de chargement
4. Vérifier que les noms de variables correspondent (avec et sans `-override`)

### Build error

**Problème** : Le build échoue.

**Solution** :
1. Lancer `pnpm lint` pour détecter les erreurs
2. Vérifier la syntaxe JSON des fichiers de config
3. Vérifier que tous les assets référencés existent
4. Vérifier les logs de build pour plus de détails

---

**Bonne création de client ! 🎨✨**
