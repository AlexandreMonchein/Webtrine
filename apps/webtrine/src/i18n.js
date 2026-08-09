import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

import { getCustomer } from "./customer.utils";

const customer = getCustomer();

i18n
  .use(
    resourcesToBackend(
      (language) => import(`../lang/customer/${customer}/${language}.json`),
    ),
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLang: "fr",
    fallbackLng: "fr",
    interpolation: { escapeValue: false },

    // Configuration native i18next pour gérer les valeurs null
    returnNull: true, // Retourne null si la valeur est null
    returnEmptyString: false, // N'accepte pas les chaînes vides comme valides
    returnObjects: false, // Ne retourne pas d'objets par erreur

    // Pour que null soit traité comme une valeur valide et non comme une clé manquante
    skipOnVariables: false,
  });

export default i18n;
