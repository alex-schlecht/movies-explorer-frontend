import React from "react";
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useResize } from "../../hooks/useResize";
import MoviesCard from "../MoviesCard/MoviesCard";
import ShowMoreButton from "../Movies/ShowMoreButton/ShowMoreButton";
import {
  SCREEN_1280,
  SCREEN_768,
  SCREEN_544,
  MOVIES_SCREEN_1280,
  MOVIES_SCREEN_768,
  MOVIES_SCREEN_544,
  MOVIES_SCREEN_1280_ADD,
  MOVIES_SCREEN_768_ADD,
  MOVIES_SCREEN_544_ADD
} from "../../constants/renderMoviesQuantity";

const MoviesCardList = ({movieList, isNewSearchAttempt, onIsNewSearchAttempt, isBookmarkSearchMovieList, onDeleteBookmark, onAddBookmark}) => {
  const location = useLocation();
  const [loadLimit, setLoadLimit] = useState(0);
  const [loadMoreQuant, setLoadMoreQuant] = useState(0);
  const [renderMoviesArray, setRenderMoviesArray] = useState([]);
  const [rememberSearch, setRememberSearch] = useState(false);
  const { width } = useResize();

  useEffect(() => {
    const localStorageKey = location.pathname === "/movies" ? "inputValueMovies" : "inputValueBookmark";
    const parseValue = JSON.parse(localStorage.getItem(localStorageKey)) || {};
    if (parseValue?.hasOwnProperty("search-string__name") && renderMoviesArray && renderMoviesArray.length === 0) {
      setRememberSearch(true);
    } else {
      setRememberSearch(false);
    }
  }, [renderMoviesArray, isBookmarkSearchMovieList]);

  useEffect(() => {
    if (width >= SCREEN_1280) {
      setLoadLimit(MOVIES_SCREEN_1280);
      setLoadMoreQuant(MOVIES_SCREEN_1280_ADD);
    } else if (width < SCREEN_768 && width >= SCREEN_544) {
      setLoadLimit(MOVIES_SCREEN_768);
      setLoadMoreQuant(MOVIES_SCREEN_768_ADD);
    } else {
      setLoadLimit(MOVIES_SCREEN_544);
      setLoadMoreQuant(MOVIES_SCREEN_544_ADD);
    }

  }, [width]);

  useEffect(() => {
    if (location.pathname === "/movies" && (renderMoviesArray.length === 0 || isNewSearchAttempt)) {
      setRenderMoviesArray(movieList.slice(0, loadLimit));
      onIsNewSearchAttempt(false);
    } else if (location.pathname === "/saved-movies") {
      setRenderMoviesArray(movieList);
    } else {
      setRenderMoviesArray(movieList.slice(0, renderMoviesArray.length));
    }
  }, [movieList, loadLimit]);

  const handleLoadMore = () => {
    localStorage.setItem('countRenderMovie', JSON.stringify(renderMoviesArray.length + loadMoreQuant));
    setRenderMoviesArray(movieList.slice(0, renderMoviesArray.length + loadMoreQuant));
  };


  return (
    <section className="movies-card-list">
      {(() => {
        if (renderMoviesArray && renderMoviesArray.length !== 0) {
          return (
            <ul className="movies-card-list__cards">
            {renderMoviesArray?.map((movie) => (
              <li key={movie.id || movie.movieId}>
                <MoviesCard movie={movie} onDeleteBookmark={onDeleteBookmark} onAddBookmark={onAddBookmark}/>
              </li>
            ))}  
          </ul>);
        } else if (renderMoviesArray && renderMoviesArray.length === 0 && rememberSearch) {
          return (
            <p className="movies-card-list__none">Ничего не найдено</p>
          );
        } else {
          return "";
        }
      })()}
      {location.pathname === '/movies' 
      && renderMoviesArray.length > 3 
      && renderMoviesArray.length < movieList.length ? 
      (<ShowMoreButton onLoadMore={handleLoadMore}/>) : null}
    </section>
  );
};

export default MoviesCardList;
