import "./index.css";
import "./theme/customer/default/globalStyle.css";

import { Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useTranslation } from "react-i18next";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import App from "./App";
import { getCustomer } from "./customer.utils";
import i18n from "./i18n";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const customer = getCustomer();

// Loading fallback component
function LoadingFallback() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "1.2rem",
        color: "#666",
      }}
    >
      Loading...
    </div>
  );
}

// Component that loads config based on current language
function ConfigLoader() {
  const { i18n } = useTranslation();
  const [config, setConfig] = useState(null);
  const [style, setStyle] = useState(null);

  const loadConfiguration = async (language: string) => {
    try {
      // Try to load config for the current language
      const configModule = await import(
        `../config/customer/${customer}/config.${language}.json`
      );
      const styleModule = await import(
        `../config/customer/${customer}/style.config.json`
      );

      setConfig(configModule.default);
      setStyle(styleModule.default);
      console.log(`✅ Configuration loaded for language: ${language}`);
    } catch (error) {
      console.warn(
        `⚠️  Config file not found for language '${language}', falling back to French`,
        error,
      );

      // Fallback to French config
      try {
        const configModule = await import(
          `../config/customer/${customer}/config.fr.json`
        );
        const styleModule = await import(
          `../config/customer/${customer}/style.config.json`
        );

        setConfig(configModule.default);
        setStyle(styleModule.default);
        console.log("✅ Fallback configuration loaded (French)");
      } catch (fallbackError) {
        console.error(
          "❌ Error loading fallback configuration:",
          fallbackError,
        );
      }
    }
  };

  // Load config on mount and when language changes
  useEffect(() => {
    const currentLanguage =
      i18n.language || i18n.options.fallbackLng?.[0] || "fr";
    loadConfiguration(currentLanguage);
  }, [i18n.language]);

  // Show nothing while loading (Suspense will show the fallback)
  if (!config || !style) {
    return null;
  }

  return <App config={config} style={style} />;
}

// Wait for i18n to be initialized before rendering
const initializeApp = async () => {
  if (!i18n.isInitialized) {
    await new Promise((resolve) => {
      i18n.on("initialized", resolve);
    });
  }

  root.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<LoadingFallback />}>
          <ConfigLoader />
        </Suspense>
      </I18nextProvider>
    </Provider>,
  );
};

initializeApp();
