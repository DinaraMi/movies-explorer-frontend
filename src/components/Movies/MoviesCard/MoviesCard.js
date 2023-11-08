import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MoviesCard.css';
import saved from '../../../images/saved.svg';
import removeIcon from '../../../images/removeIcon.svg';

function MoviesCard({ movie, handleSaveMovie, handleRemoveMovie, isLiked }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const handleSaveMovieClick = (e) => {
    e.preventDefault();
    handleSaveMovie(movie);
  };
  
  const handleRemoveMovieClick = (e) => {
    e.preventDefault();
    handleRemoveMovie(movie);
  };

  const convertDuration = (duration) => {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
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
        <img className="movie-card__image" src={movie.image} alt={movie.nameRU} />
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