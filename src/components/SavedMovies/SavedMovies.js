import React from "react";
import SearchString from "../SearchString/SearchString";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = ({locPath}) => {
  return (
    <main className="saved-movies">
      <SearchString/>
      <MoviesCardList locPath={locPath}/>
    </main>
  );
};

export default SavedMovies;
