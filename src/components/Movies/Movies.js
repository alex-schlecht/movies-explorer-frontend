import SearchString from "../SearchString/SearchString";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const Movies = ({
  isLoading,
  isNewSearchAttempt,
  onSearchMovies,
  onIsNewSearchAttempt,
  movieList,
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
          movieList={movieList}
        />)}
    </main>
  );
};

export default Movies;
