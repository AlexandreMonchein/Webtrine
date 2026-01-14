// Configuration Google Tag Manager par client
const GTM_CONFIG = {
  webtrine: "GTM-PTTB4FPQ",
  dipaolo: "GTM-PNG7622N",
  chillpaws: "GTM-PF9XDS7F",
};

// Configuration Google Analytics par client (backup si GTM n'est pas utilisé)
const GTAG_CONFIG = {
  webtrine: "G-FBCHRQGJN7",
  dipaolo: "G-PST3W53K46",
  chillpaws: "G-P24R0YD2NT",
};

/**
 * Initialise Google Tag Manager pour le client spécifique
 * @param {string} customerName - Nom du client
 */
export const initializeGTM = (customerName) => {
  const gtm_id = GTM_CONFIG[customerName];

  if (!gtm_id) {
    console.warn(
      `>>> No Google Tag Manager ID configured for customer: ${customerName}`,
    );
    return;
  }

  // Vérifier si GTM est déjà chargé
  if (window.google_tag_manager) {
    console.warn(`>>> Google Tag Manager already initialized`);
    return;
  }

  // --- Initialize dataLayer FIRST (before GTM script) ---
  window.dataLayer = window.dataLayer || [];

  // 👉 Add development flag in dataLayer if in DEV mode
  if (import.meta.env.DEV) {
    window.dataLayer.push({
      environment: "development",
      traffic_type: "internal",
    });
    console.warn(">>> GTM dev mode: marking traffic as internal");
  }

  // --- Load GTM script dynamically in <head> ---
  const script = document.createElement("script");
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtm_id}');
  `;
  document.head.insertBefore(script, document.head.firstChild);

  // --- Add GTM noscript fallback in <body> ---
  const noscript = document.createElement("noscript");
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtm_id}`;
  iframe.height = "0";
  iframe.width = "0";
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";
  noscript.appendChild(iframe);

  // Insérer juste après l'ouverture du <body>
  if (document.body.firstChild) {
    document.body.insertBefore(noscript, document.body.firstChild);
  } else {
    document.body.appendChild(noscript);
  }

  console.warn(`>>> Google Tag Manager initialized for ${customerName}`);

  if (import.meta.env.DEV) {
    console.warn(`>>> GTM dev mode info: with ID: ${gtm_id}`);
  }
};

/**
 * Initialise Google Analytics pour le client spécifique
 * @param {string} customerName - Nom du client
 */
export const initializeGA = (customerName) => {
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

  console.warn(`>>> Google Analytics initialized for ${customerName}`);

  if (import.meta.env.DEV) {
    console.warn(`>>> GA dev mode info: with ID: ${gtag_id}`);
  }
};

/**
 * Envoie un événement personnalisé à Google Tag Manager / Google Analytics
 * @param {string} eventName - Nom de l'événement (ex: 'form_submit', 'button_click', 'purchase')
 * @param {object} parameters - Paramètres supplémentaires de l'événement
 */
export const trackEvent = (eventName, parameters = {}) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
    console.warn(`>>> Event tracked: ${eventName}`, parameters);
  } else {
    console.warn(
      `>>> dataLayer not available. Event not tracked: ${eventName}`,
    );
  }
};

/**
 * Envoie un événement de conversion (pour Google Ads)
 * @param {string} conversionId - ID de conversion Google Ads
 * @param {string} conversionLabel - Label de la conversion
 * @param {number} value - Valeur de la conversion (optionnel)
 * @param {string} currency - Devise (par défaut EUR)
 */
export const trackConversion = (
  conversionId,
  conversionLabel,
  value = null,
  currency = "EUR",
) => {
  const conversionData = {
    send_to: `${conversionId}/${conversionLabel}`,
  };

  if (value !== null) {
    conversionData.value = value;
    conversionData.currency = currency;
  }

  if (window.gtag) {
    window.gtag("event", "conversion", conversionData);
  } else if (window.dataLayer) {
    window.dataLayer.push({
      event: "conversion",
      ...conversionData,
    });
  }
};

/**
 * Track page view manually (utile pour les SPA)
 * @param {string} pagePath - Chemin de la page
 * @param {string} pageTitle - Titre de la page (optionnel)
 */
export const trackPageView = (pagePath, pageTitle = null) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "page_view",
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  }
};

/**
 * Set custom user properties
 * @param {object} properties - Propriétés utilisateur (ex: user_id, user_type)
 */
export const setUserProperties = (properties = {}) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "set_user_properties",
      ...properties,
    });
  }
};

/**
 * Récupère l'ID Google Tag Manager pour un client
 */
export const getGtmId = (customerName) => {
  return GTM_CONFIG[customerName] || null;
};

/**
 * Récupère l'ID Google Analytics pour un client
 */
export const getGtagId = (customerName) => {
  return GTAG_CONFIG[customerName] || null;
};
