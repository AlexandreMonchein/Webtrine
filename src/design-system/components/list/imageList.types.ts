export type ImageItem = {
  src: string;
  alt: string;
  link: string;
};

export type ImageListProps = {
  title?: string;
  subtitle?: string;
  images: ImageItem[];
  "data-testid"?: string;
};
