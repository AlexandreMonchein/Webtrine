# ClassicNavbar

Navbar classique avec navigation horizontale, menu burger responsive, et options de configuration avancées.

## Description

Le composant `ClassicNavbar` est une barre de navigation complète et responsive qui s'adapte à tous les écrans. Il offre une navigation horizontale sur desktop avec des sous-menus déroulants, et un menu burger coulissant sur mobile.

### Fonctionnalités principales

- **Navigation responsive** : Menu horizontal sur desktop, sidebar coulissante sur mobile
- **Sous-catégories** : Support des menus déroulants à plusieurs niveaux
- **Position fixe** : Option pour fixer la navbar en haut de l'écran
- **Masquage au scroll** : Option pour masquer la navbar lors du scroll vers le bas
- **Traduction** : Switcher de langue intégré (FR/EN)
- **Mode sombre** : Toggle pour basculer entre mode clair et sombre
- **Réseaux sociaux** : Affichage optionnel des liens vers les réseaux sociaux
- **Calendly** : Intégration optionnelle d'un bouton de planification
- **Bouton d'action** : Bouton CTA personnalisable
- **Focus trap** : Gestion du focus pour l'accessibilité du menu mobile

## Implémentation JSON

### Configuration de base

```json
{
  "type": "navbars",
  "id": "classicNavbar",
  "datas": {
    "features": {
      "isFixed": false,
      "hasHideOnScroll": false,
      "trad": false,
      "darkMode": false,
      "shouldDisplaySocials": true
    },
    "categories": [
      {
        "name": "Accueil",
        "link": "/"
      },
      {
        "name": "Services",
        "link": "/services"
      },
      {
        "name": "À propos",
        "link": "/about"
      },
      {
        "name": "Contact",
        "link": "/contact"
      }
    ],
    "content": {
      "logo": {
        "name": "logo_client",
        "shape": "horizontal"
      }
    }
  }
}
```

### Avec sous-catégories

```json
{
  "type": "navbars",
  "id": "classicNavbar",
  "datas": {
    "features": {
      "isFixed": false,
      "hasHideOnScroll": false,
      "trad": false,
      "darkMode": false,
      "shouldDisplaySocials": true
    },
    "categories": [
      {
        "name": "Accueil",
        "link": "/"
      },
      {
        "name": "Services",
        "sub": [
          {
            "name": "Développement web",
            "link": "/services/web"
          },
          {
            "name": "Design graphique",
            "link": "/services/design"
          },
          {
            "name": "Marketing digital",
            "link": "/services/marketing"
          }
        ]
      },
      {
        "name": "Portfolio",
        "link": "/portfolio"
      },
      {
        "name": "Contact",
        "link": "/contact"
      }
    ],
    "content": {
      "logo": {
        "name": "logo_client",
        "shape": "horizontal"
      }
    }
  }
}
```

### Configuration avancée

```json
{
  "type": "navbars",
  "id": "classicNavbar",
  "datas": {
    "features": {
      "isFixed": true,
      "hasHideOnScroll": true,
      "trad": true,
      "darkMode": true,
      "shouldDisplaySocials": true
    },
    "categories": [
      {
        "name": "Accueil",
        "link": "/"
      },
      {
        "name": "Services",
        "sub": [
          {
            "name": "Développement web",
            "link": "/services/web"
          },
          {
            "name": "Design",
            "link": "/services/design"
          }
        ]
      },
      {
        "name": "Contact",
        "link": "/contact"
      }
    ],
    "content": {
      "logo": {
        "name": "logo_client",
        "shape": "horizontal"
      },
      "calendly": {
        "url": "https://calendly.com/votre-compte"
      }
    },
    "actionButton": {
      "type": "call",
      "displayedText": "Nous contacter",
      "hiddenText": "+33 1 23 45 67 89"
    }
  }
}
```

## Props

### `features`

Configuration des fonctionnalités de la navbar.

- `isFixed` (boolean) : Si `true`, la navbar reste fixée en haut de l'écran lors du scroll
- `hasHideOnScroll` (boolean) : Si `true`, la navbar se masque lors du scroll vers le bas et réapparaît lors du scroll vers le haut
- `trad` (boolean) : Active le switcher de langue (FR/EN)
- `darkMode` (boolean) : Active le toggle du mode sombre
- `shouldDisplaySocials` (boolean, optionnel) : Affiche les liens vers les réseaux sociaux (défaut: `true`)

### `categories`

Liste des catégories de navigation. Chaque catégorie peut avoir :

- `name` (string) : Nom affiché de la catégorie
- `link` (string, optionnel) : URL de destination
- `sub` (array, optionnel) : Tableau de sous-catégories avec les mêmes propriétés `name` et `link`

### `content`

Configuration du contenu de la navbar.

- `logo` (object) :
  - `name` (string) : Nom du fichier logo (sans extension)
  - `shape` (string, optionnel) : Forme du logo pour le calcul des dimensions (`"square"`, `"horizontal"`, `"vertical"`)
- `calendly` (object, optionnel) :
  - `url` (string | null) : URL de planification Calendly

### `actionButton` (optionnel)

Configuration d'un bouton d'action CTA.

- `type` (string) : Type de bouton (actuellement seul `"call"` est supporté)
- `displayedText` (string) : Texte affiché sur le bouton
- `hiddenText` (string) : Texte caché révélé au clic (ex: numéro de téléphone)

### `toggleTheme` (optionnel)

Fonction callback appelée pour basculer entre les modes clair et sombre.

### `theme` (optionnel)

Thème actuel de l'application (`"light"` ou `"dark"`).

## Variables CSS utilisées

Le composant utilise les variables CSS suivantes définies dans `style.config.json` :

- `--theme-color-primary` : Couleur principale du texte
- `--theme-color-secondary` : Couleur de fond de la navbar
- `--theme-color-tertiary` : Couleur tertiaire du texte
- `--theme-color-hover` : Couleur au survol
- `--color-secondary` : Couleur de fond des sous-menus
- `--z-index-navbars` : Z-index de la navbar et du menu mobile

## Breakpoints

Le composant utilise les breakpoints définis dans `custom-media.css` :

- **Mobile** : Menu burger visible, navigation horizontale masquée
- **Tablet (768px+)** : Navigation horizontale visible, menu burger masqué
- **Desktop (1024px+)** : Navigation complète avec sous-menus déroulants

## Accessibilité

- **Focus trap** : Le menu mobile capture le focus pour améliorer la navigation au clavier
- **ARIA labels** : Boutons burger avec labels descriptifs
- **TabIndex** : Gestion dynamique du tabIndex selon l'état ouvert/fermé du menu mobile
- **Navigation au clavier** : Support complet de la navigation au clavier

## Notes d'implémentation

- Le logo doit être placé dans `/public/assets/{CLIENT}/icons/` au format WebP
- Les icônes des réseaux sociaux sont chargées dynamiquement depuis Redux
- Le composant nécessite Redux pour accéder aux données client et aux réseaux sociaux
- Le composant nécessite React Router pour la navigation
- Les sous-menus s'affichent au survol sur desktop
- Le menu mobile se ferme automatiquement lors d'un clic en dehors
- Le scroll est détecté pour masquer/afficher la navbar si `hasHideOnScroll` est activé
