import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Gallery from "./design-system/components/gallery/gallery.component";
import Product from "./design-system/components/gallery/product.component";
import Legals from "./design-system/components/legals/legals.component";
import MultiDescription from "./design-system/components/multiDescriptions/multiDescriptions.component";
import { PageNotFound } from "./design-system/error/src/pageNotFound.component";
import DisplayFooter from "./design-system/utils/displayer/displayFooter.component";
import DisplayNavbar from "./design-system/utils/displayer/displayNavbar.component";
import { setConfig } from "./store/state.action";
import { getClient, getStyle, getTemplates } from "./store/state.selector";
import GlobalStyle from "./theme/customer/default/globalStyled";
import { getCustomer } from "./customer.utils";
import ScrollToTop from "./scrollToTop.utils";
import KeyboardShortcuts from "./design-system/components/shortcut/keyboardShortcuts.component";

export const templatesTypesBlackList = [
  "navbars",
  "footers",
  "error",
  "gallery",
  "legals",
  "prices",
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
  const [RootStyle, setRootStyle] = useState<any>(null);

  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  dispatch(setConfig(props));

  const templates = useSelector(getTemplates);
  const { title = "", logo = "" } = useSelector(getClient);
  const customer = useSelector(getCustomer);

  useEffect(() => {
    const loadRootStyle = async () => {
      try {
        // Dynamically import the correct globalStyles file based on customer
        const module = await import(
          `./theme/customer/${customer}/globalStyles.ts`
        );
        setRootStyle(() => module.RootStyle);
      } catch (error) {
        console.error("Error loading global styles:", error);
      }
    };

    loadRootStyle();
  }, [customer]); // Trigger re-load when `customer` changes

  const globalStyle = useSelector(getStyle);

  const navbarTemplate = getTemplate(templates, "navbars");
  const galleryTemplate = getTemplate(templates, "gallery");
  const footerTemplate = getTemplate(templates, "footers");

  useEffect(() => {
    document.title = title;

    const iconLink = document.createElement("link");
    iconLink.rel = "icon";
    iconLink.href = `${import.meta.env.BASE_URL}assets/${customer}/icons/${logo}.png`;
    document.head.appendChild(iconLink);
  }, [customer, logo, title]);

  return (
    <Router>
      <ScrollToTop />
      <GlobalStyle />
      {RootStyle && <RootStyle globalStyle={{ ...globalStyle }} />}
      <div data-theme={theme}>
        <KeyboardShortcuts />
        {navbarTemplate && (
          <DisplayNavbar
            template={navbarTemplate}
            toggleTheme={toggleTheme}
            theme={theme}
          />
        )}
        <Routes>
          <Route path="/" element={<MultiDescription templateName="Home" />} />
          <Route
            path="/presentation"
            element={<MultiDescription templateName="Presentation" />}
          />
          <Route
            path="/description"
            element={<MultiDescription templateName="Description" />}
          />
          <Route
            path="/hebergement"
            element={<MultiDescription templateName="Hebergement" />}
          />
          <Route
            path="/accessibilite"
            element={<MultiDescription templateName="Accessibilite" />}
          />
          <Route
            path="/flux"
            element={<MultiDescription templateName="Flux" />}
          />
          <Route
            path="/prestation"
            element={<MultiDescription templateName="Prestation" />}
          />

          {galleryTemplate && (
            <Route
              path="/gallerie"
              element={<Gallery template={galleryTemplate.datas} />}
            />
          )}
          <Route
            path="/contact"
            element={<MultiDescription templateName="Contact" />}
          />
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
