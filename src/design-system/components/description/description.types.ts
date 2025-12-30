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
  description?: string;
}

export interface DescriptionFeatures {
  isReversed?: boolean;
  isContinious?: boolean;
  isCentered?: boolean;
  isTextBefore?: boolean;
}

export interface DescriptionProps {
  type: "description";
  features: DescriptionFeatures;
  title?: string;
  hash?: string;
  content: DescriptionContentItem[];
  images?: DescriptionImage[];
}
