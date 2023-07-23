import React from "react";

const MobileMenuButton = ({isMobileMenuPopupOpen}) => {
  return (
    <button 
      className="mobile-menu-button" 
      type="button" 
      onClick={() => isMobileMenuPopupOpen()}
    />
  );
};

export default MobileMenuButton;
