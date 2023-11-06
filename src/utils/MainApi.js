class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  getUserInformation() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => this._checkResponse(res));
  }
  editUserInformation(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      })
    })
      .then(this._checkResponse);
  }
  getSavedMovies() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/movies`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => this._checkResponse(res));
  }
  
  addSaved(movie, movieId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        image: movie.image,
        thumbnail: movie.thumbnail,
        trailerLink: movie.trailerLink,
        movieId: movie.movieId,
        country: movie.country || "Не известно",
        director: movie.director,
        duration: movie.duration,
        description: movie.description,
        year: movie.year,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    })
      .then(this._checkResponse);
  }
  deleteSaved(movieId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://movies.explorer.api.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;