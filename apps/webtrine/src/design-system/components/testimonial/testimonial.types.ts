export interface Testimonial {
  id: string;
  name: string;
  position?: string;
  company?: string;
  rating: number; // 1-5 stars
  content: string;
  avatar?: string;
  date?: string;
}

export interface TestimonialComponentProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayDelay?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: "default" | "compact" | "featured";
  className?: string;
}
