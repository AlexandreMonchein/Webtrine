import type { Meta, StoryObj } from "@storybook/react";
import GalleryComponent from "./gallery.component";

const meta: Meta<typeof GalleryComponent> = {
  component: GalleryComponent,
  title: "Design System/Components/Gallery/Gallery",
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
        { imageSrc: "accueil_image_1", alt: "Image d'accueil 1" },
        { imageSrc: "accueil_image_2", alt: "Image d'accueil 2" },
        { imageSrc: "description_image_1", alt: "Image de description 1" },
        { imageSrc: "description_image_2", alt: "Image de description 2" },
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
        { imageSrc: "webtrine_storybook", alt: "Logo Webtrine" },
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

export const SmallGallery: Story = {
  args: {
    template: {
      type: "gallery",
      inventory: [
        { imageSrc: "accessibility_image_1", alt: "Image accessibilité 1" },
        { imageSrc: "accessibility_image_2", alt: "Image accessibilité 2" },
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
          "Petite galerie avec seulement quelques images, sans fullscreen.",
      },
    },
  },
};

export const FullscreenGallery: Story = {
  args: {
    template: {
      type: "gallery",
      inventory: [
        { imageSrc: "accueil_image_1", alt: "Image d'accueil 1" },
        { imageSrc: "accueil_image_2", alt: "Image d'accueil 2" },
        { imageSrc: "description_image_1", alt: "Image de description 1" },
        { imageSrc: "description_image_2", alt: "Image de description 2" },
      ],
      features: {
        canFullScreen: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Galerie avec mode fullscreen activé. Cliquez sur une image pour l'ouvrir en plein écran.",
      },
    },
  },
};

export const SingleImage: Story = {
  args: {
    template: {
      type: "gallery",
      inventory: [{ imageSrc: "hosting_image_1", alt: "Image d'hébergement" }],
      features: {
        canFullScreen: false,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Galerie avec une seule image pour la présentation, sans fullscreen.",
      },
    },
  },
};

export const BannerGallery: Story = {
  args: {
    template: {
      type: "gallery",
      inventory: [
        { imageSrc: "accueil_banner_1", alt: "Bannière d'accueil 1" },
        { imageSrc: "contact_banner_1", alt: "Bannière de contact 1" },
        { imageSrc: "contact_banner_2", alt: "Bannière de contact 2" },
        { imageSrc: "prestation_banner_1", alt: "Bannière prestations 1" },
        { imageSrc: "prestation_banner_2", alt: "Bannière prestations 2" },
      ],
      features: {
        canFullScreen: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Galerie avec les bannières du site pour différentes sections, avec fullscreen activé.",
      },
    },
  },
};
