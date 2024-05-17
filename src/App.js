import { useCallback, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Display } from "./design-system/components/display/src/display.component";
import { ClassicError } from "./design-system/error/src/classicError.component";
import { ClassicFooter } from "./design-system/footers/src/classicFooter/classicFooter.component";
import { Home } from "./design-system/home/src/home.component";
import { ClassicNavbar } from "./design-system/navbars/src/classicNavbar/classicNavbar.component";
import { RootStyle } from "./globalStyles";

function App() {
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
          <Route exact path="/" element={<Home />} />
          <Route exact path="/display/" element={<Display />} />
          <Route exact path="/*" element={<ClassicError />} />
        </Routes>
        <ClassicFooter toggleTheme={toggleTheme} theme={theme} />
      </div>
    </Router>
  );
}

export default App;
