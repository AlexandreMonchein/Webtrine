export interface ActionCard {
  id: string;
  title?: string | null;
  description?: string | null;
  imageSrc?: string | null;
  buttons?: {
    label: string;
    type?: string;
    route: string;
    hash?: string;
    id: string;
  }[];
}

export interface ActionCardsListProps {
  features?: {};
  title?: string | null;
  cards: ActionCard[];
}
