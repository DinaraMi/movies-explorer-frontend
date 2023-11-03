import React from 'react';
import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';

function SavedMovies({ savedMovies, handleRemoveMovie }) {
  return (
    <div className="saved-movies">
      <SearchForm />
      <div className='saved-movies__content'>
        {savedMovies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} handleRemoveMovie={handleRemoveMovie} />
        ))}
      </div>
    </div>
  );
}

export default SavedMovies;