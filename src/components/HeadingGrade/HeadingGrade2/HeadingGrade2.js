import React from "react";

const HeadingGrade2 = ({ name, className = "" }) => {
  return (
    <h2 className={`heading-grade-2 ${className}`}>{name}</h2>
  );
};

export default HeadingGrade2;
