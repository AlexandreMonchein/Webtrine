export type AlertViewProps = {
  logo?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaIcon?: string;
  ctaPosition?: "left" | "right";
  onClose?: () => void;
};
