import React from 'react';

const Popup = ({isOpen, onClickOverlay, children}) => {
  return (
    <div
      className={`popup  ${isOpen ? 'popup-visible' : ''}`}
      onClick={onClickOverlay}
      role="dialog"
      tabIndex="-1"
    >
      {children}
    </div>
  );
};

export default Popup;
