import React from "react";

const MobileMenuButton = ({clickOpenMenu}) => {

  return (
      <button 
        className="mobile-menu-button" 
        type="button" 
        onClick={clickOpenMenu}
      />
  );
};

export default MobileMenuButton;
