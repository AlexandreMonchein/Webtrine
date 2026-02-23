# Guide d'Ajout d'un Nouveau Client

Ce guide détaille comment ajouter un nouveau client dans le système multi-tenant de Webtrine.

## ⚡ Quick Rules for AI

### MUST (Étapes obligatoires)
- ✅ **Créer 4 fichiers de config** : `config.fr.json`, `config.en.json`, `style.config.json`, `variables.css`
- ✅ **Créer traductions** : `fr.json`, `en.json` avec TOUTES les clés identiques
- ✅ **Structure assets** : Dossiers `images/`, `icons/`, `logos/` dans `public/assets/{CLIENT}/`
- ✅ **Nom cohérent** : `client.name` dans config = nom du dossier = `VITE_CUSTOMER`
- ✅ **Format WebP** : Toutes les images en `.webp` (utiliser `pnpm convert:webp`)
- ✅ **Tester dev** : `VITE_CUSTOMER={CLIENT} pnpm dev` avant build

### MUST NOT (Erreurs courantes)
- ❌ **Jamais font-properties dans CSS** : Voir `CSS_MODULES_MIGRATION.md`
- ❌ **Jamais clés de traduction manquantes** : FR et EN doivent avoir les mêmes clés
- ❌ **Jamais assets avec extension dans config.json** : `"logo": "logo_client"` (pas `.webp`)
- ❌ **Jamais builder sans tester dev** : Toujours tester avec `pnpm dev` d'abord
- ❌ **Jamais oublier l'import CSS** : `@import url('../../../custom-media.css');` ligne 1

### PATTERN (Structure minimale)
```
config/customer/{CLIENT}/
  ├── config.fr.json        # Layout + templates
  ├── config.en.json        # Version anglaise
  └── style.config.json     # Variables CSS

lang/customer/{CLIENT}/
  ├── fr.json               # Traductions FR
  └── en.json               # Traductions EN

src/theme/customer/{CLIENT}/
  └── variables.css         # Variables dynamiques

public/assets/{CLIENT}/
  ├── images/
  ├── icons/
  └── logos/
```

**Commandes de base** :
```bash
VITE_CUSTOMER={CLIENT} pnpm dev    # Développement
VITE_CUSTOMER={CLIENT} pnpm build  # Build production
VITE_CUSTOMER={CLIENT} pnpm serve  # Tester build
```

---

## [OVERVIEW] Vue d'ensemble

L'architecture multi-tenant permet de servir plusieurs clients avec une seule base de code. Chaque client dispose de :
- **Configuration** : Layout, templates, contact, réseaux sociaux
- **Traductions** : Fichiers JSON par langue
- **Thème** : Variables CSS
- **Assets** : Images, icônes, logos

## [STRUCTURE] Structure des dossiers

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

## [CONFIG] Configuration

### Fichiers requis

