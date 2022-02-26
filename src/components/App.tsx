import React from "react";
import "../css/App.css";
import NavBar from "./Global/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./Global/NotFound";
import Header from "./Global/Header";
import Footer from "./Global/Footer";
import { Container } from "react-bootstrap";
import Movies from "./Movies/Movies";
import Watched from "./Movies/Watched";
import Random from "./Movies/Random";
import About from "./Movies/About";

function App() {
  return (
    <>
      <Header />
      <Container>
        <div id="body" className="section">
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Movies />} />
              <Route path="/watched" element={<Watched />} />
              <Route path="/random" element={<Random />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default App;
