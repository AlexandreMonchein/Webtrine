# Banner Component

## Aperçu

Composant de bannière hero avec image(s) de fond et texte positionnable. Supporte le carrousel multi-images, les boutons de contact, et plusieurs positions de texte.

## Fonctionnalités

- 🖼️ **Images multiples** : Support du carrousel avec changement automatique et manuel
- 📍 **Positionnement flexible** : 9 positions pour le texte (top-left, center, bottom-right, etc.)
- 🎨 **Hauteur variable** : Mode `medium` pour bannières moins hautes
- 🎭 **Masque d'image** : Overlay optionnel pour améliorer la lisibilité du texte
- 🔘 **Boutons de contact** : Support de boutons d'action intégrés (redirect, toggle)
- ♿ **Accessibilité** : Support clavier pour les sélecteurs de carousel, rôles ARIA

## Configuration JSON

### Bannière simple

```json
{
  "type": "banner",
  "id": "home-banner",
  "datas": {
    "features": {
      "multi": false,
      "medium": true,
      "mask": true
    },
    "title": "Bienvenue chez Webtrine",
    "subTitle": "Création de sites web sur mesure",
    "images": [
      { "name": "hero-home" }
    ],
    "textPosition": "center-right"
  }
}
```

### Carrousel multi-images

```json
{
  "type": "banner",
  "id": "portfolio-banner",
  "datas": {
    "features": {
      "multi": true,
      "medium": false,
      "mask": true
    },
    "title": "Notre Portfolio",
    "images": [
      { "name": "project-1" },
      { "name": "project-2" },
      { "name": "project-3" }
    ],
    "textPosition": "center",
    "intervalBetweenImages": 5000
  }
}
```

### Avec boutons de contact

```json
{
  "type": "banner",
  "id": "contact-banner",
  "datas": {
    "features": {
      "multi": false,
      "medium": true,
      "mask": true
    },
    "title": "Contactez-nous",
    "images": [{ "name": "contact-hero" }],
    "textPosition": "bottom-left",
    "contact": [
      {
        "type": "redirect",
        "displayedText": "Nous contacter",
        "hiddenText": "contact"
      }
    ]
  }
}
```

### Avec copyright d'image

```json
{
  "type": "banner",
  "id": "hero-banner",
  "datas": {
    "features": { "multi": false, "medium": false, "mask": true },
    "title": "Bienvenue",
    "images": [
      {
        "name": "photographer-image",
        "copyright": {
          "title": "Photo par John Doe",
          "link": "https://unsplash.com/@johndoe"
        }
      }
    ],
    "textPosition": "center"
  }
}
```

## Navigation au clavier

Les sélecteurs de carousel supportent la navigation au clavier :

- **Enter** : Sélectionner une image
- **Space** : Sélectionner une image
- **Tab** : Naviguer entre les sélecteurs

## Comportement du carrousel

Quand `features.multi = true` :

1. Changement automatique toutes les `intervalBetweenImages` millisecondes (défaut: 5000ms)
2. Sélecteurs manuels cliquables en bas de la bannière
3. Support du clavier (Enter/Space sur les sélecteurs)

## Accessibilité

- ✅ Balises sémantiques
- ✅ Navigation clavier complète
- ✅ Attributs ARIA appropriés
- ✅ Sélecteurs avec `aria-label` descriptif
