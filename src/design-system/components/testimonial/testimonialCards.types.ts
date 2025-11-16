import { Testimonial } from "./testimonial.types";

export interface TestimonialCardsProps {
  testimonials: Testimonial[];
  className?: string;
  autoplay?: boolean; // Autoplay activé/désactivé
  autoplayDelay?: number; // Délai entre les slides en ms (défaut: 5000)
  // cardsPerSlide est géré automatiquement selon la taille d'écran (1/2/3)
}

export interface TestimonialCardsItemProps {
  testimonial: Testimonial;
  className?: string;
}
