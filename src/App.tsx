import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Display } from "./design-system/components/display/display1/src/display.component";
import { Display2 } from "./design-system/components/display/display2/src/display.component";
import { ClassicError } from "./design-system/error/src/classicError.component";
import { ClassicFooter } from "./design-system/footers/src/classicFooter.component";
import { Home } from "./design-system/home/src/home.component";
import { ClassicNavbar } from "./design-system/navbars/src/classicNavbar.component";
import { setConfig } from "./store/state.action";
import { getStyle, getTemplates } from "./store/state.selector";
import { RootStyle } from "./globalStyles";

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
      const template = templates.filter(
        (template) => template.id === templateId
      )[0];

      return template || undefined;
    },
    [templates]
  );

  return (
    <Router>
      <RootStyle globalStyle={{ ...globalStyle }} />
      <div data-theme={theme}>
        <ClassicNavbar
          template={templates[0]?.datas}
          toggleTheme={toggleTheme}
          theme={theme}
        />
        <Routes>
          <Route path="/" element={<Home templates={templates} />} />
          <Route
            path="/display"
            element={<Display template={getTemplateById("display")} />}
          />
          <Route
            path="/display2"
            element={<Display2 template={getTemplateById("display2")} />}
          />
          <Route
            path="/*"
            element={<ClassicError template={getTemplateById("error")} />}
          />
        </Routes>
        <ClassicFooter template={templates[1]?.datas} />
      </div>
    </Router>
  );
}

export default App;
