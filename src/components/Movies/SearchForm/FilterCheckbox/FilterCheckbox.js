import React from 'react';
import './FilterCheckbox.css'
import filtr from '../../../../images/filtr.svg';
import filtrClose from '../../../../images/smalltumboff.svg';
import { useLocation } from 'react-router-dom';

function FilterCheckbox({ isShortFilm, isShortFilmSaved, onFilter }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  return (
    <form className='filterCheckbox'>
      <label className='filterCheckbox__label'>
        <input
          type="checkbox"
          id="short-films"
          className="checkbox-input"
          checked={isSavedMoviesPage ? isShortFilmSaved : isShortFilm}
          onChange={onFilter}
        />
        {isShortFilm || isShortFilmSaved ? <img className='filter-icon' src={filtr} alt="Иконка выключенного фильтра" /> : <img className='filter-icon'
          src={filtrClose}
          alt="Иконка фильтра"
        />}
        <span className='filterCheckbox__title'>Короткометражки</span>
      </label>
    </form>
  );
}

export default FilterCheckbox;