import type { Meta, StoryObj } from '@storybook/react';
import DisplayComponent from "./display.component";

const meta: Meta<typeof DisplayComponent> = {
  component: DisplayComponent,
  title: 'Design System/Components/Display/Display',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Composant pour afficher une grille de fonctionnalités avec icônes SVG et texte descriptif. Charge dynamiquement les composants d\'icônes depuis le dossier assets/icons. Idéal pour présenter des services, avantages ou caractéristiques avec support visuel.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Titre principal de la section'
    },
    content: {
      control: 'object',
      description: 'Tableau d\'objets contenant name (nom de l\'icône) et text (description). Les icônes sont chargées depuis assets/icons/{name}.component.tsx'
    }
  }
};

export default meta;

type Story = StoryObj<typeof DisplayComponent>;

export const Default: Story = {
  name: 'Affichage par défaut',
  args: {
    title: "Nos services",
    content: [
      {
        name: "websiteCreation",
        text: "Création de sites web modernes et responsifs"
      },
      {
        name: "quality",
        text: "Qualité et excellence dans chaque projet"
      },
      {
        name: "support",
        text: "Support technique continu et réactif"
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration standard avec 3 éléments affichant des icônes et du texte descriptif en grille.'
      }
    }
  }
};

export const ManyItems: Story = {
  name: 'Nombreux éléments',
  args: {
    title: "Toutes nos prestations",
    content: [
      {
        name: "websiteCreation",
        text: "Création de sites web"
      },
      {
        name: "quality",
        text: "Assurance qualité"
      },
      {
        name: "support",
        text: "Support technique"
      },
      {
        name: "colorPalette",
        text: "Design graphique"
      },
      {
        name: "domain",
        text: "Gestion de domaine"
      },
      {
        name: "euro",
        text: "Tarifs compétitifs"
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple avec 6 éléments pour tester l\'affichage en grille avec plus de contenu.'
      }
    }
  }
};

export const SocialNetworks: Story = {
  name: 'Réseaux sociaux',
  args: {
    title: "Suivez-nous sur nos réseaux",
    content: [
      {
        name: "facebook",
        text: "Retrouvez-nous sur Facebook"
      },
      {
        name: "instagram",
        text: "Nos créations sur Instagram"
      },
      {
        name: "linkedin",
        text: "Notre actualité professionnelle"
      },
      {
        name: "youtube",
        text: "Tutoriels et démonstrations"
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple thématique utilisant les icônes de réseaux sociaux disponibles.'
      }
    }
  }
};
