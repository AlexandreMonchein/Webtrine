# Pet Sitting Contact Component (Formulaire de contact garde d'animaux)

Composant de formulaire de contact spécialisé pour les demandes de garde d'animaux, avec dates de visite et zone de localisation.

## Exemples de configuration JSON

### Configuration de base

```json
{
  "type": "petSittingContact",
  "datas": {
    "features": {}
  }
}
```

### Notes

- Ce composant ne lit aucune donnée depuis `datas` : seul `"type": "petSittingContact"` sert à le sélectionner, `datas` peut rester vide (`{}` ou `{ "features": {} }` par convention).
- Tout le contenu affiché (titre, description, libellés des champs du formulaire, options des menus déroulants, messages de succès/erreur) provient de la sous-arborescence `contact.*` de `lang/customer/<customer>/<lang>.json`.
- Les coordonnées (téléphone, e-mail), le logo et l'identifiant du template d'envoi proviennent de la configuration client (`client.contact` et `client.logo`), pas de `datas`.
- La carte de zone d'intervention et les réseaux sociaux affichés sont également injectés automatiquement (zone Leaflet + réseaux du client), sans configuration via `datas`.
