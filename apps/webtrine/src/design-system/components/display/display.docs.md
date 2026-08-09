# Display Component (Points forts illustrés)

Composant affichant une grille de points forts, chacun illustré par une icône et un court texte.

## Exemples de configuration JSON

### Configuration de base

```json
{
  "type": "display",
  "features": {},
  "title": "Confiez-nous votre projet",
  "content": [
    {
      "name": "franceColored",
      "text": "100% français"
    },
    {
      "name": "quality",
      "text": "Qualité"
    }
  ]
}
```

### Configuration avec davantage de points forts

```json
{
  "type": "display",
  "features": {},
  "title": "Pourquoi nous choisir",
  "content": [
    {
      "name": "quality",
      "text": "Savoir-faire reconnu"
    },
    {
      "name": "support",
      "text": "Accompagnement personnalisé"
    },
    {
      "name": "franceColored",
      "text": "Fabrication française"
    },
    {
      "name": "domain",
      "text": "Livraison rapide"
    }
  ]
}
```

### Notes

- `content[].name` correspond au nom d'une icône présente dans `src/assets/icons/` (ex. `franceColored`, `quality`, `support`, `domain`) et non à une image libre ; l'icône est affichée en orange (couleur fixe, non configurable).
- La clé `features` est transmise mais n'est lue par aucune logique du composant actuellement ; elle est conservée pour cohérence avec les autres blocs de contenu.
