import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm({onSearchMovies, onFilter, isShortMovies}) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  // const [searchQuery, setSearchQuery] = useState('');
  // const [error, setError] = useState(null);

  // const handleSearchInputChange = (e) => {
  //   const newSearchQuery = e.target.value;
  //   setSearchQuery(newSearchQuery);
  // };

  // const handleSearchFormSubmit = (e) => {
  //   e.preventDefault();
  //   if (searchQuery.trim() === '') {
  //     setError('Нужно ввести ключевое слово');
  //   } else {
  //     setError(null);
  //     onSearch(searchQuery);
  //   }
  // };
  const [isQueryError, setIsQueryError] = useState(false);
  const [query, setQuery] = useState('');
  // const location = useLocation();

  function handleChangeQuery(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim().length === 0) {
      setIsQueryError(true);
    } else {
      setIsQueryError(false);
      onSearchMovies(query);
    }
  }

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
      const localQuery = localStorage.getItem('movieSearch');
      setQuery(localQuery);
    }
  }, [location]);
  return (
    <div className={`searchForm ${isSavedMoviesPage ? 'searchForm-movies' : ''}`}>
      <div className='searchForm__content'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="searchForm__input"
            placeholder="Фильм"
            value={query || ''}
            // value={searchQuery}
            // onChange={handleSearchInputChange}
            onChange={handleChangeQuery}
          />
          <button className="searchForm__button" type="submit">
            Поиск
          </button>
        </form>
      </div>
      {isQueryError && <p className="searchForm__error">Нужно ввести ключевое слово</p>}
      <FilterCheckbox onFilter={onFilter} isShortMovies={isShortMovies}/>
      <div className='searchForm__separator'></div>
    </div>
  );
}

export default SearchForm;
