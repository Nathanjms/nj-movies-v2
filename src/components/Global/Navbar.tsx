import React, { ReactElement, useReducer } from "react";
import { FaBars } from "react-icons/fa";
import navItems from "./NavItems";
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
          {navItems.map((objLink, i) => {
            return (
              <li key={i}>
                <a className="button-shape" href={objLink.link}>
                  {objLink.icon}
                  <span>{objLink.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <MobileToggleBtn />
      </nav>
    </header>
  );
};

export default NavBar;
