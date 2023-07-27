import React from "react";
import SearchString from "../SearchString/SearchString";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const Movies = ({locPath, isLoading}) => {
  return (
    <main className="movies">
      <SearchString/>
      {isLoading && (<Preloader/>)}
      <MoviesCardList locPath={locPath}/>
    </main>
  );
};

export default Movies;
