import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__container">
          <p className="footer__copyright">© 2023</p>
          <ul className="footer__links">
            <li>
              <Link className="footer__link" target="_blank" to="https://practicum.yandex.ru/">Яндекс.Практикум</Link>
            </li>
            <li>
              <Link className="footer__link" target="_blank" to="https://github.com/">Github</Link>
            </li>
          </ul>
        </div>
    </footer>
  );
};

export default Footer;
