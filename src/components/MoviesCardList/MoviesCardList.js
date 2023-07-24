import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { MoviesArray } from "../../utils/constants";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";

const MoviesCardList = ({locPath}) => {
  const addToBookmark = (card) => {
    return (
      <button className={`movies-card__add-bookmark ${card.bookmark ? "movies-card__add-bookmark-active" : "movies-card__bookmark-disabled"}`} type="button"></button>
    );
  };

  const removeFromBookmark = (card) => {
    return (
      <button className={`movies-card__delete-bookmark`} type="button"></button>
    );
  };

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__cards">
        {MoviesArray?.map((card, index) => (
          <li key={index}>
            <MoviesCard cardButton={locPath === "/movies" ? (addToBookmark) : (removeFromBookmark)} card={card}/>
          </li>
        ))}  
      </ul>
      {locPath === "/movies" ? (<ShowMoreButton/>) : null}
    </section>
  );
};

export default MoviesCardList;
