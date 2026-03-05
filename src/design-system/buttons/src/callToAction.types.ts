import { ReactNode } from "react";

export interface CallToActionProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  shape?: "pill" | "rounded";
}
