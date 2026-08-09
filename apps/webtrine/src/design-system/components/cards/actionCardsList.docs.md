# Action Cards List Component (Cartes d'action)

Composant affichant une grille de cartes avec image, description et boutons d'action menant vers d'autres pages.

## Exemples de configuration JSON

### Configuration de base

```json
{
  "type": "actionCardsList",
  "features": {},
  "title": "Découvrez nos prestations",
  "cards": [
    {
      "id": "1",
      "title": "Pré-visite",
      "description": "Une rencontre obligatoire avant toute prestation, pour faire connaissance et recueillir les informations nécessaires.",
      "imageSrc": "vertical_image_1",
      "buttons": [
        {
          "id": "btn-previsite",
          "label": "En savoir plus",
          "route": "/prestation",
          "hash": "#previsite"
        }
      ]
    },
    {
      "id": "2",
      "title": "Déroulement d'une prestation",
      "description": "Un temps privilégié consacré à chaque client, en respectant ses besoins spécifiques.",
      "imageSrc": "vertical_image_2",
      "buttons": [
        {
          "id": "btn-deroulement",
          "label": "En savoir plus",
          "route": "/prestation",
          "hash": "#deroulement"
        }
      ]
    }
  ]
}
```

### Configuration avec plusieurs boutons par carte

```json
{
  "type": "actionCardsList",
  "features": {},
  "title": "Nos domaines d'intervention",
  "cards": [
    {
      "id": "1",
      "title": "Accompagnement particuliers",
      "description": "Des solutions adaptées à chaque situation personnelle.",
      "imageSrc": "vertical_image_1",
      "buttons": [
        {
          "id": "btn-particuliers-1",
          "label": "Voir les offres",
          "type": "particuliers",
          "route": "/offres"
        },
        {
          "id": "btn-particuliers-2",
          "label": "Nous contacter",
          "type": "contact",
          "route": "/contact"
        }
      ]
    }
  ]
}
```

### Configuration sans titre de section

```json
{
  "type": "actionCardsList",
  "features": {},
  "cards": [
    {
      "id": "1",
      "title": "Tarifs",
      "description": "Consultez nos tarifs adaptés à vos besoins.",
      "buttons": [
        {
          "id": "btn-tarifs",
          "label": "Consulter les tarifs",
          "route": "/tarifs"
        }
      ]
    }
  ]
}
```

### Notes

- `imageSrc` est optionnel : sans lui, la carte n'affiche que le contenu texte et ses boutons.
- Chaque bouton nécessite un `id` unique (utilisé pour le focus et l'accessibilité) ; `type` et `hash` sont facultatifs.
