export interface QAItem {
  id: string;
  question: string;
  answer: string;
}

export interface QACategory {
  id: string;
  label: string;
  items: QAItem[];
}

export interface QAFeatures {
  hasCategories?: boolean;
  allowMultipleOpen?: boolean;
  showSearch?: boolean;
}

export interface QAProps {
  features: QAFeatures;
  title?: string;
  subtitle?: string;
  content: {
    categories?: QACategory[];
    items?: QAItem[];
  };
}