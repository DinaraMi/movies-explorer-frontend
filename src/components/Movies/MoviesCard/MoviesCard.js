import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MoviesCard.css';
import saved from '../../../images/saved.svg';
import removeIcon from '../../../images/removeIcon.svg';
import { time } from '../../../utils/contants';
// import api from '../../../utils/MainApi';

function MoviesCard({ movie, handleSaveMovie, handleRemoveMovie, savedMovies, isSaved, filteredMovies, handleRemoveMovieInSavedMovies }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const [isLiked, setIsLiked] = useState(false);

  const handleSaveMovieClick = (e) => {
    e.preventDefault();
    const savedMovieId = savedMovies.find((savedMovie) => savedMovie.movie_id === movie._id)?._id;
    if (isLiked || isSaved) {
      if (savedMovieId) {
        handleRemoveMovie(savedMovieId, movie._id);
        console.log(savedMovieId);
        console.log(movie._id);
        setIsLiked(false);
      }
    } else {
      handleSaveMovie(movie);
      setIsLiked(true);
    }
  };

  // const handleSaveMovieClick = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const savedMoviesFromServer = await api.getSavedMovies();
  //     const savedMovieId = savedMoviesFromServer.find((savedMovie) => savedMovie.movie_id === movie._id)?._id;
      
  //     if (isLiked || movie.isSaved) {
  //       if (savedMovieId) {
  //         await handleRemoveMovie(savedMovieId, movie._id);
  
  //         // Обновление movie, чтобы установить movie.isLiked в false
  //         savedMovieId((prevMovie) => ({ ...prevMovie, isSaved: false }));
  //         setIsLiked(false);
  //       }
  //     } else {
  //       await handleSaveMovie(movie);
  //       setIsLiked(true);
  //     }
  
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  

  const handleRemoveMovieClick = (e) => {
    e.preventDefault();
    handleRemoveMovieInSavedMovies(movie._id, movie.movie_id);
  };

  const convertDuration = (duration) => {
    const minutes = duration % time;
    const hours = Math.floor(duration / time);
    if (hours < 1) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  return (
    <div className="movie-card">
      <Link to={movie.trailerLink} target="_blank" rel="noopener noreferrer" className='trailerLink'>
        <div className='movie-card__content'>
          <div className='movie-card__description'>
            <h2 className="movie-card__title">{movie.nameRU}</h2>
            <p className="movie-card__duration">{(convertDuration(movie.duration))}</p>
          </div>
          {isSavedMoviesPage ? (<img className="movie-card__image" src={movie.image} alt={movie.nameRU} />) : (
            <img className="movie-card__image" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU}
            />)}
          <form onSubmit={(isSavedMoviesPage ? handleRemoveMovieClick : handleSaveMovieClick)}>
            {isSavedMoviesPage ? (
              <button type="submit" className="movie-card__remove-icon">
                <img className="movie-card__remove-icon-img" src={removeIcon} alt="удалить" onClick={handleRemoveMovieClick} />
              </button>
            ) : <button type="submit" className={isLiked || isSaved ? "movie-card__save-icon-saved" : "movie-card__save-button"} onClick={handleSaveMovieClick} >
              {isLiked || isSaved ? (
                <img className="movie-card__save-icon-saved-img" src={saved} alt="Сохранено" />
              ) : (
                "Сохранить"
              )}
            </button>}
          </form>
        </div>
      </Link>
    </div>
  );
}

export default MoviesCard;