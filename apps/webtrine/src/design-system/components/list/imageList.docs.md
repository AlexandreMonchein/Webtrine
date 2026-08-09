# Image List Component (Liste d'images défilante)

Composant affichant une liste d'images (logos clients, références...) dans un carrousel défilant horizontalement, chaque image étant cliquable.

## Exemples de configuration JSON

### Configuration de base (logos clients)

```json
{
  "type": "imageList",
  "title": "Ils nous ont fait confiance",
  "subtitle": "Quelques réalisations parmi nos clients",
  "images": [
    {
      "src": "client_1",
      "alt": "Logo entreprise cliente : Client 1",
      "link": "https://www.client-1-exemple.com"
    },
    {
      "src": "client_2",
      "alt": "Logo entreprise cliente : Client 2",
      "link": "https://www.client-2-exemple.com"
    },
    {
      "src": "client_3",
      "alt": "Logo entreprise cliente : Client 3",
      "link": "https://www.client-3-exemple.com"
    }
  ]
}
```

### Configuration sans sous-titre

```json
{
  "type": "imageList",
  "title": "Nos références",
  "subtitle": null,
  "images": [
    {
      "src": "client_1",
      "alt": "Logo entreprise cliente : Client 1",
      "link": "https://www.client-1-exemple.com"
    },
    {
      "src": "client_2",
      "alt": "Logo entreprise cliente : Client 2",
      "link": "https://www.client-2-exemple.com"
    }
  ]
}
```

### Notes

- `src` correspond au nom du fichier (sans extension) situé dans `assets/{customer}/clients/{src}.webp`.
- Si `images` est vide, le composant ne s'affiche pas.
