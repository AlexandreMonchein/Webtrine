import React from "react";
import { Home } from "./components/home/home.component.tsx";
import { Error } from "./components/error/error.component.tsx";
import { Navbar } from "./components/navbar/navbar.component.tsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
