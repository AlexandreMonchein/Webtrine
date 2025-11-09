import type { Meta, StoryObj } from "@storybook/react";

import ArtistDescription from "./artistDescription.component";

const meta: Meta<typeof ArtistDescription> = {
  title: "Design System/Components/Description/ArtistDescription",
  component: ArtistDescription,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
# Artist Description Component

Composant pour afficher le profil d'un artiste avec carrousel d'images, informations et mode fullscreen.

## Configuration JSON pour intégration

Copiez et adaptez cette configuration dans votre config.json :

\`\`\`json
"description-1":{
  "type": "artistDescription",
  "datas": {
    "name": "Nom de l'artiste",
    "instagram": "handle_instagram",
    "tagline": "STYLE / THÈME / SPÉCIALITÉ",
    "description": "Description complète de l'artiste, son parcours, ses influences et son style artistique. Cette description peut être longue et détaillée.",
    "images": [
      "/assets/customer/image1.webp",
      "/assets/customer/image2.webp",
      "/assets/customer/image3.webp"
    ],
    "intervalBetweenImages": 5000,
    "instagramUrl": "https://www.instagram.com/handle_instagram",
    "contactUrl": "#contact-form"
  }
}
\`\`\`

### Structure des données :
- **name** : Nom de l'artiste (obligatoire)
- **instagram** : Handle Instagram sans @ (obligatoire)
- **tagline** : Slogan ou spécialité en majuscules (obligatoire)
- **description** : Description détaillée de l'artiste (obligatoire)
- **images** : Tableau de chemins d'images (obligatoire)
- **intervalBetweenImages** : Délai entre les images du carrousel en ms (optionnel, défaut: 5000)
- **instagramUrl** : URL complète Instagram (optionnel, construit automatiquement si absent)
- **contactUrl** : URL du formulaire de contact (optionnel, défaut: "#contact")

### Exemple avec plusieurs images :
\`\`\`json
{
  "images": [
    "/assets/customer/tattoo1.webp",
    "/assets/customer/tattoo2.webp",
    "/assets/customer/tattoo3.webp",
    "/assets/customer/tattoo4.webp"
  ]
}
\`\`\`

### Notes importantes :
- Les images doivent être au format WebP pour de meilleures performances
- Le mode fullscreen est automatiquement activé pour ce composant
- Le lien Instagram est généré automatiquement : instagram.com/[handle]
- Le carrousel change d'image automatiquement selon l'intervalle défini
        `,
      },
    },
  },
  argTypes: {
    datas: {
      control: "object",
      description:
        "Données de l'artiste avec nom, description, images et liens",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArtistDescription>;

export const Default: Story = {
  args: {
    datas: {
      name: "DUF",
      instagram: "duftattoo",
      tagline: "MINIMALISTE / CONTEMPORAIN / ÉPURÉ",
      description:
        "Florian est un artiste autodidacte depuis 2012. Il fait ses débuts dans le graffiti et se perfectionne en découvrant le tatouage. Créateur et gérant du studio APT.235, il réalise aujourd'hui des tattoos aux lignes simples et épurées au style reconnaissable. Ses créations sont influencées par l'art contemporain, l'architecture et le design minimaliste, ce qui lui permet de proposer des compositions uniques. Il aime travailler sur des projets personnalisés et collaborer avec ses clients pour traduire leurs idées en tatouages qui traversent le temps. Chaque pièce est conçue avec une attention particulière aux détails, aux proportions et à l'équilibre graphique. Son approche sobre et élégante rend ses œuvres intemporelles et immédiatement reconnaissables.",
      images: [
        "/assets/showcase/square_image.webp",
        "/assets/showcase/square_image_2.webp",
        "/assets/showcase/square_image_3.webp",
      ],
      intervalBetweenImages: 5000,
      instagramUrl: "https://www.instagram.com/duftattoo",
      contactUrl: "#contact-form",
    },
  },
};

export const ShortDescription: Story = {
  args: {
    datas: {
      name: "DUF",
      instagram: "duftattoo",
      tagline: "MINIMALISTE / CONTEMPORAIN / ÉPURÉ",
      description:
        "Florian est un artiste autodidacte depuis 2012. Il réalise aujourd'hui des tattoos aux lignes simples et épurées au style reconnaissable.",
      images: [
        "/assets/showcase/square_image.webp",
        "/assets/showcase/square_image_2.webp",
        "/assets/showcase/square_image_3.webp",
      ],
      intervalBetweenImages: 5000,
      instagramUrl: "https://www.instagram.com/duftattoo",
      contactUrl: "mailto:contact@apt235.com",
    },
  },
};
