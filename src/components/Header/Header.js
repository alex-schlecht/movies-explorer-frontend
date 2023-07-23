import React from "react";
import LogoLink from "./LogoLink/LogoLink";
import Navigation from "../Navigation/Navigation";

const Header = ({headerType}) => {

  return (
    <header className="header">
      <LogoLink/>
      <Navigation headerType={headerType}/>
    </header>
  );
};

export default Header;
