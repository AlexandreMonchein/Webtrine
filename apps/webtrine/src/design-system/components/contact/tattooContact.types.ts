export type Artist = {
  artistName: string;
  mail: string | null;
};

export type AttachmentConfig = {
  maxTotalSizeKB: number;
  maxPhotos: number;
  targetSizePerPhotoKB: number;
  maxResolution: number;
  compressionQuality: number;
};

export type CloudConfig = {
  cloudName: string;
  uploadPreset: string;
  folder?: string;
  maxPhotos: number;
  transformation?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
  };
};

export type ImageDisplayFeature = {
  type: "attachment" | "cloud";
  cloud?: CloudConfig;
  attachment?: AttachmentConfig;
};

export type FeaturesConfig = {
  imagesDisplay: ImageDisplayFeature;
};

export type TattooContactProps = {
  datas: TattooContactDatas;
};

export type TattooContactDatas = {
  artists: Artist[];
  logo: string;
  "data-testid"?: string;
  features?: FeaturesConfig;
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
