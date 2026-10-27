export type LegalsProps = {
  /** Type of legal content to display */
  type?: string | null;
};

export type LegalsContentItem = {
  title: string;
  texts: string[];
};

export type LegalsDatas = {
  type: string;
  title: string;
  subTitle: string;
  disclaimer?: string | null;
  content: LegalsContentItem[];
};
