import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = ({loggedIn}) => {
  const UnauthorizedNavigation = () => {
    return (
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
    );
  };

  const AuthorizedNavigation = () => {
    return (
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
        >
          Аккаунт<div className="navigation__profile-icon"></div>
        </NavLink>
      </nav>
    );
  };

  return (
    <>
      {loggedIn ? UnauthorizedNavigation() : AuthorizedNavigation()}
    </>
  );
};

export default Navigation;
