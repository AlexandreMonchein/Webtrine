export type FooterLogo = {
  /** Logo filename without extension (.webp added automatically) */
  name: string;
  /** Logo shape affects dimensions (square: 48x48, horizontal: 72x32) */
  shape: "square" | "horizontal";
  alt: string;
  link: string;
};

export type SocialItem = {
  name: string;
  link: string;
  color: string;
};

export type LegalItem = {
  type: string;
  datas: {
    type: string;
  };
};

export type ClassicFooterProps = {
  logo?: FooterLogo;
};
