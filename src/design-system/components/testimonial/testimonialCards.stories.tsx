import type { Meta, StoryObj } from "@storybook/react";

import TestimonialCards from "./testimonialCards.component";
import type { TestimonialCardsProps } from "./testimonialCards.types";

// Note: Les témoignages sont chargés depuis l'API mock dans le composant
// Les données ci-dessous servent uniquement de référence pour la documentation
/*
Example testimonial structure:
{
  id: "1",
  name: "testimonialCards h3 name data-1",
  position: "testimonialCards span position data-1",
  company: "testimonialCards span company data-1",
  rating: 5,
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  avatar: "https://i.pravatar.cc/120?img=1",
  date: "2025-03-19",
}
*/

const meta: Meta<typeof TestimonialCards> = {
  title: "Design System/Components/Testimonial/TestimonialCards",
  component: TestimonialCards,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# TestimonialCards

Un composant pour afficher des témoignages clients sous forme de cartes dans un style similaire à Google Reviews.

## Fonctionnalités

- **Design type Google Reviews**: Petites cartes avec avatar, nom, position, étoiles et date
- **Slider responsive**: 3 cartes côte à côte avec pagination automatique
- **Autoplay**: Défilement automatique des slides
- **Pagination toujours visible**: Points cliquables pour naviguer entre les slides
- **Limitation de texte**: Contenu limité à 3 lignes maximum
- **Gestion des avatars**: Fallback avec initiales si pas d'image

## Configuration

- **autoplay**: Active le défilement automatique (défaut: false)
- **autoplayDelay**: Délai entre les slides en ms (défaut: 5000)
- **Responsive**: Le nombre de cartes par slide s'adapte automatiquement (1 sur mobile, 2 sur tablette, 3 sur desktop)

## How to Implement

Pour utiliser ce composant dans votre configuration client, ajoutez-le dans votre fichier \`config/customer/[customer-name]/config.json\` :

\`\`\`json
{
  "type": "testimonialCards",
  "id": "customerTestimonialCards",
  "name": "Testimonial Cards",
  "datas": {
    "features": {
      "autoplay": true,
      "autoplayDelay": 4000
    },
    "testimonials": [
      {
        "id": "1",
        "name": "testimonialCards h3 name data-1",
        "position": "testimonialCards span position data-1",
        "company": "testimonialCards span company data-1",
        "rating": 5,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        "avatar": "https://i.pravatar.cc/120?img=1",
        "date": "2025-03-19"
      },
      {
        "id": "2",
        "name": "testimonialCards h3 name data-2",
        "position": "testimonialCards span position data-2",
        "company": "testimonialCards span company data-2",
        "rating": 5,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        "avatar": "https://i.pravatar.cc/120?img=2",
        "date": "2025-02-15"
      },
      {
        "id": "3",
        "name": "testimonialCards h3 name data-3",
        "position": "testimonialCards span position data-3",
        "company": "",
        "rating": 4,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        "avatar": "https://i.pravatar.cc/120?img=3",
        "date": "2025-01-28"
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
  - \`content\`: Contenu du témoignage (limité à 3 lignes)
  - \`avatar\`: URL de l'image (optionnel, affiche les initiales si absent)
  - \`date\`: Date au format ISO (optionnel)

- **features** (optional):
  - \`autoplay\`: Active le défilement automatique (default: false)
  - \`autoplayDelay\`: Délai en ms entre les slides (default: 5000)

### Responsive Behavior

- **Mobile**: 1 carte par slide
- **Tablette**: 2 cartes par slide
- **Desktop**: 3 cartes par slide
        `,
      },
    },
  },
  argTypes: {
    title: {
      description: "Titre de la section",
      control: { type: "text" },
    },
    features: {
      description: "Options de configuration (autoplay, autoplayDelay)",
      control: { type: "object" },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<TestimonialCardsProps>;

// Sans autoplay
export const Default: Story = {
  args: {
    dataId: "testimonialCards-1",
    features: {
      autoplay: false,
      autoplayDelay: 2000,
    },
  },
};

// Avec autoplay activé
export const WithAutoplay: Story = {
  args: {
    dataId: "testimonialCards-2",
    features: {
      autoplay: true,
      autoplayDelay: 2000,
    },
  },
};
