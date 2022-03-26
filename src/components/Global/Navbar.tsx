import React, { ReactElement, useState } from "react";
import { FaBars, FaDoorOpen, FaSignInAlt } from "react-icons/fa";
import navItems from "./NavItems";
import { NavLink, useNavigate } from "react-router-dom";
import "../../css/NavBar.css";
import { useAuth } from "../Auth/AuthContext";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const NavBar: React.FC<{}> = (): ReactElement => {
  const [expanded, setExpanded] = useState(false);
  const { user, setUser, setToken } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const currentLocation = (uri: string): boolean => {
    return location.pathname === uri;
  };

  const ToggleBtn = (): ReactElement => {
    return (
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className={"btn navBtn toggleNavBtn" + (expanded ? " active" : "")}
      >
        <FaBars />
      </button>
    );
  };

  const handleLogout = async () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    setExpanded(false);
    navigate("/login", { state: { message: "Signed Out Successfully" } });
  };

  return (
    <header className="navBar-container">
      <nav className="navBar">
        <ul className={"webNav links" + (expanded ? " fadeIn" : " hide-nav")}>
          {navItems.map((element, id) => {
            if (element.auth && !user) {
              return null;
            }
            return (
              <NavLink
                className={
                  "navBtn nav-link" +
                  (currentLocation(element.link) ? " disabled" : "")
                }
                to={element.link}
                key={id}
                onClick={() => setExpanded(false)}
              >
                {element.icon}
                <span className="nav-text">{element.text}</span>
              </NavLink>
            );
          })}
          {!user ? (
            <NavLink
              onClick={() => setExpanded(false)}
              className={
                "navBtn nav-link" +
                (currentLocation("/login") ? " disabled" : "")
              }
              to="/login"
            >
              <FaSignInAlt />
              <span className="nav-text">Sign In</span>
            </NavLink>
          ) : (
            <Button
              onClick={() => handleLogout()}
              className="navBtn nav-link"
              style={{ cursor: "pointer" }}
            >
              <FaDoorOpen />
              <span className="nav-text">Sign Out</span>
            </Button>
          )}
        </ul>
        <ul className="toggleBtnContainer">
          <ToggleBtn />
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
