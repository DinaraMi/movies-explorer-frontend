import React, { useState, useEffect, useRef } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import moviesData from '../data/moviesData';
import useViewport from '../../../hooks/useViewport';

function MoviesCardList({ handleSaveMovie }) {
  const movies = moviesData;
  const [visibleMovies, setVisibleMovies] = useState(5);
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

    setVisibleMovies(moviesToShowRef.current);
  }, [width]);

  const handleShowMoreClick = () => {
    setVisibleMovies(visibleMovies + 2);
  };

  const moviesToDisplay = movies.slice(0, visibleMovies);

  return (
    <section className="movies-card-list">
      <div className='movies-card-list__content'>
        {moviesToDisplay.map((movie, id) => (
          <MoviesCard key={id} movie={movie} handleSaveMovie={handleSaveMovie} />
        ))}
      </div>
      {visibleMovies < movies.length && (
        <button className="movies-card-list__button" onClick={handleShowMoreClick}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
