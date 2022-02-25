import React from "react";
import "../css/App.css";
import NavBar from "./Global/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./Global/NotFound";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route
          path="*"
          element={<NavBar />}
        />
      </Routes>
    </Router>
  );
}

export default App;
