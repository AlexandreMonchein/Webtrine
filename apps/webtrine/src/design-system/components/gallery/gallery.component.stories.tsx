import type { Meta, StoryObj } from "@storybook/react";

import GalleryComponent from "./gallery.component";

const meta: Meta<typeof GalleryComponent> = {
  component: GalleryComponent,
  title: "Design System/Components/Gallery",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
# Gallery Component

Composant Gallery pour afficher une collection d'images avec différents types de mise en page.

## Configuration JSON pour intégration

Copiez et adaptez cette configuration dans votre \`config.json\` :

\`\`\`json
"gallery-1": {
  "type": "gallery",
  "title": "Titre de votre galerie",
  "description": "Description de votre galerie",
  "template": {
    "type": "gallery",
    "features": {
      "canFullScreen": true,
      "shouldRedirect": false
    },
    "inventory": [
      {
        "alt": "Description de l'image 1",
        "imageSrc": "nom_image_1"
      },
      {
        "alt": "Description de l'image 2",
        "imageSrc": "nom_image_2"
      }
    ]
  }
}
\`\`\`

### Pour une galerie de logos :
\`\`\`json
{
  "template": {
    "type": "logo",
    "features": {
      "canFullScreen": false
    },
    "inventory": [
      {
        "alt": "Logo client 1",
        "imageSrc": "clients/logo1"
      }
    ]
  }
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    template: {
      description:
        "Configuration de la galerie avec type et inventaire des images",
    },
  },
};

export default meta;
type Story = StoryObj<typeof GalleryComponent>;

export const Default: Story = {
  args: {
    template: {
      type: "gallery",
      inventory: [
        { imageSrc: "square_image_1", alt: "Image d'accueil 1" },
        { imageSrc: "square_image_2", alt: "Image d'accueil 2" },
        { imageSrc: "square_image_3", alt: "Image de description 1" },
        { imageSrc: "square_image_1", alt: "Image de description 2" },
      ],
      features: {
        canFullScreen: false,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Galerie par défaut avec plusieurs images du site, sans mode fullscreen.",
      },
    },
  },
};

export const LogoGallery: Story = {
  args: {
    template: {
      type: "logo",
      inventory: [
        { imageSrc: "clients/dipaolo", alt: "Client DiPaolo" },
        { imageSrc: "clients/chillpaws", alt: "Client DiPaolo" },
        {
          imageSrc: "icons/webtrine_logo_2_blanc_noTitle",
          alt: "Logo Webtrine",
        },
      ],
      features: {
        canFullScreen: false,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Galerie spécialisée pour l'affichage de logos clients avec un style adapté, sans fullscreen.",
      },
    },
  },
};
