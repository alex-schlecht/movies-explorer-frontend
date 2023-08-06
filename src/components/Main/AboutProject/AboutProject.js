import React from "react";
import ProgressionBar from "../ProgressionBar/ProgressionBar";
import HeadingGrade2 from "../../HeadingGrade/HeadingGrade2/HeadingGrade2";
import AboutProjectInfo from "../AboutProjectInfo/AboutProjectInfo";

const aboutProject = [
  {
    name: "Дипломный проект включал 5 этапов",
    description: "Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.",
  },
  {
    name: "На выполнение диплома ушло 5 недель",
    description: "У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.",
  },
];

const AboutProject = () => {
  return (
    <section className="about-project" id="about-project">
      <HeadingGrade2 name="О проекте"/>
      <AboutProjectInfo aboutProject={aboutProject}/>
      <ProgressionBar />
    </section>
  );
};

export default AboutProject;
