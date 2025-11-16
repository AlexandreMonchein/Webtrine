export interface TestimonialQuoteVariant {
  id: string;
  name: string;
  position?: string;
  company?: string;
  rating: number; // 1-5 stars
  content: string;
  avatar?: string;
  date?: string;
}

export interface TestimonialQuoteComponentProps {
  testimonials: TestimonialQuoteVariant[];
  autoplay?: boolean;
  autoplayDelay?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
  className?: string;
}

export interface TestimonialQuoteCardProps {
  testimonial: TestimonialQuoteVariant;
  className?: string;
}
