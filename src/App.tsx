import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ExtendedContact from "./design-system/components/contact/src/extendedContact.component";
import { Display } from "./design-system/components/display/src/display.component";
import Product from "./design-system/components/display/src/product.component";
import { Prices } from "./design-system/components/prices/src/prices.component";
import { PageNotFound } from "./design-system/error/src/pageNotFound.component";
import { ClassicFooter } from "./design-system/footers/src/classicFooter.component";
import { Home } from "./design-system/home/src/home.component";
import { ClassicNavbar } from "./design-system/navbars/src/classicNavbar.component";
import { setConfig } from "./store/state.action";
import { getStyle, getTemplates } from "./store/state.selector";
import { RootStyle } from "./globalStyles";

export const generalTemplatesTypes = ["navbars", "footers", "error", "display"];

function App(config) {
  const dispatch = useDispatch();

  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  dispatch(setConfig(config));

  const templates = useSelector(getTemplates);
  const globalStyle = useSelector(getStyle);

  const getTemplateById = useCallback(
    (templateId) => {
      if (templates) {
        const template = templates.find(
          (template) => template.id === templateId
        );
        return template || undefined;
      }
    },
    [templates]
  );

  const classicNavbarTemplate = getTemplateById("classicNavbar");
  const displayTemplate = getTemplateById("display");
  const classicFooterTemplate = getTemplateById("classicFooter");

  return (
    <Router>
      <RootStyle globalStyle={{ ...globalStyle }} />
      <div data-theme={theme}>
        {classicNavbarTemplate && (
          <ClassicNavbar
            template={classicNavbarTemplate.datas}
            toggleTheme={toggleTheme}
            theme={theme}
          />
        )}
        <Routes>
          <Route path="/" element={<Home templates={templates} />} />
          {displayTemplate && (
            <Route
              path="/display"
              element={<Display template={displayTemplate.datas} />}
            />
          )}
          <Route path="/contact" element={<ExtendedContact />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/display/:item" element={<Product />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        {classicFooterTemplate && (
          <ClassicFooter template={classicFooterTemplate.datas} />
        )}
      </div>
    </Router>
  );
}

export default App;
