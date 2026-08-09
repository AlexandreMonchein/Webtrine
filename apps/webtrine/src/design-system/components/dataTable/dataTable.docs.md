# Data Table Component (Tableau de données)

Composant affichant un tableau de données structuré en colonnes, avec titre et sous-titre optionnels.

## Exemples de configuration JSON

### Configuration de base

```json
{
  "type": "dataTable",
  "title": "Tarifs des prestations complémentaires",
  "subTitle": null,
  "content": {
    "columns": [
      { "header": "Type de prestation", "key": "type" },
      { "header": "Détail", "key": "detail" },
      { "header": "Tarif HT", "key": "price" }
    ],
    "data": [
      {
        "type": "Modification simple",
        "detail": "Texte, bouton ou image isolée",
        "price": "15 – 30 €"
      },
      {
        "type": "Ajout",
        "detail": "Ajouter une image, un bouton, une section simple",
        "price": "40 €"
      },
      {
        "type": "Nouveau composant",
        "detail": "Nouveau composant au sein d'une section ou d'une page",
        "price": "100 – 200 €"
      }
    ]
  }
}
```

### Configuration avec titres et contenu centrés

```json
{
  "type": "dataTable",
  "features": {
    "centeredTitles": true,
    "centerContent": true
  },
  "title": "Nos formules",
  "subTitle": "Prix indiqués hors taxes",
  "content": {
    "columns": [
      { "header": "Formule", "key": "formula" },
      { "header": "Inclus", "key": "included" },
      { "header": "Prix", "key": "price" }
    ],
    "data": [
      {
        "formula": "Essentiel",
        "included": "1 page, hébergement 1 an",
        "price": "450 €"
      },
      {
        "formula": "Standard",
        "included": "5 pages, hébergement 1 an",
        "price": "900 €"
      }
    ]
  }
}
```

### Notes

- `features` est optionnel : `centeredTitles` centre le titre/sous-titre, `centerContent` centre le contenu des cellules (les deux valent `false` par défaut).
- Si `data` est vide, le tableau affiche une ligne "Aucune donnée disponible".
