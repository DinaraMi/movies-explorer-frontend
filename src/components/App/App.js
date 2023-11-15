import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import ProtectedRouteElement from '../ProtectedRoute';
import ErrorNotFound from '../ErrorNotFound/ErrorNotFound';
import Preloader from '../Preloader/Preloader';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as authentication from '../../utils/authentication.js';
import api from '../../utils/MainApi';

function App() {
  const [isLoading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('loggedIn')) || false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errorMessageAuth, setErrorMessageAuth] = useState('');
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
        handleLogin(email, password);
      })
      .catch((error) => {
        if (error.status === 409) {
          setErrorMessageAuth('Пользователь с таким email уже существует');
        } else {
          console.error(error);
          setErrorMessageAuth(`При регистрации пользователя произошла ошибка: ${error.message}`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogin = (email, password) => {
    setLoading(true);
    authentication
      .authorize(email, password)
      .then((data) => {
        if (data && data.token) {
          authentication.setToken(data.token);
          setLoggedIn(true);
          localStorage.setItem('loggedIn', true);
          navigate('/movies');
        } else if (data && data.statusCode === 401) {
          setErrorMessageAuth('Вы ввели неправильный логин или пароль.');
        } else {
          setErrorMessageAuth('При авторизации произошла неизвестная ошибка.');
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          setErrorMessageAuth('Вы ввели неправильный логин или пароль.');
        } else if (error.status === 400) {
          setErrorMessageAuth('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
        } else if (error.status === 403) {
          setErrorMessageAuth('При авторизации произошла ошибка. Переданный токен некорректен.');
        } else {
          setErrorMessageAuth('При авторизации произошла неизвестная ошибка.');
        }
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
    localStorage.setItem('loggedIn', true);
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
          localStorage.setItem('loggedIn', true);
        })
        .catch(error => {
          console.log(error);
          setLoggedIn(false);
          localStorage.setItem('loggedIn', false);
        });
    } else {
      setLoggedIn(false);
      localStorage.setItem('loggedIn', false);
    }
  }, []);

  const handleUpdateUser = (dataUser) => {
    setLoading(true);
    api.editUserInformation(dataUser)
      .then((dataUser) => {
        setCurrentUser(dataUser);
        setIsSaveSuccess(true);
      })
      .catch((error) => {
        if (error.status === 409) {
          setIsSaveSuccess(false);
          setSubmitError('Пользователь с таким email уже существует');
        } else {
          setIsSaveSuccess(false);
          console.error(error);
          setSubmitError(`При обновлении профиля произошла ошибка: ${error.message}`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('movies');
    localStorage.removeItem('movieSearch');
    localStorage.removeItem('shortMovies');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('searchResults');
    localStorage.removeItem('savedMovies');
    // localStorage.removeItem('moviesSearch');
    setSearchResults([]);
    setLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
    setIsLiked(false);
    setIsSaveSuccess(false);
    setSubmitError('');
    navigate('/');
  };

  const handleSaveMovie = (movie) => {
    api.createSavedMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
        // console.log(newMovie);
        const updatedMovies = searchResults.map(filteredMovie => {
          if (filteredMovie.movieId === newMovie.movieId) {
            return { ...filteredMovie, isLiked: true };
          }
          return filteredMovie;
        });
        setSearchResults(updatedMovies);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveMovie = (_id, movieId) => {
    api.deleteSaved(_id, movieId)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter(savedMovie => savedMovie._id !== _id);
        setSavedMovies(updatedSavedMovies);
        const updatedMovies = searchResults.map(searchMovie => {
          if (searchMovie.movieId === movieId) {
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
            <Route path="/movies" element={
              <ProtectedRouteElement
                element={Movies}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                handleSaveMovie={handleSaveMovie}
                handleRemoveMovie={handleRemoveMovie}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                isLiked={isLiked}
                loggedIn={loggedIn}
                // newMovie={newMovie}
              />} />
            <Route path='/saved-movies' element={
              <ProtectedRouteElement
                element={SavedMovies}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                handleRemoveMovie={handleRemoveMovie}
                isLiked={isLiked}
                loggedIn={loggedIn}
              />} />
            <Route path="/signin" element={loggedIn ? <Navigate to="/movies" /> : <Login onLogin={handleLogin}
              errorMessageAuth={errorMessageAuth}
              setErrorMessageAuth={setErrorMessageAuth} />} />
            <Route path="/signup" element={loggedIn ? <Navigate to="/movies" /> : <Register onRegister={handleRegister}
              errorMessageAuth={errorMessageAuth}
              setErrorMessageAuth={setErrorMessageAuth} />} />
            <Route path="/profile" element={
              <ProtectedRouteElement
                element={Profile}
                onUpdateUser={handleUpdateUser}
                onLogout={handleLogout}
                loggedIn={loggedIn}
                submitError={submitError}
                isSaveSuccess={isSaveSuccess}
                setSubmitError={setSubmitError}
                setIsSaveSuccess={setIsSaveSuccess} />} />
            <Route path="*" element={<ErrorNotFound />} />
          </Routes>
          {displayFooter && <Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;