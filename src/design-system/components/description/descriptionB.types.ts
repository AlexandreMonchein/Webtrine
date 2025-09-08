export type DescriptionBBox = {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  ariaLabelCta?: string;
};

export type DescriptionBImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export interface DescriptionBContent {
  leftImage: DescriptionBImage;
  rightImage: DescriptionBImage;
  leftBox: DescriptionBBox;
  rightBox: DescriptionBBox;
}

export interface DescriptionBProps {
  id?: string;
  className?: string;
  features?: Record<string, boolean>;
  title?: string | null;
  subTitle?: string | null;
  content: DescriptionBContent;
}
