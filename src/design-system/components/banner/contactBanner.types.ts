export type ContactInfoItem = {
  /** Text content for the information item */
  text: string;
  /** Add spacing below this text element */
  withSpacer?: boolean;
};

export type ContactBannerMediaData = {
  /** Media type (image or video) */
  type: "image" | "video";
  /** Source path for the media */
  src: string;
  /** Media extension */
  extension?: string;
  /** Alt text for accessibility */
  alt?: string;
};

export type ContactBannerDatas = {
  /** Main title displayed at the top (h2) */
  title: string;
  /** Media data for the banner (image or video) */
  media: ContactBannerMediaData;
  /** Title for the information box (h3) */
  infoTitle: string;
  /** Array of information items to display */
  content: ContactInfoItem[];
  /** Test ID for testing */
  "data-testid"?: string;
};

export type ContactBannerProps = {
  datas: ContactBannerDatas;
};
