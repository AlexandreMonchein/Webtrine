import { useSelector } from "react-redux";

import { getClient } from "../store/state.selector";
import { getGtagId, trackEvent } from "./analytics.utils";

/**
 * Hook pour utiliser Google Analytics
 */
export const useAnalytics = () => {
  const client = useSelector(getClient);

  const track = (action, parameters = {}) => {
    trackEvent(action, {
      ...parameters,
      client_name: client?.name,
    });
  };

  const getClientGtagId = () => {
    return client?.name ? getGtagId(client.name) : null;
  };

  return {
    track,
    getClientGtagId,
    clientName: client?.name,
  };
};
