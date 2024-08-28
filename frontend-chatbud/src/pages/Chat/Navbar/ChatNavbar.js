import React from "react";
import { NavLink } from "react-router-dom";
import { ChatNavStyle } from "../../../components/ChatStyle/Navbar/ChatNavStyle.styled";
import Profile from "./ProfileCard/Profile";
import InsideNotification from "../Messenger/InsideNotification/InsideNotification";
import { NavbarStyle } from "../../../components/Home/NavbarStyle.styled";

const Navbar = () => {
  return (
    <NavbarStyle>
      <ChatNavStyle>
        <header>
          <div className="container">
            <NavLink to="/" className="logo_section">
              <img
                src={require("../../../images/logobird.png")}
                alt="logo.png"
                className="small-logo"
              />
            </NavLink>
            <div className="contents">
              <nav>
                <ul>
                  <li>
                    <InsideNotification />
                  </li>
                  <li>
                    <Profile />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
      </ChatNavStyle>
    </NavbarStyle>
  );
};

export default Navbar;
