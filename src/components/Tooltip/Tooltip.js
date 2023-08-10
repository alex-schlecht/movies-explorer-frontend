import { useEffect } from "react";
import { ReactComponent as TooltipError } from "../../images/ui/tooltip-error.svg";
import { ReactComponent as TooltipSuccess } from "../../images/ui/tooltip-success.svg";


const Tooltip = ({ isOpen, onClose, onClickOverlay, responseType, responseText }) => {
  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen]);

  const getResponseIcon = () => {
    switch (responseType) {
    case "error":
      return <TooltipError/>;
    case "success":
      return <TooltipSuccess/>;
    default :
      return <TooltipError/>;
    }
  };

  function handleEscClose(evn) {
    if (evn.key === 'Escape') {
      onClose();
    }
  }

  return (
    <div
      className={`tooltip ${isOpen ? 'tooltip_visible' : ""}`}
      onClick={onClickOverlay}
      role="dialog"
      tabIndex="-1"
    >
      <div 
        className="tooltip__container tooltip__container_type_tooltip" 
        role="document"
      >
        <button
          type="button"
          className="tooltip__button tooltip__button-close"
          onClick={onClose}
        />
        <div className={`tooltip__tooltip-img tooltip__tooltip-img_${responseType}`}>
          {getResponseIcon()}
        </div>

        <span className="tooltip__tooltip-text">{responseText}</span>
      </div>
    </div>
  );
};

export default Tooltip;
