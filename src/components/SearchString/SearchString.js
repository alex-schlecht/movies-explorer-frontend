import React from "react";
import { useState } from "react";
import ShortsCheckbox from "../ShortsCheckbox/ShortsCheckbox";

const SearchString = () => {
  const [value, setValue] = useState('');

  function handleSelectField(event) {
    event.target.select();
  }

  function handleFormChange(event) {
    event.preventDefault();
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form className="search-string" onSubmit={handleSubmit}>
      <div className="search-string__container">
        <div className="search-string__search-icon"></div>
        <input 
          className="search-string__movie-input"
          name="search-string__name"
          id="search-string__name"
          type="text"
          placeholder="Фильм"
          required
          onChange={handleFormChange}
          onClick={handleSelectField}
          value={value}
        >
        </input>
        <button className="search-string__button" type="submit"></button>
      </div>
      <ShortsCheckbox className="search-string__shorts-checkbox"/>
    </form>
  );
};

export default SearchString;
