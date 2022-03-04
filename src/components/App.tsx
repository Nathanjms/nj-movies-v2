import React, { useEffect, useState } from "react";
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
import { AuthContext, UserMovieGroup } from "./Auth/AuthContext";
import Login from "./Auth/Login";
import { AuthenticatedRequest } from "./Global/apiCommunication";

function App() {
  const handleTokenExpiry = (): string | null => {
    let tokenVal: string | null = null;
    let expiry = localStorage.getItem("expiry");
    if (expiry && Number(expiry) > new Date().valueOf()) {
      tokenVal = localStorage.getItem("token");
    }
    return tokenVal;
  };
  const [token, setToken] = useState<string | null>(handleTokenExpiry());
  const [user, setUser] = useState<string | null>(null);
  const [userMovieGroup, setUserMovieGroup] = useState<UserMovieGroup | null>(
    null
  );

  useEffect(() => {
    // Only get user info if token is set, so escape here if token isn't set.
    if (!token) {
      return;
    }

    const buildUsersName = async () => {
      try {
        const result = await AuthenticatedRequest(token).get("/api/users");
        setUser(result.data.name);
      } catch (error: any) {
        localStorage.clear();
      }
    };

    buildUsersName();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        userMovieGroup,
        setUserMovieGroup,
      }}
    >
      <Header />
      <Router>
        <NavBar />
        <Container>
          <div id="body">
            <Routes>
              <Route path="/" element={<Movies />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/watched" element={<Watched />} />
              <Route path="/random" element={<Random />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
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
