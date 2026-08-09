# ClearGlassNavbar

Navbar minimaliste à fond transparent ("effet verre"), avec un menu burger qui ouvre un panneau plein écran en glissant depuis la droite.

## Description

Le composant `ClearGlassNavbar` est une barre de navigation épurée : seuls le logo et un bouton burger sont visibles en permanence, toute la navigation étant regroupée dans un panneau plein écran.

### Fonctionnalités principales

- **Fond transparent** : la navbar se superpose au contenu de la page sans arrière-plan opaque
- **Menu plein écran** : le clic sur le burger ouvre un panneau qui glisse depuis la droite, avec fond semi-transparent
- **Sélecteur de langue** : boutons FR/EN avec drapeaux, intégrés dans le panneau
- **Détection du lien actif** : le lien correspondant à la page courante est mis en évidence
- **Fermeture automatique** : clic sur un lien, clic en dehors du panneau, ou touche Échap (via le focus trap)

## Implémentation JSON

### Configuration de base

```json
{
  "type": "navbars",
  "id": "clearGlassNavbar",
  "datas": {
    "logo": "logo_client",
    "shape": "horizontal-wide",
    "features": {
      "hideOnScroll": true
    },
    "links": [
      {
        "label": "Accueil",
        "path": "/"
      },
      {
        "label": "Services",
        "path": "/services"
      },
      {
        "label": "À propos",
        "path": "/about"
      },
      {
        "label": "Contact",
        "path": "/contact"
      }
    ]
  }
}
```

### Sans bloc `features`

```json
{
  "type": "navbars",
  "id": "clearGlassNavbar",
  "datas": {
    "logo": "logo_client",
    "shape": "horizontal-wide",
    "links": [
      {
        "label": "Accueil",
        "path": "/"
      },
      {
        "label": "Réserver",
        "path": "/contact"
      },
      {
        "label": "FAQ",
        "path": "/faq"
      }
    ]
  }
}
```

### Logo carré

```json
{
  "type": "navbars",
  "id": "clearGlassNavbar",
  "datas": {
    "logo": "logo_client_square",
    "shape": "square",
    "links": [
      {
        "label": "Accueil",
        "path": "/"
      },
      {
        "label": "Portfolio",
        "path": "/portfolio"
      },
      {
        "label": "Contact",
        "path": "/contact"
      }
    ]
  }
}
```

## Props

### `logo` (string, requis)

Nom du fichier logo, sans extension. L'image doit exister dans `assets/{CLIENT}/icons/{logo}.webp`.

### `shape` (string, optionnel, défaut `"horizontal-wide"`)

Forme du logo utilisée pour calculer ses dimensions d'affichage (`"vertical"`, `"horizontal"`, `"horizontal-large"`, `"horizontal-wide"`, `"square"`, `"large-square"`, `"xlarge-square"`, `"auto"`).

### `links` (array, requis)

Liste des liens du menu. Chaque lien :

- `label` (string) : texte affiché
- `path` (string) : route de destination (React Router)

### `activePath` (string, optionnel)

Force le lien considéré comme actif ; par défaut, déduit automatiquement de la route courante.

### `features` (objet, optionnel)

- `hideOnScroll` (boolean) : présent dans les configurations clients réelles mais **non lu** par le composant actuellement (voir Notes).

## Notes d'implémentation

- Le logo est chargé depuis `assets/{CLIENT}/icons/{logo}.webp` (nom du client résolu via Redux), et non depuis `/src/assets/icons/` comme les icônes génériques.
- `features.hideOnScroll` est déclaré dans les types (`clearGlassNavbar.types.ts`) et présent dans les configurations clients réelles (ex. `apt235`), mais le composant ne déstructure pas `features` et n'implémente donc aucun masquage au scroll pour l'instant.
- Le composant nécessite Redux (nom du client) et React Router (liens et détection de route active).
- Le panneau de menu utilise un `FocusTrapProvider` : le focus clavier reste piégé dans le panneau tant qu'il est ouvert.
