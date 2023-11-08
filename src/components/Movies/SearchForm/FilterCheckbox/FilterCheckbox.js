import React from 'react';
import './FilterCheckbox.css'
import filtr from '../../../../images/filtr.svg';
import filtrOff from '../../../../images/filtrOff.svg';

function FilterCheckbox({ isShortFilm, onFilter}) {
  return (
    <section className='filterCheckbox'>
      <label className='filterCheckbox__label'>
        <input
          type="checkbox"
          id="short-films"
          className="checkbox-input"
          checked={isShortFilm}
          onChange={onFilter}
        />
        {isShortFilm ? <img className='filter-icon' src={filtrOff} alt="Иконка выключенного фильтра" /> : <img className='filter-icon'
          src={filtr}
          alt="Иконка фильтра"
        />}
        <h2 className='filterCheckbox__title'>Короткометражки</h2>
      </label>
    </section>
  );
}

export default FilterCheckbox;