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
  contact: string;
  additionalText?: string;
}

export interface BigLogosFooterMenuSection {
  title: string;
  links: BigLogosFooterLink[];
}

export interface BigLogosFooterFeatures {
  showSocialLinks?: boolean;
  showBrandInfo?: boolean;
  showMenuSection?: boolean;
  showLogos?: boolean;
}

export interface BigLogosFooterProps {
  type: "bigLogosFooter";
  features: BigLogosFooterFeatures;
  content: {
    menuSection?: BigLogosFooterMenuSection;
    brandInfo?: BigLogosFooterBrandInfo;
    logos?: BigLogosFooterLogo[];
  };
}