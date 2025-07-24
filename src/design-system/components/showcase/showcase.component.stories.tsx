import type { Meta, StoryObj } from '@storybook/react';
import ShowcaseComponent from "./showcase.component";

const meta: Meta<typeof ShowcaseComponent> = {
  component: ShowcaseComponent,
  title: 'Design System/Components/Showcase',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Composant pour afficher une vitrine d\'éléments avec images rondes et descriptions. Adapte automatiquement la mise en page selon le nombre d\'éléments (pair/impair/unique) avec des layouts spécialisés. Idéal pour présenter une équipe, des témoignages, des produits ou des services avec un rendu visuel attrayant.'
      }
    }
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <style>
          {`
            .showcase-container img {
              width: 150px;
              height: 150px;
              object-fit: cover;
            }
            .showcase-container .first-item img {
              width: 200px;
              height: 200px;
            }
            .showcase-container .isSingleItem img {
              width: 250px;
              height: 250px;
            }
          `}
        </style>
        <div className="showcase-container">
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Titre principal de la section'
    },
    images: {
      control: 'object',
      description: 'Tableau d\'objets contenant image (URL), title (nom/titre), et description (texte descriptif)'
    }
  }
};

export default meta;

type Story = StoryObj<typeof ShowcaseComponent>;

export const Default: Story = {
  name: 'Showcase par défaut (3 éléments)',
  args: {
    title: "Notre équipe",
    images: [
      {
        image: "/assets/webtrine/accueil_image_1.webp",
        title: "Alexandre Monschein",
        description: "Développeur Full-Stack passionné par les technologies web modernes et l'accessibilité numérique."
      },
      {
        image: "/assets/webtrine/description_image_1.webp",
        title: "Design UI/UX",
        description: "Création d'interfaces utilisateur intuitives et accessibles pour une expérience optimale."
      },
      {
        image: "/assets/webtrine/accessibility_image_1.webp",
        title: "Accessibilité Web",
        description: "Développement conforme aux standards WCAG pour un web inclusif et accessible à tous."
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration standard avec 3 éléments. Le premier élément (index 0) a un layout spécial en nombre impair, les autres utilisent le layout régulier.'
      }
    }
  }
};

export const SingleItem: Story = {
  name: 'Élément unique',
  args: {
    title: "À propos",
    images: [
      {
        image: "/assets/webtrine/accueil_image_2.webp",
        title: "Webtrine",
        description: "Agence spécialisée dans la création de sites web modernes, performants et accessibles. Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure."
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout spécial pour un élément unique avec mise en page centrée et dimensions adaptées.'
      }
    }
  }
};

export const EvenItems: Story = {
  name: 'Nombre pair (4 éléments)',
  args: {
    title: "Nos services",
    images: [
      {
        image: "/assets/webtrine/description_image_2.webp",
        title: "Développement Web",
        description: "Sites vitrines et applications web sur mesure avec les dernières technologies."
      },
      {
        image: "/assets/webtrine/hosting_image_1.webp",
        title: "Hébergement",
        description: "Solutions d'hébergement sécurisées et performantes pour vos projets web."
      },
      {
        image: "/assets/webtrine/accessibility_image_2.webp",
        title: "Accessibilité",
        description: "Respect des standards d'accessibilité pour un web inclusif et universel."
      },
      {
        image: "/assets/webtrine/accueil_banner_1.webp",
        title: "Maintenance",
        description: "Support technique continu et mises à jour régulières de vos sites."
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout pour nombre pair d\'éléments (4) avec grille équilibrée et espacement uniforme.'
      }
    }
  }
};

export const ManyItems: Story = {
  name: 'Nombreux éléments (5)',
  args: {
    title: "Notre expertise",
    images: [
      {
        image: "/assets/webtrine/accueil_image_1.webp",
        title: "React & TypeScript",
        description: "Développement d'applications modernes avec React et TypeScript pour une base de code robuste."
      },
      {
        image: "/assets/webtrine/description_image_1.webp",
        title: "Design System",
        description: "Création de systèmes de design cohérents et réutilisables avec Storybook."
      },
      {
        image: "/assets/webtrine/accessibility_image_1.webp",
        title: "Tests Automatisés",
        description: "Mise en place de tests unitaires et d'intégration pour assurer la qualité du code."
      },
      {
        image: "/assets/webtrine/hosting_image_1.webp",
        title: "DevOps & CI/CD",
        description: "Automatisation des déploiements et intégration continue pour une livraison efficace."
      },
      {
        image: "/assets/webtrine/description_image_2.webp",
        title: "SEO & Performance",
        description: "Optimisation pour les moteurs de recherche et amélioration des performances web."
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple avec 5 éléments (nombre impair) où le premier élément a un layout spécial et les 4 autres utilisent le layout régulier.'
      }
    }
  }
};

export const WithoutTitle: Story = {
  name: 'Sans titre',
  args: {
    images: [
      {
        image: "/assets/webtrine/accueil_image_1.webp",
        title: "Innovation",
        description: "Toujours à la pointe des dernières technologies et tendances du web."
      },
      {
        image: "/assets/webtrine/description_image_1.webp",
        title: "Qualité",
        description: "Engagement pour l'excellence dans chaque projet que nous réalisons."
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration sans titre principal pour une utilisation flexible dans différents contextes.'
      }
    }
  }
};
