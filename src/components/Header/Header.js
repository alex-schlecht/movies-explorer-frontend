import React from "react";
import LogoLink from "./LogoLink/LogoLink";
import Navigation from "../Navigation/Navigation";
import MobileMenuButton from "../MobileMenuButton/MobileMenuButton";

const Header = ({loggedIn, clickOpenMenu}) => {

  return (
    <header className="header">
      <LogoLink/>
      <Navigation loggedIn={loggedIn}/>
      {loggedIn && <MobileMenuButton clickOpenMenu={clickOpenMenu}/>}
    </header>
  );
};

export default Header;
