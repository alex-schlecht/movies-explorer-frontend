import React from "react";
import { NavLink } from "react-router-dom";
import { useOpenPopup } from "../../hooks/useOpenPopup";
import MobileMenuButton from "../MobileMenuButton/MobileMenuButton";


const Navigation = ({headerType}) => {

  const {open, close} = useOpenPopup();

  return (
    <>
      {headerType === 'main' || 'non-authorized' && (
        <nav className="navigation">
          <ul className="navigation__unauthorized-links">
            <li>
              <NavLink 
                className="navigation__link" 
                to="/signup"
              >
                Регистрация
              </NavLink>
            </li>
            <li>
              <NavLink 
                className="navigation__link navigation__link_signin" 
                to="/signin"
              >
                Войти
              </NavLink>
            </li>
          </ul>
        </nav>
      )};

      {headerType === 'authorized' && (
        <nav className="navigation navigation_movies">
          <ul className="navigation__movies-list">
            <li>
              <NavLink
                className={({isActive}) => `navigation__link navigation__movies-link ${isActive ? "navigation__link_active" : ""}`}
                to="/movies"
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({isActive}) => `navigation__link navigation__movies-link ${isActive ? "navigation__link_active" : ""}`}
                to="/saved-movies"
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <NavLink
            className="navigation__link navigation__profile-link"
            to="/profile"
          >
            Аккаунт<div className="navigation__profile-icon"></div>
          </NavLink>
        </nav>
      )};
      {headerType === 'mobile' && (
        <MobileMenuButton onClick={open} onClose={close}/>
      )}
    </>
  );
};

export default Navigation;
