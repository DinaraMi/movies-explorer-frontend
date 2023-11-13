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

  useEffect(() => {
    updateFilteredMovies(searchQuery, isShortFilm);
  }, [savedMovies, searchQuery, isShortFilm]);

  const onSearchSavedMovies = (query) => {
    setSearchQuery(query);
    updateFilteredMovies(query, isShortFilm);
  };

  const handleShortMovies = () => {
    setIsShortFilm(prevState => !prevState);
    updateFilteredMovies(searchQuery, !isShortFilm);
  };

  const updateFilteredMovies = (query, shortFilm) => {
    try {
      const moviesList = filterMovies(savedMovies, query, shortFilm);
      setFilteredMovies(shortFilm ? filterDuration(moviesList) : moviesList);
      setIsNotFoundError(shortFilm && moviesList.length === 0);
      setIsNotFoundError(false);
    } catch (error) {
      setIsNotFoundError(true);
    }
  };
  
  return (
    <div className="saved-movies">
      <SearchForm onSearchSavedMovies={onSearchSavedMovies} setSearchQuery={setSearchQuery} searchQuery={searchQuery} onFilter={handleShortMovies} isShortFilm={isShortFilm} />
      <div className='saved-movies__content'>
        {filteredMovies.map((movie) => (
          <MoviesCard key={movie.Id} movie={movie} handleRemoveMovie={handleRemoveMovie} isNotFoundError={isNotFoundError} />
        ))}
      </div>
    </div>
  );
}

export default SavedMovies;
