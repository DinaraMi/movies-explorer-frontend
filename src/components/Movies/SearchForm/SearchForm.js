import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm({ onSearchMovies, onFilter, isShortFilm, searchQuery, setSearchQuery }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const [isQueryError, setIsQueryError] = useState(false);

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
      const localQuery = localStorage.getItem('movieSearch');
      onSearchMovies(localQuery);
    }
  }, [location]);

  function handleChangeQuery(e) {
    setSearchQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim().length === 0) {
      setIsQueryError(true);
    } else {
      setIsQueryError(false);
      onSearchMovies(searchQuery);
    }
  }

  return (
    <div className={`searchForm ${isSavedMoviesPage ? 'searchForm-movies' : ''}`}>
      <div className='searchForm__content'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="searchForm__input"
            placeholder="Фильм"
            value={searchQuery || ''}
            onChange={handleChangeQuery}
          />
          <button className="searchForm__button" type="submit">
            Поиск
          </button>
        </form>
      </div>
      {isQueryError && <p className="searchForm__error">Нужно ввести ключевое слово</p>}
      <FilterCheckbox onFilter={onFilter} isShortFilm={isShortFilm} />
      <div className='searchForm__separator'></div>
    </div>
  );
}

export default SearchForm;
