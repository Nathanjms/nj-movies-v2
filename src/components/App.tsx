import React, { useState } from "react";
import "../css/App.css";
import NavBar from "./Global/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./Global/NotFound";
import Header from "./Global/Header";
import Footer from "./Global/Footer";
import { Container } from "react-bootstrap";
import Movies from "./Movies/Movies";
import Demo from "./Movies/Demo";
import Watched from "./Movies/Watched";
import Random from "./Movies/Random";
import About from "./Movies/About";
import { AuthContext } from "./Auth/AuthContext";
import Login from "./Auth/Login";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") // set Token if one is in local storage
  );

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Header />
      <Router>
        <NavBar />
        <Container>
          <div id="body" className="section">
            <Routes>
              <Route path="/" element={<Movies />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/watched" element={<Watched />} />
              <Route path="/random" element={<Random />} />
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Container>
      </Router>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
