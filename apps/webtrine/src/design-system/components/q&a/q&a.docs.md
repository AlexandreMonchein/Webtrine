# Q&A Component (Foire aux questions)

Composant de FAQ sous forme d'accordéon, avec catégories optionnelles sous forme d'onglets.

## Exemples de configuration JSON

### Configuration de base (avec catégories)

```json
{
  "type": "q&a",
  "features": {
    "hasCategories": true,
    "allowMultipleOpen": false
  },
  "title": "Foire aux questions",
  "subtitle": null,
  "content": {
    "categories": [
      {
        "id": "general",
        "label": "Général",
        "items": [
          {
            "id": "gen-1",
            "question": "Quels sont vos horaires d'ouverture ?",
            "answer": "<p>Nous sommes ouverts du lundi au vendredi, de 9h à 18h.</p>"
          },
          {
            "id": "gen-2",
            "question": "Comment prendre rendez-vous ?",
            "answer": "<p>Vous pouvez nous contacter directement via le formulaire de contact ou par téléphone.</p>"
          }
        ]
      },
      {
        "id": "tarifs",
        "label": "Tarifs",
        "items": [
          {
            "id": "tarifs-1",
            "question": "Proposez-vous des devis gratuits ?",
            "answer": "<p>Oui, chaque devis est établi gratuitement et sans engagement.</p>"
          }
        ]
      }
    ]
  }
}
```

### Configuration sans catégories (liste simple)

```json
{
  "type": "q&a",
  "features": {
    "hasCategories": false,
    "allowMultipleOpen": true
  },
  "title": "Questions fréquentes",
  "subtitle": "Retrouvez les réponses aux questions les plus posées",
  "content": {
    "items": [
      {
        "id": "faq-1",
        "question": "Quels moyens de paiement acceptez-vous ?",
        "answer": "<p>Carte bancaire, espèces et virement sont acceptés.</p>"
      },
      {
        "id": "faq-2",
        "question": "Livrez-vous en dehors de la région ?",
        "answer": "<p>Nous livrons actuellement uniquement dans un rayon de 50 km.</p>"
      },
      {
        "id": "faq-3",
        "question": "Puis-je annuler ma commande ?",
        "answer": "<p>Oui, jusqu'à 48h avant la date prévue, sans frais.</p>"
      }
    ]
  }
}
```

### Configuration avec plusieurs panneaux ouverts simultanément

```json
{
  "type": "q&a",
  "features": {
    "hasCategories": true,
    "allowMultipleOpen": true
  },
  "title": "Tout savoir avant de commander",
  "subtitle": null,
  "content": {
    "categories": [
      {
        "id": "commande",
        "label": "Commande",
        "items": [
          {
            "id": "commande-1",
            "question": "Combien de temps faut-il pour recevoir ma commande ?",
            "answer": "<p>Le délai moyen est de 5 à 7 jours ouvrés.</p>"
          },
          {
            "id": "commande-2",
            "question": "Puis-je modifier ma commande après validation ?",
            "answer": "<p>Contactez-nous rapidement, une modification est possible avant expédition.</p>"
          }
        ]
      }
    ]
  }
}
```

### Notes

- `answer` accepte du HTML simple (`<p>`, `<strong>`, `<ul>`, `<ol>`, etc.), assaini via DOMPurify avant affichage.
- Quand `features.hasCategories` est `true`, le contenu doit être fourni dans `content.categories` (chaque catégorie affichée comme un onglet) ; sinon, utiliser `content.items` pour une liste plate d'accordéons.
- `features.allowMultipleOpen` autorise plusieurs questions ouvertes en même temps ; par défaut une seule question reste ouverte à la fois.
- Le champ `showSearch` présent dans les types du composant n'est pas implémenté côté rendu actuellement et n'a aucun effet.
