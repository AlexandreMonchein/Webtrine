export type MapPlace = {
  id: number | string;
  address?: string;
  phone?: string | null;
  position: [number, number];
};

export type MapOpenTime = {
  days: string;
  hours: string;
};

export type MapLeafletProps = {
  bigTitle?: string;
  title?: string;
  openTimesTitle?: string;
  openTimes?: MapOpenTime[];
  features?: { isSmall?: boolean };
  places: MapPlace[];
};
