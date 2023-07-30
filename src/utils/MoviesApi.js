import { MOVIES_API_URI } from "../constants/apiURI";

class Api {
  constructor({ appUrl, headers }) {
    this._appUrl = appUrl;
    this._headers = headers;
  };

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  };

  _request(url, config) {
    return fetch(`${this._appUrl}${url}`, config).then((res) => this._checkResponse(res));
  };

  getMovies() {
    return this._request('/beatfilm-movies', {
      headers: this._headers
    });
  };
};

const MoviesApi = new Api({
  appUrl: MOVIES_API_URI,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default MoviesApi;
