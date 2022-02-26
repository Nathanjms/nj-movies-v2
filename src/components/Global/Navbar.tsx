import React, { ReactElement, useState } from "react";
import { FaBars, FaDoorOpen, FaSignInAlt } from "react-icons/fa";
import navItems from "./NavItems";
import { NavLink } from "react-router-dom";
import "../../css/NavBar.css";
import { Button } from "react-bootstrap";

const NavBar: React.FC<{}> = (): ReactElement => {
  const [expanded, setExpanded] = useState(false);

  const MobileToggleBtn = (): ReactElement => {
    return (
      <Button
        onClick={() => setExpanded(!expanded)}
        className="btn navBtn mobileBtn"
      >
        <FaBars />
      </Button>
    );
  };

  return (
    <header className="navBar-container">
      <nav className="navBar">
        <ul
          className={"webNav links" + (expanded ? " fadeIn" : " hide-nav")}
        >
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
          <NavLink
            onClick={() => setExpanded(false)}
            className="navBtn nav-link"
            to="/signin"
          >
            <FaSignInAlt />
            <span className="nav-text">Sign In</span>
          </NavLink>
          <NavLink
            onClick={() => setExpanded(false)}
            className="navBtn nav-link"
            to="/signout"
          >
            <FaDoorOpen />
            <span className="nav-text">Sign Out</span>
          </NavLink>
        </ul>
        <MobileToggleBtn />
      </nav>
    </header>
  );
};

export default NavBar;
