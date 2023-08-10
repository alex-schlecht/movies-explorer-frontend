import React from "react";
import SearchString from "../SearchString/SearchString";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = ({
  isMovieList,
  onSearchMovies,
  onDeleteBookmark,
  isInput,
  onResetBookmarkSearchForm,
  isBookmarkSearchMovieList
}) => {
  return (
    <main className="saved-movies">
      <SearchString
        onSearchMovies={onSearchMovies}
        isInput={isInput}
        onResetBookmarkSearchForm={onResetBookmarkSearchForm}
      />
      <MoviesCardList 
        movieList={isMovieList}
        isBookmarkSearchMovieList={isBookmarkSearchMovieList}
        onDeleteBookmark={onDeleteBookmark}
      />
    </main>
  );
};

export default SavedMovies;
