import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Display } from "./design-system/components/display/display1/src/display.component";
import { Display2 } from "./design-system/components/display/display2/src/display.component";
import { ClassicError } from "./design-system/error/src/classicError.component";
import { ClassicFooter } from "./design-system/footers/src/classicFooter/classicFooter.component";
import { Home } from "./design-system/home/src/home.component";
import { ClassicNavbar } from "./design-system/navbars/src/classicNavbar/classicNavbar.component";
import { getMainTemplates, getSecondTemplates } from "./store/state.selector";
import { RootStyle } from "./globalStyles";

function App() {
  const mainTemplates = useSelector(getMainTemplates);
  const secondTemplates = useSelector(getSecondTemplates);

  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  return (
    <Router>
      <div data-theme={theme}>
        <RootStyle />
        <ClassicNavbar toggleTheme={toggleTheme} theme={theme} />
        <Routes>
          <Route exact path="/" element={<Home template={mainTemplates} />} />
          <Route
            exact
            path="/display"
            element={<Display template={secondTemplates} />}
          />
          <Route exact path="/display2" element={<Display2 />} />
          <Route exact path="/*" element={<ClassicError />} />
        </Routes>
        <ClassicFooter toggleTheme={toggleTheme} theme={theme} />
      </div>
    </Router>
  );
}

export default App;
