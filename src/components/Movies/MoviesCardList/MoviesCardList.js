import React, { useState, useEffect, useRef } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import useViewport from '../../../hooks/useViewport';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList({ handleMoviesSaved, handleSaveMovie, handleRemoveMovie, savedMovies, isLiked, dataMovies, isNotFound, isReqErr }) {
  const { width } = useViewport();
  const moviesToShowRef = useRef(5);
  const [visibleMovies, setVisibleMovies] = useState(moviesToShowRef.current);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (width >= 1165) {
      moviesToShowRef.current = 12;
    } else if (width >= 657) {
      moviesToShowRef.current = 8;
    } else if (width >= 320) {
      moviesToShowRef.current = 5;
    }
    setVisibleMovies(moviesToShowRef.current);
  }, [width]);

  const handleShowMoreClick = () => {
    let additionalMovies = 2;
    if (width >= 1165) {
      additionalMovies = 3;
    }
    const newVisibleMovies = visibleMovies + additionalMovies;
    setVisibleMovies(newVisibleMovies);
    if (newVisibleMovies >= dataMovies.length) {
      setVisibleMovies(dataMovies.length);
    }
  };

  const flatDataMovies = dataMovies.flat();
  const moviesToDisplay = flatDataMovies.slice(0, visibleMovies);

  return (
    <section className="movies-card-list">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && <span>Ничего не найдено</span>}
      {isReqErr && !isLoading && (
        <span>Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз</span>)}
      <div className='movies-card-list__content'>
        {moviesToDisplay.map((movie) => (
          <MoviesCard key={movie.movieId} movie={movie}
            onMovieSaved={handleMoviesSaved}
            handleSaveMovie={handleSaveMovie}
            onRemoveMovie={handleRemoveMovie}
            savedMovies={savedMovies}
            isLiked={isLiked} />
        ))}
      </div>
      {visibleMovies < flatDataMovies.length && (
        <button className="movies-card-list__button" onClick={handleShowMoreClick}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
