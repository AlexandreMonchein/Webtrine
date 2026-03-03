export type ContactInfoItem = {
  text: string;
  /** Adds extra spacing below this item */
  withSpacer?: boolean;
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
};

export type ContactBannerProps = {
  datas: ContactBannerDatas;
};
