import React from "react";

const HeadingGrade5 = ({ name, className = "" }) => {
  return (
    <h5 className={`heading-grade-5 ${className}`}>{name}</h5>
  );
};

export default HeadingGrade5;
