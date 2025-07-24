import type { Meta, StoryObj } from '@storybook/react';
import ImageListComponent from "./imageList.component";

const meta: Meta<typeof ImageListComponent> = {
  component: ImageListComponent,
  title: 'Design System/Components/List/ImageList',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Composant pour afficher une liste horizontale d\'images avec défilement automatique et boutons de navigation. Supporte les overlays avec boutons d\'action et s\'adapte automatiquement au contenu. Idéal pour présenter des clients, partenaires ou galeries de projets.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Titre principal de la section'
    },
    subtitle: {
      control: 'text',
      description: 'Sous-titre optionnel'
    },
    images: {
      control: 'object',
      description: 'Tableau d\'images avec src (nom du fichier), alt (texte alternatif), et link (URL de destination). Les images sont chargées depuis assets/{customer}/clients/'
    },
    features: {
      control: 'object',
      description: 'Configuration optionnelle pour personnaliser le comportement'
    }
  }
};

export default meta;

type Story = StoryObj<typeof ImageListComponent>;

export const Default: Story = {
  name: 'Liste d\'images par défaut',
  args: {
    title: "Ils nous ont fait confiance",
    subtitle: null,
    images: [
      {
        alt: "Logo entreprise cliente: Di Paolo",
        link: "https://www.labodipaolo.com",
        src: "dipaolo"
      }
    ],
    features: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration de base avec une seule image. L\'overlay avec bouton "Consulter" apparaît au survol.'
      }
    }
  }
};

export const WithSubtitle: Story = {
  name: 'Avec sous-titre',
  args: {
    title: "Nos références",
    subtitle: "Une sélection de nos projets réalisés avec succès",
    images: [
      {
        alt: "Logo entreprise cliente: Di Paolo - Laboratoire pharmaceutique",
        link: "https://www.labodipaolo.com",
        src: "dipaolo"
      }
    ],
    features: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple avec titre et sous-titre pour donner plus de contexte à la liste d\'images.'
      }
    }
  }
};

export const MultipleImages: Story = {
  name: 'Plusieurs images avec défilement',
  args: {
    title: "Notre portfolio clients",
    subtitle: "Découvrez les entreprises qui nous font confiance",
    images: [
      {
        alt: "Logo entreprise cliente: Di Paolo - Laboratoire pharmaceutique",
        link: "https://www.labodipaolo.com",
        src: "dipaolo"
      },
      // Exemples avec placeholder pour démonstration du défilement
      {
        alt: "Logo client - Entreprise technologique",
        link: "#",
        src: "dipaolo" // Réutilisation pour la demo
      },
      {
        alt: "Logo partenaire - Agence créative",
        link: "#",
        src: "dipaolo" // Réutilisation pour la demo
      },
      {
        alt: "Logo client - Start-up innovante",
        link: "#",
        src: "dipaolo" // Réutilisation pour la demo
      },
      {
        alt: "Logo partenaire - Grande entreprise",
        link: "#",
        src: "dipaolo" // Réutilisation pour la demo
      }
    ],
    features: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple avec plusieurs images pour démontrer le défilement horizontal automatique et les boutons de navigation. Les boutons de défilement apparaissent automatiquement quand le contenu dépasse la largeur du conteneur.'
      }
    }
  }
};

export const EmptyState: Story = {
  name: 'État vide',
  args: {
    title: "Nos clients",
    subtitle: "Bientôt de nouvelles références",
    images: [],
    features: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Test du comportement avec un tableau d\'images vide. Le composant ne s\'affiche pas (return null) dans ce cas.'
      }
    }
  }
};
