export type DescriptionBMediaType = "image" | "video";

export interface DescriptionBTextItem {
  /** Text content for a paragraph */
  text: string;
}

export interface DescriptionBMedia {
  /** Type of media to display */
  type: DescriptionBMediaType;
  /** Source URL for the media (image or video) */
  src: string;
  /** File extension for video (e.g., 'mp4', 'gif') */
  extension?: string;
  /** Alt text for image or video */
  alt?: string;
}

export interface DescriptionBDatas {
  /** Media to display on the left side */
  media: DescriptionBMedia;
  /** Title displayed above the description */
  title: string;
  /** Array of text paragraphs for the description */
  description: DescriptionBTextItem[];
  /** Test ID for testing */
  "data-testid"?: string;
}

export interface DescriptionBProps {
  /** Component data */
  datas: DescriptionBDatas;
}
