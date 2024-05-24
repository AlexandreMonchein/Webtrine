import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import App from "./App";
import { getCustomer } from "./customer.utils";
import i18n from "./i18n";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const customer = getCustomer();
const config = require(`../config/customer/${customer}/config.json`);

root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App config={config} />
    </I18nextProvider>
  </Provider>
);
