import { useEffect } from "react";
import { useSelector } from "react-redux";

import { getClient } from "../../../store/state.selector";
import { initializeGoogleAnalytics } from "../../../utils/analytics.utils";

/**
 * Composant pour initialiser Google Analytics basé sur le client du store Redux
 */
const GoogleAnalyticsProvider = () => {
  const client = useSelector(getClient);

  useEffect(() => {
    if (client?.name) {
      initializeGoogleAnalytics(client.name);
    }
  }, [client?.name]);

  // Ce composant ne rend rien
  return null;
};

export default GoogleAnalyticsProvider;
