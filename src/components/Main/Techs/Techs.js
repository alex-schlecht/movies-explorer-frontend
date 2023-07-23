import React from "react";
import HeadingGrade2 from "../HeadingGrade/HeadingGrade2/HeadingGrade2"
import HeadingGrade3 from "../HeadingGrade/HeadingGrade3/HeadingGrade3";

const Techs = () => {
  return (
    <section className="techs" id="techs">
      <HeadingGrade2 name="Технологии"/>
      <HeadingGrade3 className="techs__heading-grade-3" name="7 Технологий"/>
      <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__boxes">
        <li className="techs__box">HTML</li>
        <li className="techs__box">CSS</li>
        <li className="techs__box">JS</li>
        <li className="techs__box">React</li>
        <li className="techs__box">Git</li>
        <li className="techs__box">Express.js</li>
        <li className="techs__box">mongoDB</li>
      </ul>
    </section>
  );
};

export default Techs;
