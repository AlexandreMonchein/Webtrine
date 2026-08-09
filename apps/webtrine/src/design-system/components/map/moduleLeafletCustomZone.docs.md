# Module Leaflet Custom Zone Component (Zone de déplacement personnalisée)

Composant carte Leaflet affichant une zone d'intervention calculée à partir de trajets prédéfinis, sans paramètres configurables.

## Exemples de configuration JSON

### Configuration (unique forme possible)

```json
{
  "type": "moduleLeafletCustomZone"
}
```

### Notes

- Ce composant ne lit **aucune** donnée depuis `datas` : les tracés GPS (domicile ↔ travail ↔ famille), les marqueurs et le centrage de la carte sont entièrement codés en dur dans le composant (`moduleLeafletCustomZone.component.tsx`), pas dérivés de la configuration client.
- La seule clé attendue dans `content` est `"type": "moduleLeafletCustomZone"` ; tout autre champ ajouté serait ignoré. C'est aussi la forme utilisée par le seul client qui l'exploite aujourd'hui (`chillpaws`).
- Attention : ce composant contient des coordonnées géographiques réelles et personnelles (trajets domicile/travail/famille), propres à un usage très spécifique. Il n'est pas réutilisable tel quel pour d'autres clients sans modification du code — l'éditeur visuel ne devrait probablement pas le proposer comme composant générique "carte" (voir aussi `map/moduleLeafletMap.component.tsx`, qui lui est bien piloté par `datas.places`, pour un cas d'usage générique de carte).
