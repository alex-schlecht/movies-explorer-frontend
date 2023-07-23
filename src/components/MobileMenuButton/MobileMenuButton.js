import React from "react";

const MobileMenuButton = ({openPopup}) => {
  return (
    <button 
      className="mobile-menu-button" 
      type="button" 
      onClick={() => openPopup()}
    />
  );
};

export default MobileMenuButton;
