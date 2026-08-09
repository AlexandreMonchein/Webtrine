# ModernNavbar

Navbar moderne avec navigation horizontale, sous-menus au survol sur desktop, et menu plein écran coulissant sur mobile.

## Description

Le composant `ModernNavbar` propose une navigation desktop classique (liens horizontaux avec sous-menus qui s'ouvrent au survol) couplée à un menu mobile plein écran avec accordéon pour les sous-catégories.

### Fonctionnalités principales

- **Sous-menus au survol** : ouverture/fermeture avec un léger délai pour éviter les fermetures accidentelles
- **Menu mobile en accordéon** : chaque catégorie avec sous-éléments se déplie indépendamment
- **Fermeture automatique** : clic en dehors du menu mobile ou touche Échap
- **Verrouillage du scroll** : le défilement de la page est bloqué tant que le menu mobile est ouvert

> Ce composant n'est utilisé par aucune configuration client à ce jour ; il est proposé comme option pour de futurs sites.

## Implémentation JSON

### Configuration de base (sans sous-menus)

```json
{
  "type": "navbars",
  "id": "modernNavbar",
  "datas": {
    "logo": {
      "name": "logo_client",
      "alt": "Logo de l'entreprise"
    },
    "navigationItems": [
      {
        "label": "Accueil",
        "href": "/"
      },
      {
        "label": "Services",
        "href": "/services"
      },
      {
        "label": "À propos",
        "href": "/about"
      },
      {
        "label": "Contact",
        "href": "/contact"
      }
    ]
  }
}
```

### Avec sous-menus

```json
{
  "type": "navbars",
  "id": "modernNavbar",
  "datas": {
    "logo": {
      "name": "logo_client",
      "alt": "Logo de l'entreprise"
    },
    "navigationItems": [
      {
        "label": "Accueil",
        "href": "/"
      },
      {
        "label": "Services",
        "subItems": [
          {
            "label": "Développement web",
            "href": "/services/web",
            "description": "Sites vitrines et applications sur mesure"
          },
          {
            "label": "Design graphique",
            "href": "/services/design",
            "description": "Identité visuelle et supports de communication"
          }
        ]
      },
      {
        "label": "Portfolio",
        "href": "/portfolio"
      },
      {
        "label": "Contact",
        "href": "/contact"
      }
    ]
  }
}
```

## Props

### `logo` (objet, requis)

- `name` (string) : nom du fichier logo, sans extension. L'image doit exister dans `assets/{CLIENT}/icons/{name}.webp`
- `alt` (string) : texte alternatif de l'image

### `navigationItems` (array, requis)

Liste des éléments de navigation. Chaque élément :

- `label` (string) : texte affiché
- `href` (string, optionnel) : route de destination ; si absent et que `subItems` est présent, l'élément agit comme un simple déclencheur de sous-menu
- `subItems` (array, optionnel) : sous-éléments, chacun avec :
  - `label` (string)
  - `href` (string)
  - `description` (string, optionnel) : courte description affichée sous le libellé dans le sous-menu desktop

## Notes d'implémentation

- Le logo est chargé depuis `assets/{CLIENT}/icons/{name}.webp` (nom du client résolu via Redux), et non depuis `/src/assets/icons/`.
- Contrairement à `ClassicNavbar` et `ClearGlassNavbar`, ce composant ne propose ni option `isFixed`/position fixe, ni sélecteur de langue, ni bouton d'action CTA, ni bloc `features` : seuls `logo` et `navigationItems` sont pris en compte.
- Les liens utilisent des ancres HTML classiques (`href`), pas de navigation React Router typée.
