import React from "react";
import { NavLink } from "react-router-dom";


const Navigation = ({loggedIn}) => {

  const NotLoggedIn = () => {

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
              className="navigation__link navigation__link-signin" 
              to="/signin"
            >
              Войти
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  };

  const LoggedIn = () => {
    return (
      <nav className="navigation navigation__movies">
        <ul className="navigation__movies-list">
          <li>
            <NavLink
              className={({isActive}) => `navigation__link navigation__movies-link ${isActive ? "navigation__link-active" : ""}`}
              to="/movies"
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({isActive}) => `navigation__link navigation__movies-link ${isActive ? "navigation__link-active" : ""}`}
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
    );
  };

  return (
    <>
      {loggedIn ? LoggedIn() : NotLoggedIn()}
    </>
  );   
};
export default Navigation;
