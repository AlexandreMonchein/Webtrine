# Description Component

Composant de section de description avec texte, images et boutons optionnels.

## Exemples de configuration JSON

### Configuration de base (avec image)

```json
{
  "type": "description",
  "features": {
    "isReversed": false,
    "isContinious": false,
    "isCentered": false,
    "isTextBefore": false
  },
  "title": "Notre histoire et nos valeurs",
  "hash": "notre-histoire",
  "content": [
    {
      "text": "Depuis notre création, nous nous engageons à offrir des services de qualité."
    },
    {
      "text": "Notre équipe passionnée travaille chaque jour pour innover et créer des solutions sur mesure."
    }
  ],
  "images": [
    {
      "name": "square_image_1",
      "alt": "Image illustrant notre approche",
      "focusable": false
    }
  ]
}
```

### Configuration inversée (image à droite)

```json
{
  "type": "description",
  "features": {
    "isReversed": true,
    "isContinious": false,
    "isCentered": false,
    "isTextBefore": false
  },
  "title": "Une approche différente",
  "hash": "approche",
  "content": [
    {
      "text": "En inversant la disposition, nous créons un effet visuel différent."
    }
  ],
  "images": [
    {
      "name": "square_image_1",
      "alt": "Image à droite",
      "focusable": false
    }
  ]
}
```

### Configuration sans image

```json
{
  "type": "description",
  "features": {
    "isReversed": false,
    "isContinious": false,
    "isCentered": false,
    "isTextBefore": false
  },
  "title": "Du texte, simplement",
  "hash": "texte-simple",
  "content": [
    {
      "text": "Parfois, <strong>le contenu textuel seul</strong> est suffisant."
    },
    {
      "text": "Cette configuration permet de se concentrer uniquement sur le texte."
    }
  ],
  "images": []
}
```

### Configuration avec boutons

```json
{
  "type": "description",
  "features": {
    "isReversed": false,
    "isContinious": false,
    "isCentered": false,
    "isTextBefore": false
  },
  "title": "Passez à l'action",
  "hash": "action",
  "content": [
    {
      "text": "Découvrez comment nous pouvons transformer vos idées en réalité."
    },
    {
      "button": {
        "label": "Découvrir nos services",
        "to": "/services"
      }
    },
    {
      "text": "Notre équipe est prête à vous accompagner."
    },
    {
      "button": {
        "label": "Nous contacter",
        "to": "/contact"
      }
    }
  ],
  "images": [
    {
      "name": "vertical_image_1",
      "alt": "Illustration pour l'appel à l'action",
      "focusable": false
    }
  ]
}
```

### Configuration en mode continu

```json
{
  "type": "description",
  "features": {
    "isReversed": false,
    "isContinious": true,
    "isCentered": false,
    "isTextBefore": false
  },
  "title": "Section continue",
  "hash": "continu",
  "content": [
    {
      "text": "L'option <strong>isContinious</strong> permet d'afficher la section sans padding vertical supplémentaire."
    }
  ],
  "images": [
    {
      "name": "square_image_1",
      "alt": "Image en mode continu",
      "focusable": false
    }
  ]
}
```
