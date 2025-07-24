import FlippingCardComponent from "./flippingCard.component";

const meta = {
  component: FlippingCardComponent,
  title: 'Design System/Components/Cards/FlippingCard',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = Record<string, any>;

export const Default: Story = {
  args: {
    title: "Nos Services",
    images: [
      {
        image: "/assets/webtrine/accueil_image_1.webp",
        title: "Service Web",
        description: "Nous créons des sites vitrines modernes, responsifs et optimisés pour le référencement. Chaque site est conçu selon vos besoins spécifiques avec les dernières technologies."
      }
    ],
  },
};

export const WithoutTitle: Story = {
  args: {
    images: [
      {
        image: "/assets/webtrine/accueil_image_2.webp",
        title: "Design UX/UI",
        description: "Interface moderne centrée sur l'expérience utilisateur avec un design élégant et intuitif."
      }
    ],
  },
};

export const LongContent: Story = {
  args: {
    title: "Solutions Techniques",
    images: [
      {
        image: "/assets/webtrine/description_image_1.webp",
        title: "Développement Complet",
        description: "Nous utilisons les dernières technologies web pour garantir des performances optimales, une sécurité renforcée et une compatibilité parfaite avec tous les navigateurs et appareils. Notre approche moderne assure la scalabilité et la maintenabilité de vos projets."
      }
    ],
  },
};

export const MultipleCards: Story = {
  args: {
    title: "Notre Portfolio",
    images: [
      {
        image: "/assets/webtrine/description_image_2.webp",
        title: "Site E-commerce",
        description: "Plateforme e-commerce complète avec gestion des commandes, paiements sécurisés et interface d'administration."
      },
      {
        image: "/assets/webtrine/accessibility_image_1.webp",
        title: "Application Accessible",
        description: "Application web respectant les standards d'accessibilité avec interface utilisateur optimisée pour tous."
      },
      {
        image: "/assets/webtrine/hosting_image_1.webp",
        title: "Solutions d'Hébergement",
        description: "Infrastructure cloud sécurisée avec haute disponibilité et performances optimales pour vos projets."
      }
    ],
  },
};
