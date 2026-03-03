# ContactBanner

Composant de bannière de contact avec média (image/vidéo), boîte d'informations overlay, et bouton de retour en haut de page.

## Configuration JSON

### Avec image

```json
{
  "type": "contact",
  "id": "contactBanner",
  "datas": {
    "title": "LE STUDIO.",
    "media": {
      "type": "image",
      "src": "/assets/{CUSTOMER}/the_studio_image.jpg",
      "alt": "Intérieur du studio"
    },
    "infoTitle": "INFORMATIONS",
    "content": [
      {
        "text": "Première ligne d'information"
      },
      {
        "text": "Deuxième ligne d'information"
      },
      {
        "text": "Troisième ligne d'information"
      }
    ]
  }
}
```

### Avec vidéo

```json
{
  "type": "contact",
  "id": "contactBanner",
  "datas": {
    "title": "LE STUDIO.",
    "media": {
      "type": "video",
      "src": "/assets/{CUSTOMER}/the_studio.mp4",
      "extension": "mp4",
      "alt": "Visite vidéo du studio"
    },
    "infoTitle": "CONTACT",
    "content": [
      {
        "text": "123 Rue Example, 33000 Bordeaux, France"
      },
      {
        "text": "Téléphone : +33 1 23 45 67 89"
      },
      {
        "text": "Email : contact@example.com"
      }
    ]
  }
}
```
