import type { StructuredData } from "../hooks/useStructuredData.hooks";

export interface ClientContact {
  name?: string;
  phone?: string;
  email?: string;
  mailTemplate?: string;
}

export interface ClientSocial {
  link: string;
  title?: string;
  color?: string;
}

export interface ClientSocials {
  instagram?: ClientSocial;
  facebook?: ClientSocial;
  linkedin?: ClientSocial;
  tiktok?: ClientSocial;
  [key: string]: ClientSocial | undefined;
}

export interface ClientConfig {
  name: string;
  fullName?: string;
  logo?: string;
  contact?: ClientContact;
  socials?: ClientSocials;
  structuredData?: StructuredData;
}

export interface Template {
  type: string;
  id?: string;
  name?: string;
  datas?: Record<string, unknown>;
}

export interface LayoutFeatures {
  scrollAnimations?: boolean;
  alternateBackground?: boolean;
  animateFirstElement?: boolean;
}

export interface Layout {
  features?: LayoutFeatures;
  templates: Template[];
}

export interface AppConfig {
  client: ClientConfig;
  layout: Layout;
}

export interface StyleConfig {
  [key: string]: string | number;
}

export interface AppProps {
  config: AppConfig;
  style: StyleConfig;
}
