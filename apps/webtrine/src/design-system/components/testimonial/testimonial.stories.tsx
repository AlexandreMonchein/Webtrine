import type { Meta, StoryObj } from "@storybook/react";

import TestimonialComponent from "./testimonial.component";
import type {
  Testimonial,
  TestimonialComponentProps,
} from "./testimonial.types";

// Mock data pour les témoignages
const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Marie Dubois",
    position: "Directrice Marketing",
    company: "TechCorp",
    rating: 5,
    content:
      "Une expérience exceptionnelle ! L'équipe a su comprendre nos besoins et livrer un produit de qualité supérieure. Je recommande vivement leurs services.",
    avatar: "https://i.pravatar.cc/150?img=1",
    date: "2024-01-15",
  },
  {
    id: "2",
    name: "Pierre Martin",
    position: "CEO",
    company: "StartupXYZ",
    rating: 5,
    content:
      "Professionnel, réactif et créatif. Ils ont transformé notre vision en réalité et ont dépassé toutes nos attentes. Un partenaire de confiance.",
    avatar: "https://i.pravatar.cc/150?img=2",
    date: "2024-01-10",
  },
  {
    id: "3",
    name: "Sophie Laurent",
    position: "Product Manager",
    company: "DigitalFlow",
    rating: 4,
    content:
      "Très satisfaite du résultat final. L'équipe a fait preuve d'une grande expertise technique et d'une excellente communication tout au long du projet.",
    avatar: "https://i.pravatar.cc/150?img=3",
    date: "2024-01-05",
  },
  {
    id: "4",
    name: "Alexandre Bernard",
    position: "CTO",
    company: "InnovateNow",
    rating: 5,
    content:
      "Un travail de qualité exceptionnelle. L'attention aux détails et la passion pour l'excellence sont remarquables. Je travaillerai à nouveau avec eux sans hésiter.",
    date: "2023-12-28",
  },
  {
    id: "5",
    name: "Camille Rousseau",
    position: "Fondatrice",
    company: "CreativeStudio",
    rating: 4,
    content:
      "Une collaboration fluide et enrichissante. Ils ont su s'adapter à nos contraintes et proposer des solutions innovantes. Résultat au-delà de nos espérances.",
    avatar: "https://i.pravatar.cc/150?img=5",
    date: "2023-12-20",
  },
];

const meta: Meta<typeof TestimonialComponent> = {
  title: "Design System/Components/Testimonial/Default",
  component: TestimonialComponent,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Composant Testimonial

Un composant carrousel responsive pour afficher les témoignages clients.

## Fonctionnalités

- **Responsive Design**: S'adapte à tous les écrans
- **Navigation**: Flèches et pagination par points
- **Autoplay**: Lecture automatique optionnelle avec contrôles
- **Accessibilité**: Conforme W3C avec support clavier complet
- **Performance**: Optimisé pour éviter les CLS (Cumulative Layout Shift)
- **Variants**: Trois variantes (default, compact, featured)

## Accessibilité

- Navigation au clavier (flèches, Home, End)
- Annonces ARIA pour les lecteurs d'écran
- Support du focus et des états
- Pause automatique au survol/focus

## How to Implement

Pour utiliser ce composant dans votre configuration client, ajoutez-le dans votre fichier \`config/customer/[customer-name]/config.json\` :

\`\`\`json
{
  "type": "testimonial",
  "id": "customerTestimonials",
  "name": "Testimonials",
  "datas": {
    "features": {
      "autoplay": true,
      "autoplayDelay": 5000,
      "showNavigation": true,
      "showPagination": true,
      "variant": "default"
    },
    "testimonials": [
      {
        "id": "1",
        "name": "Marie Dubois",
        "position": "Directrice Marketing",
        "company": "TechCorp",
        "rating": 5,
        "content": "Une expérience exceptionnelle ! L'équipe a su comprendre nos besoins...",
        "avatar": "https://i.pravatar.cc/150?img=1",
        "date": "2024-01-15"
      },
      {
        "id": "2",
        "name": "Pierre Martin",
        "position": "CEO",
        "company": "StartupXYZ",
        "rating": 5,
        "content": "Professionnel, réactif et créatif...",
        "avatar": "https://i.pravatar.cc/150?img=2",
        "date": "2024-01-10"
      }
    ]
  }
}
\`\`\`

### Props disponibles

- **testimonials** (required): Tableau d'objets contenant les témoignages
  - \`id\`: Identifiant unique
  - \`name\`: Nom de la personne
  - \`position\`: Poste (optionnel)
  - \`company\`: Entreprise (optionnel)
  - \`rating\`: Note sur 5 étoiles (1-5)
  - \`content\`: Contenu du témoignage
  - \`avatar\`: URL de l'image (optionnel)
  - \`date\`: Date au format ISO (optionnel)

- **features** (optional):
  - \`autoplay\`: Active la lecture automatique (default: false)
  - \`autoplayDelay\`: Délai en ms entre les slides (default: 5000)
  - \`showNavigation\`: Affiche les flèches de navigation (default: true)
  - \`showPagination\`: Affiche les points de pagination (default: true)
  - \`variant\`: Style du composant - "default", "compact" ou "featured" (default: "default")
        `,
      },
    },
  },
  argTypes: {
    testimonials: {
      description: "Tableau des témoignages à afficher",
      control: { type: "object" },
    },
    autoplay: {
      description: "Active la lecture automatique",
      control: { type: "boolean" },
    },
    autoplayDelay: {
      description: "Délai entre les slides en millisecondes",
      control: { type: "number", min: 1000, max: 10000, step: 500 },
    },
    showNavigation: {
      description: "Affiche les boutons de navigation",
      control: { type: "boolean" },
    },
    showPagination: {
      description: "Affiche la pagination par points",
      control: { type: "boolean" },
    },
    variant: {
      description: "Variante du composant",
      control: { type: "select" },
      options: ["default", "compact", "featured"],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<TestimonialComponentProps>;

// Story par défaut sans autoplay
export const Default: Story = {
  args: {
    testimonials: mockTestimonials,
    autoplay: false,
    autoplayDelay: 5000,
    showNavigation: true,
    showPagination: true,
    variant: "default",
  },
};

// Avec autoplay
export const WithAutoplay: Story = {
  args: {
    testimonials: mockTestimonials,
    autoplay: true,
    autoplayDelay: 5000,
    showNavigation: true,
    showPagination: true,
    variant: "default",
  },
};

// Témoignage unique
export const SingleTestimonial: Story = {
  args: {
    testimonials: [mockTestimonials[0]],
    autoplay: false,
    autoplayDelay: 5000,
    showNavigation: false,
    showPagination: false,
    variant: "default",
  },
};
