# All In One Component (Offre unique)

Composant affichant une offre de prix unique tout-en-un avec liste de fonctionnalités illustrées par des icônes.

## Exemples de configuration JSON

### Configuration de base

```json
{
  "type": "allInOne",
  "features": {},
  "content": [
    {
      "imgSrc": "colorPalette",
      "text": "Création de votre charte graphique"
    },
    {
      "imgSrc": "websiteCreation",
      "text": "Création de votre site vitrine"
    },
    {
      "imgSrc": "domain",
      "text": "Nom de domaine inclus *"
    },
    {
      "imgSrc": "lodging",
      "text": "Hébergement de votre site **"
    },
    {
      "imgSrc": "support",
      "text": "Maintenance / Support de votre site"
    },
    {
      "imgSrc": "pencil",
      "text": "Modification à la demande (1 fois / mois) ***"
    }
  ],
  "title": "L'offre tout-en-un :",
  "descriptionTop": "Une offre complète pour créer et lancer votre site sans prise de tête.",
  "descriptionBottom": [
    { "text": "* Si vous le faites héberger chez nous" },
    { "text": "** Pour un supplément de 150€/an TTC" },
    { "text": "*** Sur les 6 mois suivant le déploiement du site" }
  ],
  "price": "450,00€ TTC",
  "per": null,
  "additionalDescription": null
}
```

### Configuration avec prix récurrent

```json
{
  "type": "allInOne",
  "features": {},
  "content": [
    {
      "imgSrc": "support",
      "text": "Maintenance et mises à jour incluses"
    },
    {
      "imgSrc": "domain",
      "text": "Nom de domaine et hébergement inclus"
    },
    {
      "imgSrc": "pencil",
      "text": "Modifications illimitées"
    }
  ],
  "title": "Formule Sérénité",
  "descriptionTop": "Un abonnement simple pour ne plus jamais vous soucier de votre site.",
  "descriptionBottom": [],
  "price": "29,00€ TTC",
  "per": "mois",
  "additionalDescription": "Sans engagement, résiliable à tout moment."
}
```

### Notes

- `content[].imgSrc` correspond au nom d'une icône présente dans `src/assets/icons/` (ex. `colorPalette`, `websiteCreation`, `domain`, `lodging`, `support`, `pencil`) et non à une image libre.
- `descriptionBottom` peut être un tableau vide : les mentions ne s'affichent que si le tableau contient des éléments.
- `per` peut être `null` (prix unique) ou une chaîne affichée après le prix (ex. `"mois"`, `"an"`).
- Le clic sur le bouton d'action redirige vers `/contact` en transmettant l'ensemble de l'offre (`plan`) dans le state de navigation ; le libellé du bouton provient de la clé i18n `prices.selectPlan`.
- La clé `features` est transmise mais n'est actuellement lue par aucun rendu du composant ; elle est conservée pour cohérence avec les autres blocs de contenu.
