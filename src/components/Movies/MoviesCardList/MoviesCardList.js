import React, { useState, useEffect, useRef } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import useViewport from '../../../hooks/useViewport';

function MoviesCardList({ handleMoviesSaved, handleSaveMovie, handleRemoveMovie, searchResults, savedMovies }) {
  const { width } = useViewport();
  const moviesToShowRef = useRef(5);

  useEffect(() => {
    if (width >= 1280) {
      moviesToShowRef.current = 12;
    } else if (width >= 768) {
      moviesToShowRef.current = 8;
    } else {
      moviesToShowRef.current = 5;
    }
  }, [width]);

  const [visibleMovies, setVisibleMovies] = useState(moviesToShowRef.current);

  const handleShowMoreClick = () => {
    const newVisibleMovies = visibleMovies + 2;
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
          savedMovies={savedMovies} />
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
