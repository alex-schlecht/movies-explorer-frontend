import React from "react";
import HeadingGrade2 from "../HeadingGrade/HeadingGrade2/HeadingGrade2";
import HeadingGrade3 from "../HeadingGrade/HeadingGrade3/HeadingGrade3";
import HeadingGrade4 from "../HeadingGrade/HeadingGrade4/HeadingGrade4";
import photo from "../../../images/photo.jpg";

const AboutMe = () => {
  return (
    <section className="about-me" id="about-me">
      <HeadingGrade2 name="Студент"/>
      <article className="about-me__info">
        <div className="about-me__container">
          <HeadingGrade3 name="Виталий" className="about-me__heading-grade-3"/>
          <HeadingGrade4 name="Фронтенд-разработчик, 30 лет" className="about-me__heading-grade-4"/>
          <p className="about-me__description">
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. 
            У&nbsp;меня есть жена и&nbsp;дочь. 
            Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. 
            С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке, 
            начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
          </p>
          <div className="about-me__links">
            <a className="about-me__link" href="https://github.com/alex-schlecht">Github</a>
          </div>
        </div>
        <img className="about-me__photo" src={photo} alt="Моя фотография"></img>
      </article>
    </section>
  );
};

export default AboutMe;