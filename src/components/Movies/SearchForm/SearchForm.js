import { useLocation } from 'react-router-dom';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  return (
    <div className={`searchForm ${isSavedMoviesPage ? 'searchForm-movies' : ''}`}>
      <div className='searchForm__content'>
        <form>
          <input type="text" className="searchForm__input" placeholder="Фильм" />
          <button className="searchForm__button">Поиск</button>
        </form>
      </div>
      <FilterCheckbox />
      <div className='searchForm__separator'></div>
    </div>
  )
}

export default SearchForm;