export interface DescriptionContentText {
  text: string;
}

export interface DescriptionContentButton {
  button: {
    label: string;
    to: string;
  };
}

export type DescriptionContentItem =
  | DescriptionContentText
  | DescriptionContentButton;

export interface DescriptionImage {
  name: string;
  alt: string;
  focusable: boolean;
}

export interface DescriptionFeatures {
  isReversed?: boolean;
  isContinious?: boolean;
}

export interface DescriptionProps {
  type: "description";
  features: DescriptionFeatures;
  title?: string;
  hash?: string;
  content: DescriptionContentItem[];
  image?: DescriptionImage;
}
