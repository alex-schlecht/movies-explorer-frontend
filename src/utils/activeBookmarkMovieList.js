export const activeBookmarkMovieList = (movieList, bookmarkMovieList) => {
  return movieList.map((movie) => {
    const bookmarkMovie = bookmarkMovieList.find((bookmark) => bookmark.movieId === movie.id);

    const editMovieList = !!bookmarkMovie;
    const edittedMovie = { ...movie, bookmark: editMovieList };

    if (bookmarkMovie) {
      edittedMovie._id = bookmarkMovie._id;
    }

    return edittedMovie;
  });
};
