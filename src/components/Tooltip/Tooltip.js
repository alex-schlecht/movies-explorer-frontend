import { useEffect } from "react";
import { ReactComponent as ImageTooltipIconError } from "../../images/ui/tooltip-error.svg";
import { ReactComponent as ImageTooltipIconSuccess } from "../../images/ui/tooltip-success.svg";


const Tooltip = ({ isOpen, onClose, onClickOverlay, responseType, responseText }) => {
  const getResponseIcon = () => {
    switch (responseType) {
    case "error":
      return <ImageTooltipIconError/>;
    case "success":
      return <ImageTooltipIconSuccess/>;
    default :
      return <ImageTooltipIconError/>;
    }
  };

  function handleEscClose(evn) {
    if (evn.key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
          className="tooltip__button tooltip__button_action_close"
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
