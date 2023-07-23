import React from "react";
import LogoLink from "./LogoLink/LogoLink";
import Navigation from "../Navigation/Navigation";
import MobileMenuButton from "../MobileMenuButton/MobileMenuButton";

const Header = ({loggedIn, isMobileMenuPopupOpen}) => {

  const handleChange = () => {
    loggedIn(true);
    isMobileMenuPopupOpen(false);
  }

  return (
    <header className="header">
      <LogoLink/>
      <Navigation loggedIn={loggedIn}/>
      {loggedIn && <MobileMenuButton isMobileMenuPopupOpen={handleChange}/>}
    </header>
  );
};

export default Header;
