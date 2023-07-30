import React from "react";
import {useCallback} from "react";
import {Link, useLocation} from "react-router-dom";
import {formatImageUrl} from "../../utils/formatImageUrl";
import {editTimeFormat} from "../../utils/editTimeFormat";

const MoviesCard = ({movie, onAddBookmark, onDeleteBookmark}) => {
  const location = useLocation();

  const handleAddBookmark = useCallback(() => {
    onAddBookmark(movie);
  }, [movie]);

  const handleDeleteBookmark = useCallback(() => {
    onDeleteBookmark(movie);
  }, [movie]);

  const bookmarkIcon = () => {
    if (movie.bookmark) {
      return (<button className="movies-card__add-bookmark movies-card__add-bookmark-active" type="button" onClick={handleDeleteBookmark}></button>)
    } else {
      return (<button className="movies-card__add-bookmark" type="button" onClick={handleAddBookmark}></button>)
    };
  };

  const removeBookmarkIcon = () => {
    return (<button className={`movies-card__add-bookmark movies-card__delete-bookmark`}></button>)
  };

  const renderButton = () => {
    if (location.pathname === "/movies") {
      return bookmarkIcon();
    } else {
      return removeBookmarkIcon();
    };
  };

  return (
    <div className="movies-card">
      <div className="movies-card__content">
        <header className="movies-card__heading">
          <h2 className="movies-card__title">{movie.nameEN || movie.nameRU}</h2>
          <p className="movies-card__duration">{editTimeFormat(movie.duration)}</p>
        </header>
        {renderButton()}
      </div>
      <img className="movies-card__img" src={(movie.image.url && formatImageUrl(movie.image.url)) || movie.image} alt={movie.nameEN || movie.nameRU}></img>
      <Link className="movies-card__link" to={movie.trailer || movie.trailerLink} target="_blank"/>
    </div>
  );
};

export default MoviesCard;
