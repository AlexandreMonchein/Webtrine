export interface ActionCard {
  id: string;
  title?: string | null;
  description?: string | null;
  imageSrc?: string | null;
  buttons?: {
    label: string;
    route: string;
  }[];
}

export interface ActionCardsListProps {
  sectionTitle?: string | null;
  cards: ActionCard[];
}
