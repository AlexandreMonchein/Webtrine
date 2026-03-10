export type Artist = {
  artistName: string;
  mail: string | null;
};

export type TattooContactProps = {
  datas: TattooContactDatas;
};

export type TattooContactDatas = {
  artists: Artist[];
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
  replyTo: string;
};
