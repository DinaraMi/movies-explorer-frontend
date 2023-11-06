import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import Preloader from '../../Preloader/Preloader';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'

function SearchForm({ onSearch, isLoading }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setError('Нужно ввести ключевое слово');
      setSearchResults([]);
    } else {
      setError(null);
      onSearch(searchQuery);
    }
  };

  return (
    <div className={`searchForm ${isSavedMoviesPage ? 'searchForm-movies' : ''}`}>
      <div className='searchForm__content'>
        <form onSubmit={handleSearchFormSubmit}>
          <input
            type="text"
            className="searchForm__input"
            placeholder="Фильм"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button className="searchForm__button" type="submit">
            {isLoading ? <Preloader /> : 'Поиск'}
          </button>
        </form>
      </div>
      {error && <p className="searchForm__error">{error}</p>}
      <FilterCheckbox />
      <div className='searchForm__separator'></div>
    </div>
  );
}

export default SearchForm;
