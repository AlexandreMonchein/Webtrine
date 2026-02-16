export type Artist = {
  artistName: string;
  mail: string | null;
};

export type TattooContactProps = {
  datas: TattooContactDatas;
};

export type TattooContactDatas = {
  /** Array of artists with their email addresses */
  artists: Artist[];
  /** Service ID for EmailJS */
  serviceId: string;
  /** Template ID for EmailJS */
  templateId: string;
  /** Reply-to email address */
  replyTo: string;
  /** Test ID for testing */
  "data-testid"?: string;
};

export type FormData = {
  artistName: string;
  artistMail: string;
  email: string;
  name: string;
  phone: string;
  object: string;
  description: string;
  tattooSize: string;
  tattooZone: string;
  availability: string;
  budget?: string;
  photos: File[];
};
