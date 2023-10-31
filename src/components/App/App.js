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
import api from '../../utils/api';

function App() {
  const [isLoading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const displayHeader = ['/', '/saved-movies', '/movies', '/profile'].includes(location.pathname);
  const displayFooter = ['/', '/saved-movies', '/movies'].includes(location.pathname);

  const handleSaveMovie = (movie) => {
    setSavedMovies([...savedMovies, movie]);
  };

  const handleRemoveMovie = (movieToRemove) => {
    const updatedMovies = savedMovies.filter(movie => movie.id !== movieToRemove.id);
    setSavedMovies(updatedMovies);
  };

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          {displayHeader && <Header loggedIn={loggedIn} currentUser={currentUser}/>}
          {isLoading ? <Preloader /> : null}
          <Routes>
            <Route path="/" element={<Main isLoading={isLoading} />} />
            <Route path="/movies" element={<Movies handleSaveMovie={handleSaveMovie} />} />
            <Route path='/saved-movies' element={<SavedMovies savedMovies={savedMovies} handleRemoveMovie={handleRemoveMovie} />} />
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Register onRegister={handleRegister} />} />
            <Route path="/profile" element={<Profile onUpdateUser={handleUpdateUser} />} />
            <Route path="*" element={<ErrorNotFound />} />
          </Routes>
          {displayFooter && <Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;