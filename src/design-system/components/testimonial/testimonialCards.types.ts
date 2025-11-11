import { Testimonial } from './testimonial.types';

export interface TestimonialCardsProps {
  testimonials: Testimonial[];
  className?: string;
  autoplay?: boolean; // Autoplay activé/désactivé
  autoplayDelay?: number; // Délai entre les slides en ms (défaut: 5000)
  cardsPerSlide?: number; // Nombre de cartes par slide (défaut: 3)
}

export interface TestimonialCardsItemProps {
  testimonial: Testimonial;
  className?: string;
}