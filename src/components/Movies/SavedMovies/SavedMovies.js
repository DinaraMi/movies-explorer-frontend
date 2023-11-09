import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import { filterMovies, filterDuration } from '../../../utils/filterMovies';

function SavedMovies({ savedMovies, handleRemoveMovie }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isNotFoundError, setIsNotFoundError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  function onSearchMovies(query) {
    setSearchQuery(query);
  }

  function handleShortMovies() {
    setIsShortFilm(!isShortFilm);
  }

  useEffect(() => {
    const moviesList = filterMovies(savedMovies, searchQuery, isShortFilm);
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    setFilteredMovies(isShortFilm ? filterDuration(moviesList) : moviesList);
  }, [savedMovies, searchQuery, isShortFilm]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFoundError(true);
    } else {
      setIsNotFoundError(false);
    }
  }, [filteredMovies]);

  useEffect(() => {
    const savedMoviesData = JSON.parse(localStorage.getItem('savedMovies'));
    if (savedMoviesData) {
      setFilteredMovies(savedMoviesData);
    }
  }, []);

  return (
    <div className="saved-movies">
      <SearchForm onSearchMovies={onSearchMovies} onFilter={handleShortMovies} isShortFilm={isShortFilm} />
      <div className='saved-movies__content'>
        {filteredMovies.map((movie) => (
          <MoviesCard key={movie._id} movie={movie} handleRemoveMovie={handleRemoveMovie} isNotFound={isNotFoundError} />
        ))}
      </div>
    </div>
  );
}

export default SavedMovies;
