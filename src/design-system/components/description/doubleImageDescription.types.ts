export type DoubleImageDescriptionTextBlock = {
  /** Title of the text block */
  title: string;
  /** Description text */
  description: string;
  /** Navigation link when clicking on the block */
  link: string;
};

export type DoubleImageDescriptionImageBlock = {
  /** Image name (without extension, .webp will be added) relative to assets/{customer}/ */
  image: string;
  /** Alt text for the image */
  imageAlt?: string;
};

export type DoubleImageDescriptionProps = {
  /** Text block for left side (appears at top of left image) */
  leftText: DoubleImageDescriptionTextBlock;
  /** Left image */
  leftImage: DoubleImageDescriptionImageBlock;
  /** Right image (offset upward) */
  rightImage: DoubleImageDescriptionImageBlock;
  /** Text block for right side (appears at bottom of right image) */
  rightText: DoubleImageDescriptionTextBlock;
  /** Test ID for testing */
  "data-testid"?: string;
};
