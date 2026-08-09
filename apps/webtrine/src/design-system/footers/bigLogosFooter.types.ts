export interface BigLogosFooterLink {
  label: string;
  url: string;
}

export interface BigLogosFooterLogo {
  name: string;
  alt: string;
  url?: string;
}

export interface BigLogosFooterBrandInfo {
  title: string;
  description: string;
  additionalText?: string;
}

export interface BigLogosFooterMenuSection {
  title: string;
  links: BigLogosFooterLink[];
}

export interface BigLogosFooterProps {
  menuSection?: BigLogosFooterMenuSection;
  brandInfo?: BigLogosFooterBrandInfo;
  logos?: BigLogosFooterLogo[];
}
