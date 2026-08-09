# Artist Description Component (Fiche artiste)

Composant présentant le profil d'un artiste avec carrousel d'images, réseau social et bouton de prise de contact.

## Exemples de configuration JSON

### Configuration de base

```json
{
  "type": "artistDescription",
  "datas": {
    "name": "Jordan Lenoir",
    "instagram": "jordan.lenoir.art",
    "tagline": "STYLE: Minimaliste / Fine Line",
    "description": "Artiste autodidacte depuis 2015, il réalise aujourd'hui des créations aux lignes simples et épurées, au style reconnaissable.",
    "images": [
      "/assets/customer/square_image_1.webp",
      "/assets/customer/square_image_2.webp",
      "/assets/customer/square_image_3.webp"
    ],
    "intervalBetweenImages": 5000,
    "instagramUrl": "https://www.instagram.com/jordan.lenoir.art",
    "contactUrl": "#contact-form"
  }
}
```

### Configuration avec lien Instagram généré automatiquement

```json
{
  "type": "artistDescription",
  "datas": {
    "name": "Camille Verdier",
    "instagram": "camille.verdier",
    "tagline": "STYLE: Blackwork / Dark",
    "description": "Inspirée par la peinture classique, elle crée des compositions surréalistes centrées sur le portrait.",
    "images": [
      "/assets/customer/square_image_1.webp",
      "/assets/customer/square_image_2.webp"
    ]
  }
}
```

### Configuration avec redirection vers une page de contact

```json
{
  "type": "artistDescription",
  "datas": {
    "name": "Thomas Riguel",
    "instagram": "thomas.riguel",
    "tagline": "STYLE: Réalisme / Portrait",
    "description": "Le travail de Thomas explore le réalisme et le contraste, mêlant ombres légères et noirs profonds.",
    "images": [
      "/assets/customer/square_image_1.webp",
      "/assets/customer/square_image_2.webp",
      "/assets/customer/square_image_3.webp",
      "/assets/customer/square_image_4.webp"
    ],
    "intervalBetweenImages": 2500,
    "instagramUrl": "https://www.instagram.com/thomas.riguel",
    "contactUrl": "/contact"
  }
}
```
