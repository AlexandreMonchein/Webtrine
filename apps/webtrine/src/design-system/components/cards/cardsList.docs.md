# Cards List Component (Liste de cartes)

Composant affichant une liste de cartes avec titre, description, image ou icône optionnelle.

## Exemples de configuration JSON

### Configuration de base (affichage en pile)

```json
{
  "type": "cardsList",
  "features": {
    "displayInline": false
  },
  "title": "Nos engagements",
  "description": "Ce qui fait la différence dans notre accompagnement",
  "content": [
    {
      "title": "Réactivité",
      "description": [
        {
          "text": "Nous répondons à toutes vos demandes en moins de 24 heures, 7 jours sur 7."
        }
      ]
    },
    {
      "title": "Transparence",
      "description": [
        {
          "text": "Un devis clair et détaillé est établi avant toute intervention."
        }
      ]
    },
    {
      "title": "Qualité",
      "description": [
        {
          "text": "Chaque prestation est réalisée avec le plus grand soin et suivie jusqu'à sa livraison."
        }
      ]
    }
  ]
}
```

### Configuration avec images

```json
{
  "type": "cardsList",
  "features": {
    "displayInline": true
  },
  "title": "Nos services",
  "content": [
    {
      "title": "Service 1",
      "description": [
        {
          "text": "Description courte du premier service proposé."
        }
      ],
      "imageSrc": "square_image_1"
    },
    {
      "title": "Service 2",
      "description": [
        {
          "text": "Description courte du deuxième service proposé."
        }
      ],
      "imageSrc": "square_image_2"
    },
    {
      "title": "Service 3",
      "description": [
        {
          "text": "Description courte du troisième service proposé."
        }
      ],
      "imageSrc": "square_image_3"
    }
  ]
}
```

### Configuration avec icônes et affichage côte à côte

```json
{
  "type": "cardsList",
  "features": {
    "displayInline": true
  },
  "title": "Conditions générales",
  "content": [
    {
      "title": "Conditions de paiement",
      "description": [
        {
          "text": "Acompte de 30% à la commande, solde à la livraison."
        }
      ],
      "icon": "paymentConditions"
    },
    {
      "title": "Aucun frais supplémentaire",
      "description": [
        {
          "text": "Le tarif annoncé est le tarif final, sans surprise."
        }
      ],
      "icon": "aucunFrais"
    }
  ]
}
```

### Notes

- `imageSrc` et `icon` sont mutuellement facultatifs : si aucun n'est fourni, la carte affiche uniquement le titre et le texte.
- `displayInline: true` active un affichage côte à côte responsive (1 colonne mobile, 2 ou 3 colonnes tablette, 3 ou 4 colonnes desktop selon la parité du nombre de cartes). Une seule carte reste toujours en mode pile.
