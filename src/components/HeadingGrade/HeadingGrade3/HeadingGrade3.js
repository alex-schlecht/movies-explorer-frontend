import React from "react";

const HeadingGrade3 = ({ name, className = "" }) => {
  return (
    <h3 className={`heading-grade-3 ${className}`}>{name}</h3>
  );
};

export default HeadingGrade3;
