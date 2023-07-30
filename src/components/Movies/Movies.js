import React from "react";
import SearchString from "../SearchString/SearchString";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const Movies = ({
  isLoading,
  isNewSearchAttempt,
  onSearchMovies,
  onIsNewSearchAttempt,
  isMovieList,
  onAddBookmark,
  onDeleteBookmark
}) => {

  return (
    <main className="movies">
      <SearchString onSearchMovies={onSearchMovies}/>
      {isLoading ? 
        (<Preloader/>)
        :
        (<MoviesCardList
          onAddBookmark={onAddBookmark}
          onDeleteBookmark={onDeleteBookmark}
          onIsNewSearchAttempt={onIsNewSearchAttempt}
          isNewSearchAttempt={isNewSearchAttempt}
          movieList={isMovieList}
        />)}
    </main>
  );
};

export default Movies;
