import React from "react";
import LogoIMG from "../LogoIMG/LogoIMG";
import { Link } from "react-router-dom";

const LogoLink = () => {
  return (
    <Link className="logo-link" to="#">
      <LogoIMG/>
    </Link>
  );
};

export default LogoLink;