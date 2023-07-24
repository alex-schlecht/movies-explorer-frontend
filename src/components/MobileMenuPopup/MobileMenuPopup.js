import React from "react";
import { NavLink } from "react-router-dom";

const MobileMenuPopup = ({isOpen, onClose, onClickOverlay}) => {
  return (
    <div 
      className={`mobile-menu-popup ${isOpen ? "mobile-menu-popup-visible" : ""}`}
      role="dialog"
      tabIndex="-1"
      onClick={onClickOverlay}
    >
      <button
        className="mobile-menu-popup__button"
        onClick={onClose}
        type="button"
      />
      <div className="mobile-menu-popup__container">
        <nav className="mobile-menu-popup__menu">
          <ul className="mobile-menu-popup__links">
            <li>
              <NavLink 
                className={({isActive}) => `mobile-menu-popup__link ${isActive ? "mobile-menu-popup__link-active" : ""}`}
                to="/"
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => `mobile-menu-popup__link ${isActive ? "mobile-menu-popup__link-active" : ""}`}
                to="/movies"
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => `mobile-menu-popup__link ${isActive ? "mobile-menu-popup__link-active" : ""}`}
                to="/saved-movies"
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
        <NavLink 
          className="mobile-menu-popup__link mobile-menu-popup__profile-link" 
          to="/profile"
        >
          Аккаунт <div className="mobile-menu-popup__profile-icon"></div>
        </NavLink>
      </div>
    </div>
  );
};

export default MobileMenuPopup;
