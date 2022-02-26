import React, { ReactElement, useState } from "react";
import { FaBars, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import navItems from "./NavItems";
import { NavLink } from "react-router-dom";
import "../../css/NavBar.css";

const NavBar: React.FC<{}> = (): ReactElement => {
  const [expanded, setExpanded] = useState(false);

  const MobileToggleBtn = (): ReactElement => {
    return (
      <li onClick={() => setExpanded(!expanded)}>
        {" "}
        <button
          className={
            expanded
              ? "btn button-shape mobile-button btn-clicked"
              : "btn button-shape mobile-button"
          }
        >
          <FaBars />
        </button>
      </li>
    );
  };

  return (
    <header className="navBar-container">
      <nav className="navBar">
        <ul
          className={!expanded ? "webNav links hide-nav" : "webNav links fadeIn"}
        >
          {navItems.map((element, id) => {
            return (
              <NavLink
                className="button-shape nav-link"
                to={element.link}
                key={id}
                onClick={() => (setExpanded(false))}
              >
                {element.icon}
                <span>{element.text}</span>
              </NavLink>
            );
          })}
          {/*} TODO: Dynamic signin/out buttons: */}
          <NavLink className="button-shape nav-link" to="/signin">
            <FaSignInAlt />
            <span>Sign In</span>
          </NavLink>
          <NavLink className="button-shape nav-link" to="/signout">
            <FaSignOutAlt />
            <span>Sign Out</span>
          </NavLink>
        </ul>
        <MobileToggleBtn />
      </nav>
    </header>
  );
};

export default NavBar;
