import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ExtendedContact from "./design-system/components/contact/src/extendedContact.component";
import MultiDescription from "./design-system/components/description/src/multiDescriptions.component";
import Display from "./design-system/components/display/src/display.component";
import Product from "./design-system/components/display/src/product.component";
import Legals from "./design-system/components/legals/src/legals.component";
import Prices from "./design-system/components/prices/src/prices.component";
import { PageNotFound } from "./design-system/error/src/pageNotFound.component";
import DisplayFooter from "./design-system/footers/src/displayFooter.component";
import { Home } from "./design-system/home/src/home.component";
import DisplayNavbar from "./design-system/navbars/src/displayNavbar.component";
import { setConfig } from "./store/state.action";
import { getClient, getStyle, getTemplates } from "./store/state.selector";
import { RootStyle } from "./globalStyles";
import ScrollToTop from "./scrollToTop.utils";

export const templatesTypesBlackList = [
  "navbars",
  "footers",
  "error",
  "display",
  "legals",
];

export const templatesIdsBlackList = ["multiDescriptions"];

export const getTemplate = (
  templateType,
  templateId = null,
  templateName = null
) => {
  const templates = useSelector(getTemplates);

  let template;
  if (templates) {
    template = templates.find((template) => template.type === templateType);

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

function App(config) {
  const dispatch = useDispatch();

  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  dispatch(setConfig(config));

  const templates = useSelector(getTemplates);
  const { title = "" } = useSelector(getClient);
  const globalStyle = useSelector(getStyle);

  const navbarTemplate = getTemplate("navbars");
  const displayTemplate = getTemplate("display");
  const footerTemplate = getTemplate("footers");

  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <Router>
      <ScrollToTop />
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

          {displayTemplate && (
            <Route
              path="/display"
              element={<Display template={displayTemplate.datas} />}
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
