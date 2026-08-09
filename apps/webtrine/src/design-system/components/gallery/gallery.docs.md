# Gallery Component (Galerie d'images)

Grille d'images avec chargement progressif au scroll, mode plein écran optionnel et variante "logos".

Ce composant existe sous deux formes : bloc de contenu (`"type": "gallery"` dans `datas.content`, utilisable plusieurs fois sur une page) et template de page dédiée (route `/gallerie`). **Dans les deux cas, les données doivent être imbriquées dans une clé `template` / `datas`** : le composant lit `template.title`, `template.inventory`, etc.

## Exemples de configuration JSON

### Bloc de contenu (galerie de photos, avec plein écran)

```json
{
  "type": "gallery",
  "template": {
    "title": "Notre atelier en images",
    "description": "Quelques photos de nos réalisations et de nos locaux.",
    "features": {
      "canFullScreen": true,
      "shouldRedirect": false
    },
    "inventory": [
      {
        "imageSrc": "atelier_1",
        "alt": "Vue de l'atelier principal",
        "description": "L'atelier principal"
      },
      {
        "imageSrc": "atelier_2",
        "alt": "Poste de travail équipé",
        "description": "Un poste de travail"
      },
      {
        "imageSrc": "atelier_3",
        "alt": "Réalisation terminée",
        "description": "Une réalisation terminée"
      }
    ]
  }
}
```

### Bloc de contenu (variante "logos", sans plein écran)

```json
{
  "type": "gallery",
  "template": {
    "features": {
      "shouldRedirect": false
    },
    "type": "logo",
    "inventory": [
      {
        "imageSrc": "logo_partenaire_1",
        "alt": "Logo du partenaire 1"
      },
      {
        "imageSrc": "logo_partenaire_2",
        "alt": "Logo du partenaire 2"
      },
      {
        "imageSrc": "logo_partenaire_3",
        "alt": "Logo du partenaire 3"
      }
    ]
  }
}
```

### Template de page dédiée (route /gallerie)

```json
{
  "type": "gallery",
  "id": "gallery",
  "name": "Gallery",
  "datas": {
    "title": "Album photo",
    "description": "Retrouvez toutes les photos de nos réalisations.",
    "features": {
      "canFullScreen": true,
      "shouldRedirect": false
    },
    "inventory": [
      {
        "imageSrc": "photo_1",
        "alt": "Photo numéro 1",
        "description": "Légende de la photo 1"
      },
      {
        "imageSrc": "photo_2",
        "alt": "Photo numéro 2",
        "description": "Légende de la photo 2"
      }
    ]
  }
}
```

### Notes

- Contrairement aux autres blocs de contenu (qui reçoivent leurs champs directement à plat), `gallery` attend ses données sous une clé `template` (bloc de contenu) — c'est cette clé, et non les champs de premier niveau, que lit `gallery.component.tsx`. Les configurations clients réelles (`dipaolo`) suivent bien cette convention.
- Pour l'usage en template de page dédiée (route `/gallerie`, sélectionné via `layout.templates`), les mêmes champs sont fournis dans `datas` (comme pour les autres templates de premier niveau).
- `inventory[].imageSrc` référence un fichier `assets/<client>/<imageSrc>.webp` ; ne pas inclure l'extension.
- `type: "logo"` (au niveau du template/datas, pas du bloc) active un style de grille compact adapté à l'affichage de logos partenaires plutôt que de photos.
- `features.canFullScreen` active l'ouverture des images en plein écran au clic.
- `features.shouldRedirect` est présent dans toutes les configurations clients réelles mais n'est lu par aucune logique actuelle du composant (champ hérité, sans effet).
- Le chargement des images se fait par lots de 8 (`BATCH_SIZE`), avec chargement automatique du lot suivant lorsque l'utilisateur atteint le bas de la grille.