**`config/customer/myclient/config.fr.json`** - Structure du site :

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
      "instagram": { "link": "https://instagram.com/myclient", "title": "Instagram" }
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
          "links": [{ "label": "Accueil", "path": "/" }]
        }
      }
    ]
  },
  "analytics": {
    "googleAnalytics": "G-XXXXXXXXXX"
  }
}
```

**Points clés** :
- `client.name` = nom dossier = `VITE_CUSTOMER`
- `client.logo` sans extension (ex: `"logo_myclient"` → `/assets/myclient/logos/logo_myclient.webp`)
- Templates disponibles : `navbars`, `footers`, `banner`, `cards`, `description`, `contact`, `gallery`, `legals`

**`config/customer/myclient/style.config.json`** - Variables CSS :

```json
{
  "navbar-font-size": "1rem",
  "subtitle-font-size": "1.5rem",
  "z-index-navbars": "1000",
  "theme-color-primary": "#1a1a1a",
  "theme-color-secondary": "#ffffff",
  "theme-color-hover": "#e0e0e0"
}
```

**Variables disponibles** : `*-font-size`, `z-index-*`, `theme-color-*` (primary/secondary/tertiary/quaternary/quinary, utility-1/2/3/4, hover, background-1/2, foreground-1/2/3)

## [TRANSLATIONS] Traductions

**`lang/customer/myclient/fr.json`** :

```json
{
  "nav": { "home": "Accueil", "contact": "Contact" },
  "banner": { "title": "Bienvenue" },
  "footer": { "copyright": "© 2026 My Client Inc" },
  "contact": { "title": "Nous contacter", "send": "Envoyer" },
  "errors": { "404": "Page non trouvée" }
}
```

**`lang/customer/myclient/en.json`** : Même structure, textes traduits

**Important** : Toutes les clés doivent exister dans toutes les langues - FR est fallback par défaut

## [THEME] Thème et styles

**`src/theme/customer/myclient/variables.css`** :

```css
/* MyClient - CSS Variables */
:root {
  /* Typography */
  --navbar-font-size: var(--navbar-font-size-override, 1rem);
  --subtitle-font-size: var(--subtitle-font-size-override, 1.5rem);

  /* Z-index */
  --z-index-navbars: var(--z-index-navbars-override, 1000);

  /* Colors */
  --theme-color-primary: var(--theme-color-primary-override, #000);
  --theme-color-secondary: var(--theme-color-secondary-override, #333);
  --theme-color-hover: var(--theme-color-hover-override, #eee);
}
```

**Note** : Pattern `var(--variable-override, default)` - valeurs de `style.config.json` injectées avec suffixe `-override`

## [ASSETS] Assets

### Structure

```
public/assets/myclient/
├── images/       # Banner, hero, gallery
├── icons/        # Favicon, icônes SVG
└── logos/        # Logo principal et variantes
```

### Règles
- **Format** : WebP recommandé (`pnpm convert:webp`)
- **Nommage** : Minuscules + underscores (`banner_background.webp`)
- **Référence** : Sans extension dans config (`"logo": "logo_myclient"` → `/assets/myclient/logos/logo_myclient.webp`)
- **Icônes réutilisables** : SVG dans `src/assets/icons/`

## [TESTING] Tests et build

```bash
# Développement
VITE_CUSTOMER=myclient pnpm dev

# Tests
VITE_CUSTOMER=myclient pnpm test
pnpm lint

# Build
VITE_CUSTOMER=myclient pnpm build
VITE_CUSTOMER=myclient pnpm serve  # Tester build localement

# Storybook
VITE_CUSTOMER=myclient pnpm storybook
```

## [CHECKLIST] Checklist complète

### Configuration
- [ ] `config.fr.json`, `config.en.json`, `style.config.json` créés
- [ ] `client.name` = nom dossier = `VITE_CUSTOMER`
- [ ] `client.logo` défini (sans extension)
- [ ] Templates configurés (`navbars`, `footers`, `banner`, etc.)
- [ ] Analytics configuré (GA, GTM)

### Traductions
- [ ] `fr.json` et `en.json` créés
- [ ] Toutes les clés identiques dans les 2 fichiers
- [ ] Changement de langue testé

### Thème
- [ ] `variables.css` créé avec pattern `var(--*-override, default)`
- [ ] Variables CSS testées

### Assets
- [ ] Dossiers `images/`, `icons/`, `logos/` créés
- [ ] Images converties en WebP (`pnpm convert:webp`)
- [ ] Nommage correct (minuscules + underscores)
- [ ] Assets référencés sans extension dans config

### Tests
- [ ] Dev : `VITE_CUSTOMER=myclient pnpm dev` ✅
- [ ] Navigation, images, langues testés
- [ ] Responsive testé (mobile/tablette/desktop)
- [ ] Tests : `VITE_CUSTOMER=myclient pnpm test` ✅
- [ ] Lint : `pnpm lint` ✅

### Build
- [ ] `VITE_CUSTOMER=myclient pnpm build` ✅
- [ ] Build local testé avec `pnpm serve`
- [ ] Pas d'erreurs console

## [RESOURCES] Ressources

**Documentation** :
- `AGENTS.md` - Architecture projet
- `docs/COMPONENT_CREATION_GUIDE.md` - Guide composants
- `docs/CSS_MODULES_MIGRATION.md` - Migration CSS
- `docs/CUSTOM_MEDIA_QUERIES.md` - Breakpoints

**Templates disponibles** : `navbars`, `footers`, `banner`, `cards`, `description`, `contact`, `gallery`, `legals`, `multiDescriptions`

**Commandes** :
```bash
VITE_CUSTOMER={CLIENT} pnpm dev      # Dev
VITE_CUSTOMER={CLIENT} pnpm build    # Build
pnpm lint                            # Lint
pnpm convert:webp                    # Convertir images
```

## [TROUBLESHOOTING] Troubleshooting

### Config not found
Vérifier `config/customer/{CLIENT}/config.{lang}.json` existe - fallback vers `config.fr.json`

### Assets not found
Vérifier chemin `/assets/{CLIENT}/` et nom sans extension dans config.json

### Translation key not found
Ajouter clé dans `fr.json` ET `en.json` - redémarrer serveur

### Variables CSS not applied
Vérifier `variables.css`, `style.config.json`, noms variables `-override`

### Build error
`pnpm lint` pour erreurs, vérifier syntaxe JSON, assets existent

---

**Bonne création de client ! 🎨✨**
