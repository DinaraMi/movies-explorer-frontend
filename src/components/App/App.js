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
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('searchResults');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('shortMovies');
    setSearchResults([]);
    setSearchQuery('');
  // setShortMovies(false);
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
        if (formatMovies.length > 0) {
          // console.log("Первый фильм в массиве:", formatMovies[0]);
        }
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
      handleSearch(savedQuery)
    }
  }, []);
  
  const filterMovies = (searchQuery) => {
    const lowercaseQuery = searchQuery.toLowerCase();
    const filteredMovies = searchResults.filter((movie) => {
      const nameRU = movie.nameRU.toLowerCase();
      const nameEN = movie.nameEN.toLowerCase();
      return nameRU.includes(lowercaseQuery) || nameEN.includes(lowercaseQuery);
    });
    setSearchResults(filteredMovies);
  };

  // const handleSaveMovie = (movie) => {
  //   setSavedMovies([...savedMovies, movie]);
  // };

  // const handleRemoveMovie = (movieToRemove) => {
  //   const updatedMovies = savedMovies.filter(movie => movie.id !== movieToRemove.id);
  //   setSavedMovies(updatedMovies);
  // };
  
  // const handleMoviesSaved = (movie) => {
  //   const isLiked = movie.some(i => i.id === currentUser.id);
  //   if (isLiked) {
  //     apiMovies.addSaved(movie._id)
  //       .then((newCard) => {
  //         setSavedMovies((state) => state.map((c) => c.id === movie.id ? newCard : c));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else {
  //     apiMovies.deleteSaved(movie._id).then((newCard) => {
  //       setSavedMovies((state) => state.map((c) => c.id === movie.id ? newCard : c));
  //     })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  // При старте приложения
useEffect(() => {
  if (loggedIn) {
    // Запрос к серверу для получения сохраненных фильмов
    api.getSavedMovies()
      .then((savedMovies) => {
        // Обновление состояния с флагом isLiked
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

const handleSaveMovie = (movie) => {
  const userId = currentUser._id;
  const movieWithUserId = {
    ...movie,
    owner: userId
  };
  console.log('Movie to be sent:', movieWithUserId);
  api.addSaved( movie, movieWithUserId)
    .then((newCard) => {
      setSavedMovies([...savedMovies, newCard]);
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
              onFilter={filterMovies}
              handleSaveMovie={handleSaveMovie}
              handleRemoveMovie={handleRemoveMovie}
              // handleMoviesSaved={handleMoviesSaved}
              savedMovies={savedMovies} />} />
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