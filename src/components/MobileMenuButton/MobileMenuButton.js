import React from "react";
import MobileMenuPopup from "../MobileMenuPopup/MobileMenuPopup";
import { useOpenPopup } from "../../hooks/useOpenPopup";

const MobileMenuButton = () => {

  const {openPopup, closePopup, isOpen} = useOpenPopup();

  return (
    <>
      <button 
        className="mobile-menu-button" 
        type="button" 
        onClick={() => openPopup()}
      />
      <MobileMenuPopup isOpen={openPopup} closePopup={closePopup}/>
    </>
  );
};

export default MobileMenuButton;
