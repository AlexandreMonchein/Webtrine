import type { MapLeafletProps } from "../map/moduleLeafletMap.types";

export type DefaultContactProps = {
  datas?: {
    map?: { datas: MapLeafletProps } | null;
  };
};
