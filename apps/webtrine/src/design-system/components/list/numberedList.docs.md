# Numbered List Component (Liste numérotée)

Composant affichant une liste d'étapes numérotées, chacune avec un titre et une description.

## Exemples de configuration JSON

### Configuration de base (processus en plusieurs étapes)

```json
{
  "type": "numberedList",
  "title": "Un processus de création simple et efficace",
  "content": [
    {
      "title": "Définition du projet & Conseils",
      "description": "Dès notre premier contact, nous échangeons pour comprendre votre secteur d'activité et définir le cadre de votre projet."
    },
    {
      "title": "Conception graphique",
      "description": "Nous travaillons ensemble à la création de maquettes adaptées à vos besoins et à votre image de marque."
    },
    {
      "title": "Devis détaillé",
      "description": "Un devis précis est établi en fonction de vos besoins et des options choisies."
    },
    {
      "title": "Collecte des éléments",
      "description": "Vous fournissez les contenus (textes, images, architecture souhaitée) et nous optimisons ensemble la structure de votre site."
    },
    {
      "title": "Livraison & mise en ligne",
      "description": "Après validation, le site est mis en ligne et vous recevez un accès complet à votre espace client."
    }
  ]
}
```

### Configuration courte (2 étapes)

```json
{
  "type": "numberedList",
  "title": "Comment ça marche ?",
  "content": [
    {
      "title": "Prise de contact",
      "description": "Contactez-nous via le formulaire ou par téléphone pour exposer votre besoin."
    },
    {
      "title": "Confirmation du rendez-vous",
      "description": "Nous confirmons rapidement une date et une heure qui vous conviennent."
    }
  ]
}
```
