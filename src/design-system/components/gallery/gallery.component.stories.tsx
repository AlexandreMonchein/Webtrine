import type { Meta, StoryObj } from '@storybook/react';
import GalleryComponent from "./gallery.component";

const meta: Meta<typeof GalleryComponent> = {
  component: GalleryComponent,
  title: 'Design System/Components/Gallery/Gallery',
  parameters: {
    docs: {
      description: {
        component: 'Composant Gallery pour afficher une collection d\'images avec différents types de mise en page.'
      }
    }
  },
  argTypes: {
    template: {
      description: 'Configuration de la galerie avec type et inventaire des images'
    }
  }
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
        { imageSrc: "description_image_2", alt: "Image de description 2" }
      ]
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Galerie par défaut avec plusieurs images du site.'
      }
    }
  }
};

export const LogoGallery: Story = {
  args: {
    template: {
      type: "logo",
      inventory: [
        { imageSrc: "clients/dipaolo", alt: "Client DiPaolo" },
        { imageSrc: "webtrine_storybook", alt: "Logo Webtrine" }
      ]
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Galerie spécialisée pour l\'affichage de logos clients avec un style adapté.'
      }
    }
  }
};

export const SmallGallery: Story = {
  args: {
    template: {
      type: "gallery",
      inventory: [
        { imageSrc: "accessibility_image_1", alt: "Image accessibilité 1" },
        { imageSrc: "accessibility_image_2", alt: "Image accessibilité 2" }
      ]
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Petite galerie avec seulement quelques images.'
      }
    }
  }
};

export const SingleImage: Story = {
  args: {
    template: {
      type: "gallery",
      inventory: [
        { imageSrc: "hosting_image_1", alt: "Image d'hébergement" }
      ]
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Galerie avec une seule image pour la présentation.'
      }
    }
  }
};

export const BannerGallery: Story = {
  args: {
    template: {
      type: "gallery",
      inventory: [
        { imageSrc: "accueil_banner_1", alt: "Bannière d'accueil 1" },
        { imageSrc: "accueil_banner_2", alt: "Bannière d'accueil 2" },
        { imageSrc: "contact_banner_1", alt: "Bannière de contact 1" },
        { imageSrc: "contact_banner_2", alt: "Bannière de contact 2" },
        { imageSrc: "prestation_banner_1", alt: "Bannière prestations 1" },
        { imageSrc: "prestation_banner_2", alt: "Bannière prestations 2" }
      ]
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Galerie avec les bannières du site pour différentes sections.'
      }
    }
  }
};
