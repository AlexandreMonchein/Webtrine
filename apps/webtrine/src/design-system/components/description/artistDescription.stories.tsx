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
    "name": "artistDescription h1 name data-1",
    "instagram": "artistDescription span instagram data-1",
    "tagline": "artistDescription p tagline data-1",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "images": [
      "/assets/customer/square_image_1.webp",
      "/assets/customer/square_image_2.webp",
      "/assets/customer/square_image_3.webp"
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
    "/assets/customer/square_image_1.webp",
    "/assets/customer/square_image_2.webp",
    "/assets/customer/square_image_3.webp",
    "/assets/customer/square_image_4.webp"
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
      name: "artistDescription h1 name data-1",
      instagram: "artistDescription span instagram data-1",
      tagline: "artistDescription p tagline data-1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      images: [
        "/assets/showcase/square_image_1.webp",
        "/assets/showcase/square_image_2.webp",
        "/assets/showcase/square_image_3.webp",
      ],
      intervalBetweenImages: 5000,
      instagramUrl: "https://www.instagram.com/artistDescription_link_data-1",
      contactUrl: "#contact-form",
    },
  },
};

export const ShortDescription: Story = {
  args: {
    datas: {
      name: "artistDescription h1 name data-1",
      instagram: "artistDescription span instagram data-1",
      tagline: "artistDescription p tagline data-1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      images: [
        "/assets/showcase/square_image_1.webp",
        "/assets/showcase/square_image_2.webp",
        "/assets/showcase/square_image_3.webp",
      ],
      intervalBetweenImages: 5000,
      instagramUrl: "https://www.instagram.com/artistDescription_link_data-1",
      contactUrl: "mailto:artistDescription_email_data-1",
    },
  },
};
