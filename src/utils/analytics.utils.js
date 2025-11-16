// Configuration Google Analytics par client
const GTAG_CONFIG = {
  webtrine: "G-FBCHRQGJN7",
  chillpaws: "G-P24R0YD2NT",
  dipaolo: "G-PST3W53K46",
};

/**
 * Initialise Google Analytics pour le client spécifique
 * @param {string} customerName - Nom du client
 */
export const initializeGoogleAnalytics = (customerName) => {
  const gtag_id = GTAG_CONFIG[customerName];

  if (!gtag_id) {
    console.warn(
      `>>> No Google Analytics ID configured for customer: ${customerName}`,
    );
    return;
  }

  // Vérifier si gtag est déjà chargé
  if (window.gtag) {
    console.warn(`>>> Google Analytics already initialized`);
    return;
  }

  // Créer et ajouter le script gtag.js
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gtag_id}`;
  document.head.appendChild(script);

  // Initialiser dataLayer et gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  // Exposer gtag globalement
  window.gtag = gtag;

  // Configuration
  gtag("js", new Date());
  gtag("config", gtag_id, {
    // Vous pouvez ajouter des options spécifiques par client ici
    send_page_view: true,
    anonymize_ip: true,
  });

  console.warn(
    `>>> Google Analytics initialized for ${customerName} with ID: ${gtag_id}`,
  );
};

/**
 * Envoie un événement personnalisé à Google Analytics
 * @param {string} action - Action de l'événement
 * @param {object} parameters - Paramètres de l'événement
 */
export const trackEvent = (action, parameters = {}) => {
  if (window.gtag) {
    window.gtag("event", action, parameters);
  }
};

/**
 * Récupère l'ID Google Analytics pour un client
 * @param {string} customerName - Nom du client
 * @returns {string|null} - ID Google Analytics ou null
 */
export const getGtagId = (customerName) => {
  return GTAG_CONFIG[customerName] || null;
};
