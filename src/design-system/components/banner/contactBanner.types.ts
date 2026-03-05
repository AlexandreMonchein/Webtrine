export type ContactInfoItem = {
  text: string;
  /** Adds extra spacing below this item */
  withSpacer?: boolean;
};

export type ReviewButton = {
  text: string;
  url: string;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  shape?: "pill" | "rounded";
};

export type ContactBannerMediaData = {
  type: "image" | "video";
  src: string;
  extension?: string;
  alt?: string;
};

export type ContactBannerDatas = {
  title: string;
  media: ContactBannerMediaData;
  infoTitle: string;
  content: ContactInfoItem[];
  reviewButton?: ReviewButton;
};

export type ContactBannerProps = {
  datas: ContactBannerDatas;
};
