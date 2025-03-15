import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import App from "./App";
import { getCustomer } from "./customer.utils";
import i18n from "./i18n";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const customer = getCustomer();

const loadConfig = async () => {
  try {
    // Dynamically import the JSON files using the customer value
    const config = await import(`../config/customer/${customer}/config.json`);
    const style = await import(
      `../config/customer/${customer}/style.config.json`
    );

    root.render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App config={config.default} style={style.default} />
        </I18nextProvider>
      </Provider>
    );
  } catch (error) {
    console.error("Error loading configuration files:", error);
  }
};

loadConfig();
