import React from "react";
import { useState, useEffect } from "react";
import ShortsCheckbox from "../ShortsCheckbox/ShortsCheckbox";
import useValidation from "../../hooks/useValidation";
import { useLocation } from "react-router-dom";

const SearchString = ({onSearchMovies, onResetBookmarkSearchForm}) => {
  const location = useLocation();
  const {inputValue, handleFormChange, resetForm} = useValidation();
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    const localStorageLoc = location.pathname === "/movies" ? "inputValueMovies" : "inputValueBookmark";
    const parseInputValue = JSON.parse(localStorage.getItem(localStorageLoc)) || {};
    resetForm(parseInputValue);
  }, [location.pathname]);


  function handleSelectField(event) {
    event.target.select();
  }

  const handleChangeLocal = (event) => {
    handleFormChange(event);
    const searchInputValue = event.target.value;
    if (searchInputValue.length > 0) {
      setErrorMessage("");
    };
  };

  const handleCheckboxChange = (event) => {
    handleFormChange(event);
    const checkboxValue = event.target.checked || false;
    const localStorageLoc = location.pathname === "/movies" ? "inputValueMovies" : "inputValueBookmark";
    const parseCheckbox = JSON.parse(localStorage.getItem(localStorageLoc)) || {};
    const updatedParseCheckbox = {...parseCheckbox, "shorts-checkbox__checkbox": checkboxValue};
    localStorage.setItem(localStorageLoc, JSON.stringify(updatedParseCheckbox));
    onSearchMovies(inputValue[ "search-string__movie-input" ] || "", checkboxValue);

  };

  function handleSubmit(event) {
    event.preventDefault();
    const searchInputValue = inputValue["search-string__name"] || "";
    const checkboxValue = inputValue["shorts-checkbox__checkbox"] || false;

    if (searchInputValue.length === 0) {
      setErrorMessage("Нужно ввести ключевое слово");
      return;
    } else {
      setErrorMessage("");
    };

    const localStorageNewInputValues = {
      "search-string__movie-input": searchInputValue,
      "shorts-checkbox__checkbox": checkboxValue
    };
    const localStorageLoc = location.pathname === "/movies" ? "inputValueMovies" : "inputValueBookmark";
    const localStorageInputValues = JSON.parse(localStorage.getItem(localStorageLoc)) || {};
    localStorage.setItem(localStorageLoc, JSON.stringify({...localStorageInputValues, ...localStorageNewInputValues}));
    onSearchMovies(searchInputValue, checkboxValue);
  };

  const handleReset = () => {
    resetForm();
    onResetBookmarkSearchForm();
  };

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
          onChange={handleChangeLocal}
          onClick={handleSelectField}
          value={inputValue["search-string__name"] || ""}
        >
        </input>
        {(location.pathname === "/saved-movies" && inputValue["search-string__movie-input"]?.length > 0) ?
        (<button className="search-string__button search-string__button-reset" type="button" onClick={handleReset}></button>) : ""}
        <button className="search-string__button" type="submit"></button>
      </div>
      <span className="search-string__error-text">{errorMessage}</span>
      <ShortsCheckbox onChange={handleCheckboxChange} isCheckboxValue={inputValue}/>
    </form>
  );
};

export default SearchString;
