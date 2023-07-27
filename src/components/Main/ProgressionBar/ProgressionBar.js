import React from "react";

const ProgressionBar = () => {
  return (
    <div className="progression-bar">
      <div className="progression-bar__grid">
        <span className="progression-bar__progression progression-bar__progression-done">1 неделя</span>
        <span className="progression-bar__progression progression-bar__progression-undone">4 недели</span>
      </div>
      <div className="progression-bar__grid progression-bar__grid-titles">
        <span className="progression-bar__title">Back-end</span>
        <span className="progression-bar__title">Front-end</span>
      </div>
    </div>
  );
};

export default ProgressionBar;
