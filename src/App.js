import { Home } from "./components/home/src/home.component";
import { ClassicError } from "./components/error/src/classicError.component";
import { ClassicNavbar } from "./components/navbars/src/classicNavbar.component";
import { ClassicFooter } from "./components/footers/src/classicFooter.component";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <ClassicNavbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/*" element={<ClassicError />} />
      </Routes>
      <ClassicFooter />
    </Router>
  );
}

export default App;
