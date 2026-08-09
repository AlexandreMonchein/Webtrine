export interface CardData {
  imageSrc: string;
  alt: string;
  description?: string;
}

export interface CardProps {
  data: CardData;
  type?: "default" | "logo";
}

export interface GalleryFeatures {
  canFullScreen?: boolean;
}

export interface GalleryTemplate {
  title?: string;
  description?: string;
  type?: "default" | "logo";
  inventory: CardData[];
  features: GalleryFeatures;
}

export interface GalleryProps {
  template: GalleryTemplate;
}
