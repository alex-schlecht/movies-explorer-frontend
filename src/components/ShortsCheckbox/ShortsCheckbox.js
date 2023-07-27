import React from "react";
import { useState } from "react";

const ShortsCheckbox = ({className = ""}) => {
  const [checkbox, setCheckbox] = useState(true);

  const handleChange = (state) => {
    setCheckbox(!state);
  };

  return (
    <div className={`shorts-checkbox ${className}`}>
      <input 
        className="shorts-checkbox__checkbox" 
        type="checkbox" 
        name="checkbox"
        id="shorts-checkbox__checkbox"
        onChange={handleChange}
        defaultChecked={checkbox}
      ></input>
      <span className="shorts-checkbox__name">
        Короткометражки
      </span>
    </div>
  );
};

export default ShortsCheckbox;
