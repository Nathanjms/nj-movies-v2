import React, { ReactElement, useState } from "react";
import { FaBars, FaDoorOpen, FaSignInAlt } from "react-icons/fa";
import navItems from "./NavItems";
import { NavLink, useNavigate } from "react-router-dom";
import "../../css/NavBar.css";

const NavBar: React.FC<{}> = (): ReactElement => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();


  const ToggleBtn = (): ReactElement => {
    return (
      <button type="button"
        onClick={() => setExpanded(!expanded)}
        className={"btn navBtn toggleNavBtn" + (expanded ? " active" : "")}
      >
        <FaBars />
      </button>
    );
  };

  // const handleLogout = async () => {
  //   localStorage.clear();
  //   try {
  //     await AuthRequest.post("/api/logout");
  //   } catch (err) {
  //   } finally {
  //     navigate("/login");
  //   }
  // }

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
        <ul className="toggleBtnContainer">
          <ToggleBtn />
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
