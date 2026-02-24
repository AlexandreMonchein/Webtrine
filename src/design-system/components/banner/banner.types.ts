export type TextPosition =
  | "top-left"
  | "center-left"
  | "bottom-left"
  | "center-top"
  | "center"
  | "center-bottom"
  | "top-right"
  | "center-right"
  | "bottom-right";

export interface BannerImage {
  name: string;
  copyright?: {
    url: string;
    title: string;
  };
}

export interface BannerContact {
  type: "call" | "redirect";
  displayedText: string;
  hiddenText: string;
}

export interface BannerFeatures {
  multi?: boolean;
  textPositionFeature?: boolean;
  medium?: boolean;
  mask?: boolean;
}

export interface BannerDatas {
  features: BannerFeatures;
  title?: string;
  subTitle?: string;
  subTitle2?: string;
  images: BannerImage[];
  textPosition?: TextPosition;
  contact?: BannerContact[];
}
