import React from "react";

const MoviesCard = ({card, cardButton }) => {
  return (
    <div className="movies-card">
      <div className="movies-card__content">
        <header className="movies-card__heading">
          <h2 className="movies-card__title">{card.name}</h2>
          <p className="movies-card__duration">{card.duration}</p>
        </header>
        
        {cardButton(card)}
      </div>

      <img className="movies-card__img" src={card.image} alt={card.name}></img>
    </div>
  );
};

export default MoviesCard;
