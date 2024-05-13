import React from "react";
import { Home } from "./components/home/home.component.tsx";
import { Error } from "./components/error/error.component.tsx";
import { ClassicNavbar } from "./components/navbars/classicNavbar.component.tsx";
import { ClassicFooter } from "./components/footers/classicFooter.component.tsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <ClassicNavbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/*" element={<Error />} />
      </Routes>
      <ClassicFooter />
    </Router>
  );
}

export default App;
