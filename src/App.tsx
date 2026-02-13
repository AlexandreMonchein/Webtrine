import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { getCustomer } from "./customer.utils";
import FloatingSocials from "./design-system/components/floatingUI/floatingSocials.component";
import Gallery from "./design-system/components/gallery/gallery.component";
import Legals from "./design-system/components/legals/legals.component";
import MultiDescription from "./design-system/components/multiDescriptions/multiDescriptions.component";
import KeyboardShortcuts from "./design-system/components/shortcut/keyboardShortcuts.component";
import { PageNotFound } from "./design-system/error/src/pageNotFound.component";
import DisplayFooter from "./design-system/utils/displayer/displayFooter.component";
import DisplayNavbar from "./design-system/utils/displayer/displayNavbar.component";
import ScrollToTop from "./scrollToTop.utils";
import { setConfig } from "./store/state.action";
import { getClient, getStyle, getTemplates } from "./store/state.selector";
import { initializeGA, initializeGTM } from "./utils/analytics.utils";

export const templatesTypesBlackList = [
  "navbars",
  "footers",
  "error",
  "flotingUI",
  "gallery",
  "legals",
  "prices",
];
export const templatesIdsBlackList = ["multiDescriptions"];
export const templatesNamesBlackList = ["Contact"];

export const getTemplate = (
  templates: Array<{
    type: string;
    id?: string;
    name?: string;
    datas?: unknown;
  }>,
  templateType: string,
  templateId: string | null = null,
  templateName: string | null = null,
) => {
  let template;

  if (templates) {
    if (templateType) {
      template = templates.find((template) => template.type === templateType);
    }

    if (templateId) {
      template = templates.find(
        (template) =>
          template.type === templateType && template.id === templateId,
      );

      if (templateName) {
        template = templates.find(
          (template) =>
            template.type === templateType &&
            template.id === templateId &&
            template.name === templateName,
        );
      }
    }
    return template;
  }

  return null;
};

function App(props: { config: unknown; style: unknown }) {
  const dispatch = useDispatch();

  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  dispatch(setConfig(props));

  const templates = useSelector(getTemplates);
  const { logo = "" } = useSelector(getClient);
  const customer = useSelector(getCustomer);

  useEffect(() => {
    const loadCustomerStyles = async () => {
      try {
        // Dynamically import customer-specific CSS variables
        await import(`./theme/customer/${customer}/variables.css`);
      } catch (error) {
        console.error("Error loading customer styles:", error);
      }
    };

    loadCustomerStyles();
  }, [customer]); // Trigger re-load when `customer` changes

  const globalStyle = useSelector(getStyle);

  // Inject CSS variables into :root when globalStyle changes
  useEffect(() => {
    if (globalStyle && typeof globalStyle === "object") {
      Object.entries(globalStyle).forEach(([key, value]) => {
        document.documentElement.style.setProperty(
          `--${key}-override`,
          String(value),
        );
      });
    }
  }, [globalStyle]);

  const navbarTemplate = getTemplate(templates, "navbars");
  const footerTemplate = getTemplate(templates, "footers");
  const galleryTemplate = getTemplate(templates, "gallery");
  const flaotingUI = getTemplate(templates, "floatingUI");

  useEffect(() => {
    const clientName = import.meta.env.VITE_CUSTOMER;
    const faviconPath = `/assets/${clientName}/icons/${logo}.webp`;

    const favicon = document.createElement("link");
    favicon.type = "image/webp";
    favicon.rel = "icon";
    favicon.href = faviconPath;

    if (!favicon.parentElement) {
      document.head.appendChild(favicon);
    }

    // Initialiser Google Tag Manager pour ce client
    initializeGTM(clientName);
    initializeGA(clientName);
  }, [customer, logo]);

  return (
    <Router>
      <ScrollToTop />
      <div data-theme={theme}>
        <KeyboardShortcuts />
        {flaotingUI ? <FloatingSocials /> : null}
        {navbarTemplate ? (
          <DisplayNavbar
            template={navbarTemplate}
            toggleTheme={toggleTheme}
            theme={theme}
          />
        ) : null}
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
            path="/faq"
            element={<MultiDescription templateName="Faq" />}
          />
          <Route
            path="/flux"
            element={<MultiDescription templateName="Flux" />}
          />
          <Route
            path="/prestation"
            element={<MultiDescription templateName="Prestation" />}
          />
          <Route
            path="/artistes"
            element={<MultiDescription templateName="Artistes" />}
          />
          <Route
            path="/events"
            element={<MultiDescription templateName="Evenements" />}
          />
          <Route
            path="/tarifs"
            element={<MultiDescription templateName="Tarifs" />}
          />
          <Route
            path="/information"
            element={<MultiDescription templateName="Information" />}
          />
          <Route
            path="/private-map"
            element={<MultiDescription templateName="PrivateMap" />}
          />
          <Route
            path="/contact"
            element={<MultiDescription templateName="Contact" />}
          />
          <Route
            path="/mentions-legals"
            element={<Legals type="mentions-legals" />}
          />
          <Route
            path="/confidentialite"
            element={<Legals type="confidentialite" />}
          />
          <Route path="/cgu-cgv" element={<Legals type="cgu-cgv" />} />

          {galleryTemplate && (
            <Route
              path="/gallerie"
              element={<Gallery template={galleryTemplate.datas} />}
            />
          )}

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        {footerTemplate && <DisplayFooter template={footerTemplate} />}
      </div>
    </Router>
  );
}

export default App;
