import React, { useEffect, useState } from "react";
import "../css/App.css";
import NavBar from "./Global/Navbar";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NotFound from "./Global/NotFound";
import Header from "./Global/Header";
import Footer from "./Global/Footer";
import { Container } from "react-bootstrap";
import Movies from "./Movies/Movies";
import Demo from "./Movies/Demo";
import Random from "./Movies/Random";
import About from "./Movies/About";
import { AuthContext, useAuth, User, UserMovieGroup } from "./Auth/AuthContext";
import Login from "./Auth/Login";
import { AuthenticatedRequest } from "../helpers/apiCommunication";

export interface LogInMessage {
  message: string | null;
  type?: string;
}

function App(): JSX.Element {
  const handleTokenExpiry = (): string | null => {
    let tokenVal: string | null = null;
    let expiry = localStorage.getItem("expiry");
    if (expiry && Number(expiry) > new Date().valueOf()) {
      tokenVal = localStorage.getItem("token");
    } else {
      localStorage.clear(); // Expired token, so remove local storage.
    }
    return tokenVal;
  };
  const [token, setToken] = useState<string | null>(handleTokenExpiry());
  const [user, setUser] = useState<User | null>(null);
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
        setUser({ name: result.data.name, id: result.data.id });
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
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Movies watched={false}/>
                  </RequireAuth>
                }
              />
              <Route
                path="/watched"
                element={
                  <RequireAuth>
                    <Movies watched={true} />
                  </RequireAuth>
                }
              />
              <Route
                path="/random"
                element={
                  <RequireAuth>
                    <Random />
                  </RequireAuth>
                }
              />
              <Route path="/demo" element={<Demo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Container>
      </Router>
      <Footer />
    </AuthContext.Provider>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.token) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          logInMessage: {
            message: "You must be logged in to access that section.",
            type: "danger",
          },
        }}
        replace
      />
    );
  }

  return children;
}

export default App;
