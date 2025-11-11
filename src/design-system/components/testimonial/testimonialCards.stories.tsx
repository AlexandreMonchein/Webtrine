import type { Meta, StoryObj } from "@storybook/react";
import TestimonialCards from "./testimonialCards.component";
import type { TestimonialCardsProps } from "./testimonialCards.types";
import type { Testimonial } from "./testimonial.types";

// Mock data pour les témoignages
const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Lucie R",
    position: "Propriétaire d'animaux",
    company: "",
    rating: 5,
    content: "Je fais appel à Géna pour s'occuper de mon chat et de mon chien depuis 3 ans, pour des vacances mais aussi pour des passages ponctuels en journée. Elle s'est même occupée des gerbilles de nos amis deux ans de suite ! Elle est vraiment extra et fiable. Mes animaux l'adorent et moi je suis toujours parfaitement rassurée de lui confier.",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocIZwACmylt2HYVfqftVCS5_oBww8VBbqdXE65MQ5XC3K7Z1sw=s120-c-rp-mo-br100",
    date: "2025-03-19"
  },
  {
    id: "2",
    name: "Marie D",
    position: "Directrice Marketing",
    company: "Tech Corp",
    rating: 5,
    content: "Service exceptionnel ! L'équipe est très professionnelle et réactive. Je recommande vivement pour tous vos besoins. Ils ont dépassé nos attentes.",
    avatar: "https://i.pravatar.cc/120?img=1",
    date: "2025-02-15"
  },
  {
    id: "3",
    name: "Thomas L",
    position: "Entrepreneur",
    company: "",
    rating: 4,
    content: "Très satisfait du service rendu. L'accompagnement personnalisé et la qualité du travail fourni sont remarquables.",
    avatar: "https://i.pravatar.cc/120?img=3",
    date: "2025-01-28"
  },
  {
    id: "4",
    name: "Sophie M",
    position: "Chef de projet",
    company: "Digital Agency",
    rating: 5,
    content: "Une collaboration fantastique ! L'expertise technique et l'approche humaine font la différence. Je recommande sans hésiter.",
    avatar: "https://i.pravatar.cc/120?img=5",
    date: "2025-01-10"
  },
  {
    id: "5",
    name: "Alexandre B",
    position: "Développeur",
    company: "",
    rating: 5,
    content: "Excellent service client et résultats au-delà de nos espérances. Une équipe compétente et à l'écoute.",
    date: "2024-12-20"
  },
  {
    id: "6",
    name: "Claire F",
    position: "Responsable Communication",
    company: "StartupCo",
    rating: 4,
    content: "Très bonne expérience globale. La communication était fluide et les délais respectés. Je referai appel à leurs services.",
    avatar: "https://i.pravatar.cc/120?img=9",
    date: "2024-11-30"
  },
  {
    id: "7",
    name: "Julien P",
    position: "Consultant",
    company: "",
    rating: 5,
    content: "Une équipe professionnelle et dévouée. Ils ont su comprendre nos besoins et livrer un travail de qualité.",
    avatar: "https://i.pravatar.cc/120?img=10",
    date: "2024-11-15"
  },
  {
    id: "8",
    name: "Emma S",
    position: "Designer",
    company: "Creative Studio",
    rating: 5,
    content: "Collaboration fluide et résultats impressionnants. Leur créativité et leur expertise sont un atout majeur.",
    avatar: "https://i.pravatar.cc/120?img=12",
    date: "2024-10-25"
  },
  {
    id: "9",
    name: "Nicolas G",
    position: "Manager",
    company: "",
    rating: 4,
    content: "Service de qualité avec une équipe réactive. Je suis globalement très satisfait de notre collaboration.",
    date: "2024-10-10"
  }
];

const meta: Meta<typeof TestimonialCards> = {
  title: "Design System/Components/Testimonial/TestimonialCards",
  component: TestimonialCards,
  parameters: {
    layout: "padded",
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
- **cardsPerSlide**: Nombre de cartes par slide (défaut: 3)
        `,
      },
    },
  },
  argTypes: {
    testimonials: {
      description: "Liste des témoignages à afficher",
      control: { type: "object" },
    },
    autoplay: {
      description: "Active le défilement automatique",
      control: { type: "boolean" },
    },
    autoplayDelay: {
      description: "Délai entre les slides en ms",
      control: { type: "number", min: 1000, max: 10000, step: 500 },
    },
    cardsPerSlide: {
      description: "Nombre de cartes par slide",
      control: { type: "number", min: 1, max: 6 },
    },
    className: {
      description: "Classe CSS personnalisée",
      control: { type: "text" },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<TestimonialCardsProps>;

// Avec autoplay activé
export const Default: Story = {
  args: {
    testimonials: mockTestimonials,
    autoplay: false,
    autoplayDelay: 3000,
    cardsPerSlide: 3,
  },
};

export const WithAutoplay: Story = {
  args: {
    testimonials: mockTestimonials,
    autoplay: true,
    autoplayDelay: 4000,
    cardsPerSlide: 3,
  },
};
