import React from "react";

const AboutProjectInfo = ({ aboutProject }) => {
  return (
    <div className="about-project-info">
      {aboutProject?.map((item, index) => (
        <article className="about-project-info__content" key={index}>
          <h3 className="about-project-info__heading">{item.name}</h3>
          <p className="about-project-info__description">{item.description}</p>
        </article>
      ))};
    </div>
  );
};

export default AboutProjectInfo;
