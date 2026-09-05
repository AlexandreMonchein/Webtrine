# Multi Data Table Component (Groupe de tableaux de données)

Affiche plusieurs tableaux de données liés sous un titre/sous-titre partagé, dans un seul bloc de contenu (un seul fond alterné au lieu d'un par tableau).

## Exemples de configuration JSON

### Groupe de 3 tableaux (tarifs par nombre de chiens)

```json
{
  "type": "multiDataTable",
  "hash": "visite-chien",
  "features": {
    "centeredTitles": true
  },
  "title": "Visite chien / Promenade",
  "subTitle": "*Tarifs dégressifs de 15% à partir du 2ème animal",
  "tables": [
    {
      "columns": [
        { "header": "1 chien", "key": "type" },
        { "header": "Tarif / heure", "key": "price1" },
        { "header": "Tarif / demi heure", "key": "price2" }
      ],
      "data": [
        { "type": "Visite ponctuelle", "price1": "25 €", "price2": "18 €" }
      ]
    },
    {
      "columns": [
        { "header": "2 chiens", "key": "type" },
        { "header": "Tarif / heure", "key": "price1" },
        { "header": "Tarif / demi heure", "key": "price2" }
      ],
      "data": [
        { "type": "Visite ponctuelle", "price1": "43 €", "price2": "31 €" }
      ]
    },
    {
      "columns": [
        { "header": "3 chiens", "key": "type" },
        { "header": "Tarif / heure", "key": "price1" },
        { "header": "Tarif / demi heure", "key": "price2" }
      ],
      "data": [
        { "type": "Visite ponctuelle", "price1": "65 €", "price2": "47 €" }
      ]
    }
  ]
}
```

### Notes

- `features` est optionnel : `centeredTitles` centre le titre/sous-titre, `centerContent` centre le contenu des cellules (les deux valent `false` par défaut).
- `title`/`subTitle`/`hash` sont partagés par tout le groupe — chaque tableau de `tables` distingue son propre sujet via son premier en-tête de colonne (ex: "1 chien" / "2 chiens").
- Si `data` est vide pour un tableau donné, ce tableau affiche une ligne "Aucune donnée disponible".
