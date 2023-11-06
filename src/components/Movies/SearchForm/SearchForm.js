import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import Preloader from '../../Preloader/Preloader';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox'

function SearchForm({ onSearch, onFilter, isLoading }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const saveSearchDataToLocalStorage = (query, results) => {
    localStorage.setItem('searchQuery', query);
    localStorage.setItem('searchResults', JSON.stringify(results));
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    const savedResults = localStorage.getItem('searchResults');

    if (savedQuery && savedResults) {
      setSearchQuery(savedQuery);
      setSearchResults(JSON.parse(savedResults));
    }
  }, []);

  const handleSearchInputChange = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    onFilter(newSearchQuery);
    saveSearchDataToLocalStorage(newSearchQuery, searchResults);
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setError('Нужно ввести ключевое слово');
      // onFilter('');
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
