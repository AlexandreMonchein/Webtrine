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

  // --- Load GA script dynamically ---
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gtag_id}`;
  document.head.appendChild(script);

  // Initialise dataLayer + gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  // Required: GA initialization
  gtag("js", new Date());

  // 👉 Add traffic_type = "internal" in development only
  if (import.meta.env.DEV) {
    console.warn(">>> GA dev mode: marking traffic as internal");
    gtag("set", { traffic_type: "internal" });
  }

  // GA config
  gtag("config", gtag_id, {
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
 */
export const trackEvent = (action, parameters = {}) => {
  if (window.gtag) {
    window.gtag("event", action, parameters);
  }
};

/**
 * Récupère l'ID Google Analytics pour un client
 */
export const getGtagId = (customerName) => {
  return GTAG_CONFIG[customerName] || null;
};
