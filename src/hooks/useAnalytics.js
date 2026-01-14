import { useSelector } from "react-redux";

import { getClient } from "../store/state.selector";
import {
  getGtagId,
  getGtmId,
  setUserProperties,
  trackConversion,
  trackEvent,
  trackPageView,
} from "../utils/analytics.utils";

/**
 * Hook pour utiliser Google Tag Manager / Google Analytics
 */
export const useAnalytics = () => {
  const client = useSelector(getClient);

  /**
   * Track un événement personnalisé
   * @param {string} eventName - Nom de l'événement (ex: 'button_click', 'form_submit')
   * @param {object} parameters - Paramètres additionnels
   */
  const track = (eventName, parameters = {}) => {
    trackEvent(eventName, {
      ...parameters,
      client_name: client?.name,
    });
  };

  /**
   * Track une page vue
   * @param {string} pagePath - Chemin de la page
   * @param {string} pageTitle - Titre de la page
   */
  const trackPage = (pagePath, pageTitle = null) => {
    trackPageView(pagePath, pageTitle);
  };

  /**
   * Track une conversion Google Ads
   * @param {string} conversionId - ID de conversion
   * @param {string} conversionLabel - Label de conversion
   * @param {number} value - Valeur (optionnel)
   * @param {string} currency - Devise (défaut: EUR)
   */
  const trackAdConversion = (
    conversionId,
    conversionLabel,
    value = null,
    currency = "EUR",
  ) => {
    trackConversion(conversionId, conversionLabel, value, currency);
  };

  /**
   * Définir des propriétés utilisateur
   * @param {object} properties - Propriétés (ex: { user_id: '123', user_type: 'premium' })
   */
  const setUserProps = (properties = {}) => {
    setUserProperties({
      ...properties,
      client_name: client?.name,
    });
  };

  const getClientGtmId = () => {
    return client?.name ? getGtmId(client.name) : null;
  };

  const getClientGtagId = () => {
    return client?.name ? getGtagId(client.name) : null;
  };

  return {
    track,
    trackPage,
    trackAdConversion,
    setUserProps,
    getClientGtmId,
    getClientGtagId,
    clientName: client?.name,
  };
};
