# Testimonial Cards Component (Avis clients)

Carrousel d'avis clients récupérés dynamiquement depuis Google (via un identifiant d'établissement), avec bouton optionnel pour laisser un avis.

## Exemples de configuration JSON

### Configuration de base

```json
{
  "type": "testimonialCards",
  "title": "Ils nous ont fait confiance",
  "dataId": "YOUR_GOOGLE_PLACE_ID",
  "features": {
    "autoplay": true,
    "autoplayDelay": 4000
  },
  "reviewButton": {
    "text": "Laissez-nous un avis",
    "url": "https://search.google.com/local/writereview?placeid=YOUR_GOOGLE_PLACE_ID",
    "variant": "secondary",
    "size": "medium",
    "shape": "rounded"
  }
}
```

### Configuration sans autoplay ni bouton d'avis

```json
{
  "type": "testimonialCards",
  "title": "Avis de nos clients",
  "dataId": "0x47f4ea2b1c3d4e5f:0xa1b2c3d4e5f6a7b8",
  "features": {
    "autoplay": false
  }
}
```

### Notes

- Le contenu affiché (nom, note, texte, avatar, date) n'est **pas** fourni dans `datas` : le composant appelle en interne l'API `/api/reviews` avec le `dataId` (identifiant Google Place / CID) pour récupérer les avis Google en temps réel. Si l'appel échoue ou ne retourne aucun avis, le composant ne s'affiche pas du tout.
- `dataId` doit correspondre à l'identifiant Google Business Profile de l'établissement (visible dans l'URL Google Maps ou via l'outil d'avis Google).
- `features.autoplayDelay` (en millisecondes) n'a d'effet que si `features.autoplay` est `true` ; sa valeur par défaut est `5000`.
- `reviewButton` est optionnel : s'il est omis, aucun bouton d'appel à l'action n'est affiché sous le carrousel.
- Le nombre de cartes visibles par slide (1, 2 ou 3) s'adapte automatiquement à la largeur de l'écran et n'est pas configurable via `datas`.
- L'identifiant réel (`dataId` / `placeid`) se trouve dans la configuration propre à chaque client ; voir `config/customer/chillpaws/` pour un exemple de référence.
