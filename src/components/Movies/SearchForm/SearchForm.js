import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm({ onSearch, onFilter, isShortFilm, isShortFilmSaved, searchQuery, setSearchQuery }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const [isQueryError, setIsQueryError] = useState(false);

  // useEffect(() => {
  //   if (location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
  //     const localQuery = localStorage.getItem('movieSearch');
  //     onSearch(localQuery);
  //   } else {
  //     onSearch(searchQuery);
  //   }
  // }, [location]);

  function handleChangeQuery(e) {
    setSearchQuery(e.target.value);
    // console.log(e.target.value);
    setIsQueryError(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim().length === 0) {
      setIsQueryError(true);
    } else {
      setIsQueryError(false);
      onSearch(searchQuery);
      // console.log(searchQuery)
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
      <FilterCheckbox onFilter={onFilter} isShortFilm={isShortFilm} isShortFilmSaved={isShortFilmSaved}/>
      <div className='searchForm__separator'></div>
    </div>
  );
}

export default SearchForm;
