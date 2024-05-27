import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

import { getCustomer } from "./customer.utils";

const customer = getCustomer();

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(
    resourcesToBackend(
      (language) => import(`../lang/customer/${customer}/${language}.json`)
    )
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLang: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
