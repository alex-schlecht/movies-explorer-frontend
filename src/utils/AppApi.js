import {API_URI} from "../constants/apiURI";

class Api {
  constructor({appUrl, headers}) {
    this._appUrl = appUrl;
    this._headers = headers;
  };

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  };

  _request(url, config) {
    return fetch(`${this._appUrl}${url}`, config).then((res) => this._checkResponse(res));
  };

  getUserInfo() {
    return this._request('/users/me', {
      headers: this._headers,
      method: 'GET',
      credentials: "include"
    });
  };

  signup(email, password, name) {
    return this._request('/signup', {
      headers: this._headers,
      method: 'POST',
      credentials: "include",
      body: JSON.stringify({email, password, name})
    });
  };

  signin(email, password) {
    return this._request('/signin', {
      headers: this._headers,
      method: 'POST',
      credentials: "include",
      body: JSON.stringify({email, password})
    });
  };

  signout() {
    return this._request('/signout', {
      headers: this._headers,
      method: 'GET',
      credentials: "include"
    });
  };

  profileUpdate(name, email) {
    return this._request('/users/me', {
      headers: this._headers,
      method: 'PATCH',
      credentials: "include",
      body: JSON.stringify({name, email}),
    });
  };

  addBookmark(movie) {
    return this._request('/movies', {
      headers: this._headers,
      method: 'POST',
      credentials: "include",
      body: JSON.stringify(movie)
    });
  };

  deleteBookmark(id) {
    return this._request(`/movies/${id}`, {
      headers: this._headers,
      method: 'DELETE',
      credentials: "include"
    });
  };

  getBookmarks() {
    return this._request('/movies', {
      headers: this._headers,
      method: 'GET',
      credentials: "include"
    });
  };
};

const AppApi = new Api({
  appUrl: API_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default AppApi;
