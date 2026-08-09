# Default Contact Component (Formulaire de contact par défaut)

Composant de formulaire de contact générique avec envoi d'e-mail et carte de localisation optionnelle.

## Exemples de configuration JSON

### Configuration de base (sans carte)

```json
{
  "type": "defaultContact",
  "datas": {
    "features": {}
  }
}
```

### Configuration avec carte de localisation

```json
{
  "type": "defaultContact",
  "datas": {
    "map": {
      "type": "map",
      "id": "leafletMap",
      "datas": {
        "bigTitle": "Vous pouvez nous trouver ici",
        "title": "Ou nous trouver : ",
        "openTimesTitle": "Horaires d'ouverture :",
        "openTimes": [
          {
            "days": "Lun - Ven",
            "hours": "9h - 18h"
          },
          {
            "days": "Sam - Dim",
            "hours": "Fermé"
          }
        ],
        "features": {
          "isSmall": true
        },
        "places": [
          {
            "id": 1,
            "address": "12 rue de l'Exemple, 69000 Lyon",
            "phone": "04 78 00 00 00",
            "position": [45.764, 4.835]
          }
        ]
      }
    },
    "features": {}
  }
}
```

### Notes

- Le formulaire lui-même (titre, description, libellés de champs, placeholders, messages de succès/erreur) est entièrement piloté par la sous-arborescence `contact.*` de `lang/customer/<customer>/<lang>.json` — aucun de ces textes ne provient de `datas`.
- Les coordonnées affichées (téléphone, e-mail) et l'identifiant du template d'envoi proviennent de la configuration client (`client.contact`), pas de `datas`.
- `datas.map` est optionnel : si absent, seul le formulaire est affiché, sans carte.
