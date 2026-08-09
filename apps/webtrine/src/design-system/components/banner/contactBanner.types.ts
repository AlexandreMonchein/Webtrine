export type ContactInfoItem = {
  text: string;
  /** Adds extra spacing below this item */
  withSpacer?: boolean;
  /** Optional icon/logo name to display before the text */
  logo?: string;
  /** Optional link URL to make the item clickable */
  link?: string;
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

export type ContactBannerInfoTitle =
  | string
  | {
      type: "logo";
      name: string;
      alt?: string;
    };

export type ContactBannerDatas = {
  title: string;
  media: ContactBannerMediaData;
  infoTitle: ContactBannerInfoTitle;
  content: ContactInfoItem[];
  reviewButton?: ReviewButton;
};

export type ContactBannerProps = {
  datas: ContactBannerDatas;
};
