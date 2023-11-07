import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import 'normalize.css';
import '../../vendor/fonts/fonts.css';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Login from '../AuthProfile/Login/Login';
import Register from '../AuthProfile/Register/Register';
import Profile from '../AuthProfile/Profile/Profile';
import ErrorNotFound from '../ErrorNotFound/ErrorNotFound';
import Preloader from '../Preloader/Preloader';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as authentication from '../../utils/authentication.js';
import api from '../../utils/MainApi';
import apiMovies from '../../utils/MoviesApi';

function App() {
  const [isLoading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const displayHeader = ['/', '/saved-movies', '/movies', '/profile'].includes(location.pathname);
  const displayFooter = ['/', '/saved-movies', '/movies'].includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.getUserInformation()
        .then((dataUser) => {
          setCurrentUser(dataUser)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [loggedIn]);

  const handleRegister = (name, email, password) => {
    setLoading(true);
    authentication.register(name, email, password)
      .then(() => {
        navigate('/signin');
      })
      .catch(error => {
        throw new Error(`Регистрация не удалась: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogin = (email, password) => {
    setLoading(true);
    authentication.authorize(email, password)
      .then((data) => {
        if (data && data.token) {
          authentication.setToken(data.token);
          setLoggedIn(true);
          navigate('/movies');
        } else if (data && data.statusCode === 401) {
          console.log('Неверные email или пароль');
        } else {
          console.log('Что-то пошло не так!');
        }
      })
      .catch(error => {
        console.error('Ошибка при авторизации:', error);
        console.log('Что-то пошло не так!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (loggedIn) {
      const token = authentication.getToken();
      if (token) {
        authentication.checkinValidityToken(token)
          .catch(error => {
            console.log(error);
          });
      }
    }
  }, [loggedIn]);

  const handleAutoLogin = (token) => {
    setLoading(true);
    localStorage.setItem('token', token);
    setLoggedIn(true);
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      handleAutoLogin(token);
    }
    const authenticationToken = authentication.getToken();
    if (authenticationToken) {
      authentication.checkinValidityToken(authenticationToken)
        .then(() => {
          setLoggedIn(true);
        })
        .catch(error => {
          console.log(error);
          setLoggedIn(false);
        });
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleUpdateUser = (dataUser) => {
    setLoading(true);
    api.editUserInformation(dataUser)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          alert('Пользователь с таким email уже существует');
        } else {
          console.error(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const handleLogout = () => {
    localStorage.removeItem('searchResults');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('shortMovies');
    setSearchResults([]);
    setSearchQuery('');
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  };


  const handleSearch = (searchQuery) => {
    setLoading(true);
    apiMovies.getSearchMovies(searchQuery)
      .then((res) => {
        const formatMovies = res.map((filterMovie) => ({
          image: `https://api.nomoreparties.co${filterMovie.image.url}`,
          thumbnail: `https://api.nomoreparties.co${filterMovie.image.url}`,
          trailerLink: filterMovie.trailerLink,
          movieId: filterMovie.id,
          country: filterMovie.country || "Не известно",
          director: filterMovie.director,
          duration: filterMovie.duration,
          description: filterMovie.description,
          year: filterMovie.year,
          nameRU: filterMovie.nameRU,
          nameEN: filterMovie.nameEN,
        }));
        setSearchResults(formatMovies);
        localStorage.setItem('searchResults', JSON.stringify(formatMovies));
      })
      .catch((err) => {
        err('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const savedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedSearchResults) {
      setSearchResults(savedSearchResults);
    }
    if (savedQuery) {
      setSearchQuery(savedQuery);
      handleSearch(savedQuery);
    }
  }, []);
  
useEffect(() => {
  if (loggedIn) {
    api.getSavedMovies()
      .then((savedMovies) => {
        const updatedMovies = searchResults.map(movie => ({
          ...movie,
          isLiked: savedMovies.some(savedMovie => savedMovie.movieId === movie.movieId),
        }));
        setSearchResults(updatedMovies);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}, [loggedIn]);

useEffect(() => {
  const savedMoviesFromLocalStorage = JSON.parse(localStorage.getItem('savedMovies'));
  if (savedMoviesFromLocalStorage) {
    setSavedMovies(savedMoviesFromLocalStorage);
  }
}, []);

const handleSaveMovie = (movie) => {
  api.addSaved(movie)
    .then((newCard) => {
      setSavedMovies([...savedMovies, newCard]);
      localStorage.setItem('savedMovies', JSON.stringify([...savedMovies, newCard]));
      const updatedMovies = searchResults.map(searchMovie => {
        if (searchMovie.movieId === newCard.movieId) {
          return { ...searchMovie, isLiked: true };
        }
        return searchMovie;
      });
      setSearchResults(updatedMovies);
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleRemoveMovie = (movieToRemove) => {
  api.deleteSaved(movieToRemove._id)
    .then(() => {
      const updatedSavedMovies = savedMovies.filter(savedMovie => savedMovie._id !== movieToRemove._id);
      setSavedMovies(updatedSavedMovies);
      localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
      const updatedMovies = searchResults.map(searchMovie => {
        if (searchMovie.movieId === movieToRemove.movieId) {
          return { ...searchMovie, isLiked: false };
        }
        return searchMovie;
      });
      setSearchResults(updatedMovies);
    })
    .catch((error) => {
      console.log(error);
    });
};

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          {displayHeader && <Header loggedIn={loggedIn} currentUser={currentUser} onLogout={handleLogout} />}
          {isLoading ? <Preloader /> : null}
          <Routes>
            <Route path="/" element={<Main isLoading={isLoading} />} />
            <Route path="/movies" element={<Movies
              searchQuery={searchQuery}
              onSearch={handleSearch}
              searchResults={searchResults}
              handleSaveMovie={handleSaveMovie}
              handleRemoveMovie={handleRemoveMovie}
              savedMovies={savedMovies}
              isLiked={isLiked} />} />
            <Route path='/saved-movies' element={<SavedMovies savedMovies={savedMovies} handleRemoveMovie={handleRemoveMovie} />} />
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Register onRegister={handleRegister} />} />
            <Route path="/profile" element={<Profile onUpdateUser={handleUpdateUser} onLogout={handleLogout} />} />
            <Route path="*" element={<ErrorNotFound />} />
          </Routes>
          {displayFooter && <Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;