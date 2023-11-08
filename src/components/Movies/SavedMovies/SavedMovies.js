import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import { filterMovies, filterDuration } from '../../../utils/filterMovies';

function SavedMovies({ savedMovies, handleRemoveMovie }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  function onSearchMovies(query) {
    setSearchQuery(query);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  useEffect(() => {
    // Фильтрация фильмов
    const moviesList = filterMovies(savedMovies, searchQuery, isShortMovies);

    // Сохранение фильмов в localStorage
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));

    // Установка отфильтрованных фильмов
    setFilteredMovies(isShortMovies ? filterDuration(moviesList) : moviesList);
  }, [savedMovies, searchQuery, isShortMovies]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
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
      <SearchForm onSearchMovies={onSearchMovies} onFilter={handleShortMovies} isShortMovies={isShortMovies} />
      <div className='saved-movies__content'>
        {filteredMovies.map((movie) => (
          <MoviesCard key={movie._id} movie={movie} handleRemoveMovie={handleRemoveMovie} isNotFound={isNotFound} isSavedFilms={true} />
        ))}
      </div>
    </div>
  );
}

export default SavedMovies;
