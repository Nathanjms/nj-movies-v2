import React, { ReactElement, useContext, useState } from "react";
import { FaBars, FaDoorOpen, FaSignInAlt } from "react-icons/fa";
import navItems from "./NavItems";
import { NavLink, useNavigate } from "react-router-dom";
import "../../css/NavBar.css";
import { AuthContext } from "../Auth/AuthContext";
import { NavItem } from "react-bootstrap";

const NavBar: React.FC<{}> = (): ReactElement => {
  const [expanded, setExpanded] = useState(false);
  const { user, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const LoginOrLogout = (): ReactElement => {
    if (!user) {
      return (
        <NavLink
          onClick={() => setExpanded(false)}
          className="navBtn nav-link"
          to="/login"
        >
          <FaSignInAlt />
          <span className="nav-text">Sign In</span>
        </NavLink>
      );
    }
    return (
      <NavItem
        onClick={() => handleLogout()}
        className="navBtn nav-link"
        style={{ cursor: "pointer" }}
      >
        <FaDoorOpen />
        <span className="nav-text">Sign Out</span>
      </NavItem>
    );
  };

  return (
    <header className="navBar-container">
      <nav className="navBar">
        <ul className={"webNav links" + (expanded ? " fadeIn" : " hide-nav")}>
          {navItems.map((element, id) => {
            return (
              <NavLink
                className="navBtn nav-link"
                to={element.link}
                key={id}
                onClick={() => setExpanded(false)}
              >
                {element.icon}
                <span className="nav-text">{element.text}</span>
              </NavLink>
            );
          })}
          {/*} TODO: Dynamic signin/out buttons based on auth state: */}
          <LoginOrLogout />
        </ul>
        <ul className="toggleBtnContainer">
          <ToggleBtn />
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
