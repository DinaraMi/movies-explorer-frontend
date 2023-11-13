import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MoviesCard.css';
import saved from '../../../images/saved.svg';
import removeIcon from '../../../images/removeIcon.svg';
import { time } from '../../../utils/contants';

function MoviesCard({ movie, handleSaveMovie, handleRemoveMovie, savedMovies }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const [isLiked, setIsLiked] = useState(false);

  const handleSaveMovieClick = (e) => {
    e.preventDefault();
    if (isLiked) {
      const savedMovieId = savedMovies.find((savedMovie) => savedMovie.movie_id === movie._id)?._id;
      handleRemoveMovie(savedMovieId, movie._id);
      setIsLiked(false);
    } else {
      handleSaveMovie(movie);
      setIsLiked(true);
    }
  };
  
  const handleRemoveMovieClick = (e) => {
    e.preventDefault();
    handleRemoveMovie(movie._id, movie.movieId);
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
          <form onSubmit={isSavedMoviesPage ? handleRemoveMovieClick : handleSaveMovieClick}>
            {isSavedMoviesPage ? (
              <button type="submit" className="movie-card__remove-icon">
                <img className="movie-card__remove-icon-img" src={removeIcon} alt="удалить" onClick={handleRemoveMovieClick} />
              </button>
            ) : <button type="submit" className={isLiked ? "movie-card__save-icon-saved" : "movie-card__save-button"} onClick={handleSaveMovieClick}>
              {isLiked ? (
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