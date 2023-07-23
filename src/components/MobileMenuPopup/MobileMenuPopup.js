import React from "react";
import { NavLink } from "react-router-dom";

const MobileMenuPopup = ({ openPopup, closePopup }) => {
  return (
    <div 
      className={`mobile-menu-popup ${openPopup ? "mobile-menu-popup_visible" : ""}`}
      role="dialog"
      tabIndex="-1"
    >
      <button
        className="mobile-menu-popup__button mobile-menu-popup__close_button"
        onClick={closePopup}
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
