import React from "react";
import LogoLink from "./LogoLink/LogoLink";
import Navigation from "../Navigation/Navigation";

const Header = ({headerType, openPopup}) => {

  return (
    <header className="header">
      <LogoLink/>
      <Navigation openPopup={openPopup} headerType={headerType}/>
    </header>
  );
};

export default Header;
