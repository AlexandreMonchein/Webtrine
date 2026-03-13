export interface SubCategory {
  name: string;
  link: string;
}

export interface Category {
  name: string;
  link?: string;
  sub?: SubCategory[];
}

export interface LogoConfig {
  /** Filename without extension (.webp added automatically) */
  name: string;
  /** Logo shape affects dimensions */
  shape?: "square" | "horizontal" | "vertical";
}

export interface CalendlyConfig {
  url: string | null;
}

export interface ActionButton {
  type: "call";
  displayedText: string;
  hiddenText: string;
}

export interface NavbarFeatures {
  isFixed: boolean;
  hasHideOnScroll: boolean;
  trad: boolean;
  darkMode: boolean;
  shouldDisplaySocials?: boolean;
}

export interface NavbarContent {
  logo: LogoConfig;
  calendly?: CalendlyConfig;
}

export interface ClassicNavbarProps {
  features: NavbarFeatures;
  categories: Category[];
  content: NavbarContent;
  actionButton?: ActionButton;
  toggleTheme?: () => void;
  theme?: string;
}
