import React from "react";

const HeadingGrade4 = ({ name, className = "" }) => {
  return (
    <h4 className={`heading-grade-4 ${className}`}>{name}</h4>
  );
};

export default HeadingGrade4;
