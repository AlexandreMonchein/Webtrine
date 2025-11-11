import type { Meta, StoryObj } from '@storybook/react';
import TestimonialQuoteComponent from './testimonialQuote.component';
import type { TestimonialQuoteComponentProps, TestimonialQuoteVariant } from './testimonialQuote.types';

// Mock data pour les témoignages
const mockTestimonialsQuote: TestimonialQuoteVariant[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    position: 'Directrice Marketing',
    company: 'TechCorp',
    rating: 5,
    content: 'Une expérience exceptionnelle ! L\'équipe a su comprendre nos besoins et livrer un produit de qualité supérieure. Je recommande vivement leurs services.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Pierre Martin',
    rating: 5,
    content: 'Professionnel, réactif et créatif. Ils ont transformé notre vision en réalité et ont dépassé toutes nos attentes. Un partenaire de confiance.',
    avatar: 'https://i.pravatar.cc/150?img=2',
    date: '2024-01-10'
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    position: 'Product Manager',
    company: 'DigitalFlow',
    rating: 4,
    content: 'Très satisfaite du résultat final. L\'équipe a fait preuve d\'une grande expertise technique et d\'une excellente communication tout au long du projet.',
    avatar: 'https://i.pravatar.cc/150?img=3',
    date: '2024-01-05'
  }
];

const meta: Meta<typeof TestimonialQuoteComponent> = {
  title: 'Design System/Components/Testimonial/TestimonialQuote',
  component: TestimonialQuoteComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Composant TestimonialQuote

Une variante du composant testimonial avec le message en grand en haut et les informations auteur centrées en dessous.

## Fonctionnalités

- **Layout Quote**: Message mis en avant en grand format
- **Design Centré**: Informations auteur en flex centré
- **Responsive Design**: S'adapte à tous les écrans
- **Navigation**: Flèches et pagination par points
- **Autoplay**: Lecture automatique optionnelle
- **Accessibilité**: Conforme W3C avec support clavier complet

## Structure

1. Citation en grand format avec guillemets stylisés
2. Avatar plus grand (80px → 96px sur desktop)
3. Informations auteur centrées en flex
4. Notation par étoiles
        `
      }
    }
  },
  argTypes: {
    testimonials: {
      description: 'Tableau des témoignages à afficher',
      control: { type: 'object' }
    },
    autoplay: {
      description: 'Active la lecture automatique',
      control: { type: 'boolean' }
    },
    autoplayDelay: {
      description: 'Délai entre les slides en millisecondes',
      control: { type: 'number', min: 1000, max: 10000, step: 500 }
    },
    showPagination: {
      description: 'Affiche la pagination par points',
      control: { type: 'boolean' }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<TestimonialQuoteComponentProps>;

// Story par défaut sans autoplay
export const Default: Story = {
  args: {
    testimonials: mockTestimonialsQuote,
    autoplay: false,
    autoplayDelay: 5000,
    showPagination: true
  }
};

// Avec autoplay
export const WithAutoplay: Story = {
  args: {
    testimonials: mockTestimonialsQuote,
    autoplay: true,
    autoplayDelay: 4000,
    showPagination: true
  }
};

// Témoignage unique
export const SingleTestimonial: Story = {
  args: {
    testimonials: [mockTestimonialsQuote[0]],
    autoplay: false,
    autoplayDelay: 5000,
    showPagination: false
  }
};