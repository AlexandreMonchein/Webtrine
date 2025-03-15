import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ExtendedContact from "./design-system/components/contact/src/extendedContact.component";
import Gallery from "./design-system/components/gallery/src/gallery.component";
import Product from "./design-system/components/gallery/src/product.component";
import Legals from "./design-system/components/legals/src/legals.component";
import MultiDescription from "./design-system/components/multiDescriptions/src/multiDescriptions.component";
import Prices from "./design-system/components/prices/src/prices.component";
import { PageNotFound } from "./design-system/error/src/pageNotFound.component";
import DisplayFooter from "./design-system/footers/src/displayFooter.component";
import { Home } from "./design-system/home/src/home.component";
import DisplayNavbar from "./design-system/navbars/src/displayNavbar.component";
import { setConfig } from "./store/state.action";
import { getClient, getStyle, getTemplates } from "./store/state.selector";
import GlobalStyle from "./theme/customer/default/globalStyled";
import { getCustomer } from "./customer.utils";
import ScrollToTop from "./scrollToTop.utils";

export const templatesTypesBlackList = [
  "navbars",
  "footers",
  "error",
  "gallery",
  "legals",
];
export const templatesIdsBlackList = ["multiDescriptions"];
export const templatesNamesBlackList = ["Contact"];

export const getTemplate = (
  templates,
  templateType,
  templateId = null,
  templateName = null
) => {
  let template;

  if (templates) {
    if (templateType) {
      template = templates.find((template) => template.type === templateType);
    }

    if (templateId) {
      template = templates.find(
        (template) =>
          template.type === templateType && template.id === templateId
      );

      if (templateName) {
        template = templates.find(
          (template) =>
            template.type === templateType &&
            template.id === templateId &&
            template.name === templateName
        );
      }
    }
    return template || undefined;
  }
};

function App(props) {
  const dispatch = useDispatch();

  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  dispatch(setConfig(props));

  const templates = useSelector(getTemplates);
  const { title = "", logo = "" } = useSelector(getClient);
  const customer = useSelector(getCustomer);

  const RootStyle = require(
    `./theme/customer/${customer}/globalStyles.ts`
  ).RootStyle;

  const globalStyle = useSelector(getStyle);

  const navbarTemplate = getTemplate(templates, "navbars");
  const galleryTemplate = getTemplate(templates, "gallery");
  const footerTemplate = getTemplate(templates, "footers");

  useEffect(() => {
    document.title = title;

    const iconLink = document.createElement("link");
    iconLink.rel = "icon";
    iconLink.href = require(`./assets/${customer}/icons/${logo}.png`);
    document.head.appendChild(iconLink);
  }, [customer, logo, title]);

  return (
    <Router>
      <ScrollToTop />
      <GlobalStyle />
      <RootStyle globalStyle={{ ...globalStyle }} />
      <div data-theme={theme}>
        {navbarTemplate && (
          <DisplayNavbar
            template={navbarTemplate}
            toggleTheme={toggleTheme}
            theme={theme}
          />
        )}
        <Routes>
          <Route path="/" element={<Home templates={templates} />} />
          <Route
            path="/presentation"
            element={<MultiDescription templateName="Presentation" />}
          />
          <Route
            path="/description"
            element={<MultiDescription templateName="Description" />}
          />
          <Route
            path="/flux"
            element={<MultiDescription templateName="Flux" />}
          />

          {galleryTemplate && (
            <Route
              path="/gallerie"
              element={<Gallery template={galleryTemplate.datas} />}
            />
          )}
          <Route path="/contact" element={<ExtendedContact />} />
          <Route path="/prestation" element={<Prices />} />
          <Route path="/display/:item" element={<Product />} />

          <Route path="/cgu-cgv" element={<Legals type="cgu-cgv" />} />
          <Route
            path="/mentions-legals"
            element={<Legals type="mentions-legals" />}
          />
          <Route
            path="/confidentialite"
            element={<Legals type="confidentialite" />}
          />

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        {footerTemplate && <DisplayFooter template={footerTemplate} />}
      </div>
    </Router>
  );
}

export default App;
