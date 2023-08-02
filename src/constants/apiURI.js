//export const API_URI = "//api.movie.nomoredomains.work";
const { NODE_ENV } = process.env;
export const MOVIES_API_URI = "https://api.nomoreparties.co";
export const API_URI = NODE_ENV === 'production' ? '//api.movie.nomoredomains.work' : 'http://localhost:3000';