import React, { useState, useEffect, useRef } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import useViewport from '../../../hooks/useViewport';

function MoviesCardList({ handleMoviesSaved, handleSaveMovie, handleRemoveMovie, searchResults, savedMovies }) {
  const { width } = useViewport();
  const moviesToShowRef = useRef(5);
  const [visibleMovies, setVisibleMovies] = useState(moviesToShowRef.current);

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
    if (newVisibleMovies >= searchResults.length) {
      setVisibleMovies(searchResults.length);
    }
  };

  const flatSearchResults = searchResults.flat();
  const moviesToDisplay = flatSearchResults.slice(0, visibleMovies);

  return (
    <section className="movies-card-list">
      <div className='movies-card-list__content'>
        {moviesToDisplay.map((movie) => (
          <MoviesCard key={movie.movieId} movie={movie}
            onMovieSaved={handleMoviesSaved}
            handleSaveMovie={handleSaveMovie}
            onRemoveMovie={handleRemoveMovie}
            savedMovies={savedMovies}
            isLiked={movie.isLiked} />
        ))}
      </div>
      {visibleMovies < flatSearchResults.length && (
        <button className="movies-card-list__button" onClick={handleShowMoreClick}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
