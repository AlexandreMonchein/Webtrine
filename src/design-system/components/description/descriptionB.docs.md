# DescriptionB Component

Composant de présentation affichant un média (image ou vidéo) à gauche et du contenu textuel (titre, séparateur, description) à droite.

## Usage

```tsx
import { DescriptionB } from './descriptionB.component';

<DescriptionB
  media={{
    type: "image",
    src: "/assets/photo.webp",
    alt: "Description de l'image"
  }}
  title="Qui suis-je ?"
  description={[
    { text: "Premier paragraphe de la description..." },
    { text: "Deuxième paragraphe avec plus de détails..." }
  ]}
/>
```

## Avec une vidéo

```tsx
<DescriptionB
  media={{
    type: "video",
    src: "/assets/presentation.mp4",
    extension: "mp4",
    alt: "Vidéo de présentation"
  }}
  title="Notre Studio"
  description={[
    { text: "Découvrez notre espace de travail..." }
  ]}
/>
```

## Props

### `media` (required)
Objet définissant le média à afficher :
- `type`: `"image"` ou `"video"`
- `src`: URL ou chemin du fichier
- `extension`: Extension du fichier (obligatoire pour les vidéos : `"mp4"`, `"gif"`)
- `alt`: Texte alternatif (optionnel, utilise le titre par défaut)

### `title` (required)
Titre affiché au-dessus de la description.

### `description` (required)
Array d'objets contenant le texte de chaque paragraphe :
```ts
[
  { text: "Premier paragraphe..." },
  { text: "Deuxième paragraphe..." }
]
```

### `data-testid` (optional)
Identifiant pour les tests automatisés.

## Comportement Responsive

- **Mobile** : Layout vertical (média au-dessus, texte en dessous)
- **Tablet (768px+)** : Layout horizontal 50/50
- **Desktop (1024px+)** : Espacement augmenté
- **Large Desktop (1440px+)** : Largeur maximale centrée

## Caractéristiques

✅ Support image et vidéo
✅ Vidéo en autoplay, loop, muted
✅ Layout responsive (mobile-first)
✅ Multiple paragraphes supportés
✅ Typographie adaptative
✅ CSS Modules avec variables de thème

## Configuration pour le client

Dans `config.json` :

```json
{
  "type": "descriptionB",
  "datas": {
    "media": {
      "type": "image",
      "src": "/assets/customer/photo.webp",
      "alt": "Photo de présentation"
    },
    "title": "Qui suis-je ?",
    "description": [
      { "text": "Je m'appelle..." },
      { "text": "Ma passion est..." }
    ]
  }
}
```

## Variables CSS utilisées

- `--theme-color-primary` : Couleur du titre
- `--theme-color-secondary` : Couleur du séparateur
- `--theme-color-foreground-2` : Couleur du texte
- `--subtitle-font-size` : Taille de police du titre
- `--text-font-size` : Taille de police des paragraphes

## Accessibilité

- Attribut `alt` pour les images
- `aria-label` pour les vidéos
- Structure sémantique avec `<section>`, `<h2>`, `<p>`
- Fallback pour navigateurs ne supportant pas la vidéo
