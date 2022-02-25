import React, { ReactElement, useReducer } from "react";
import { FaBars } from "react-icons/fa";
import navItems from "./NavItems";
import { NavLink } from "react-router-dom";
import "../../css/NavBar.css";

const NavBar: React.FC<{}> = (): ReactElement => {
  const [hideNav, toggle] = useReducer((hideNav) => !hideNav, true);

  const MobileToggleBtn = (): ReactElement => {
    return (
      <li onClick={toggle}>
        {" "}
        <button
          className={
            hideNav
              ? "btn button-shape mobile-button"
              : "btn button-shape mobile-button btn-clicked"
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
        <ul className={hideNav ? "links hide-nav" : "links"}>
          {navItems.map((element, id) => {
            return (
              <NavLink
                className="button-shape nav-link"
                to={element.link}
                key={id}
              >
                {element.icon}
                <span>{element.text}</span>
              </NavLink>
            );
          })}
        </ul>
        <MobileToggleBtn />
      </nav>
    </header>
  );
};

export default NavBar;
