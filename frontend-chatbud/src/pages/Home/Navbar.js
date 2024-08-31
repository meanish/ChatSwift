import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavbarStyle } from "../../components/Home/NavbarStyle.styled";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State for hamburger menu

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false); // Close menu on link click
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarStyle>
      <header>
        <div className="container ">
          <div className="logo_section">
            <img src={require("../../images/logobird.png")} alt="logo.png" />
          </div>
          <div className={`menu_list ${isOpen ? "open" : ""}`}>
            <nav>
              <ul>
                <li>
                  <NavLink
                    to="/"
                    className={`list_items ${activeLink === "home" ? "active" : ""
                      }`}
                    onClick={() => handleLinkClick("home")}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/chat"
                    className={`list_items ${activeLink === "chat" ? "active" : ""
                      }`}
                    onClick={() => handleLinkClick("chat")}
                  >
                    Chat
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={`list_items ${activeLink === "login" ? "active" : ""
                      }`}
                    onClick={() => handleLinkClick("login")}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={`list_items ${activeLink === "register" ? "active" : ""
                      }`}
                    onClick={() => handleLinkClick("register")}
                  >
                    Register
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
      </header>
    </NavbarStyle>
  );
};

export default Navbar;
