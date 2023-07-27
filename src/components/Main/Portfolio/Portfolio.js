import React from "react";
import HeadingGrade5 from "../HeadingGrade/HeadingGrade5/HeadingGrade5";
import { Link } from "react-router-dom";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <HeadingGrade5 name="Портфолио"/>
      <ul className="portfolio__projects">
        <li className="portfolio__project">
          <Link className="portfolio__project-link" target="_blank" to="https://github.com/alex-schlecht/russian-travel">
            Статичный сайт <div className="portfolio__arrow-link"></div></Link>
        </li>
        <li className="portfolio__project">
          <Link className="portfolio__project-link" target="_blank" to="https://github.com/alex-schlecht/mesto-react">
            Адаптивный сайт <div className="portfolio__arrow-link"></div></Link>
        </li>
        <li className="portfolio__project">
          <Link className="portfolio__project-link" target="_blank" to="https://github.com/alex-schlecht/react-mesto-api-full-gha">
            Одностраничное приложение <div className="portfolio__arrow-link"></div></Link>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
