export const searchMovies = (movieList, stringValue, duration) => {
  const formattedStringValue = stringValue.toLowerCase();

  return movieList?.filter((movie) => {
    const nameOfMovie = movie.nameRU.toLowerCase();
    const isStringValue = nameOfMovie.includes(formattedStringValue);

    return duration ? isStringValue && movie.duration <= 40 : isStringValue;
  });
};
