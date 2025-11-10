export interface NavItem {
  label: string;
  href?: string;
  subItems?: SubNavItem[];
}

export interface SubNavItem {
  label: string;
  href: string;
  description?: string;
}

export interface LogoConfig {
  name: string;
  alt: string;
}

export interface ModernNavbarProps {
  logo: LogoConfig;
  navigationItems: NavItem[];
}