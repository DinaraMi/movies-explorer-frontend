import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import { filterMovies, filterDuration } from '../../../utils/filterMovies';

function SavedMovies({ savedMovies, handleRemoveMovie, loggedIn }) {
  const [originalMovies, setOriginalMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortFilmSaved, setIsShortFilmSaved] = useState(false);
  const [searchQuerySaved, setSearchQuerySaved] = useState('');
  const [isNotFoundError, setIsNotFoundError] = useState(false);

  useEffect(() => {
    setOriginalMovies(savedMovies);
    setFilteredMovies(savedMovies);
  }, [savedMovies]);


  const onSearchSavedMovies = (query) => {
    localStorage.setItem('movieSaveSearch', query);
    setSearchQuerySaved(query);
    updateFilteredMovies(query, isShortFilmSaved);
  };
  
  const handleShortMoviesSaved = () => {
    setIsShortFilmSaved(!isShortFilmSaved);
    updateFilteredMovies(searchQuerySaved, !isShortFilmSaved);
  };

  const updateFilteredMovies = (query, shortFilm) => {
    let moviesToFilter = [...originalMovies];
    if (query.trim() !== '' || shortFilm) {
      if (query.trim() !== '') {
        moviesToFilter = filterMovies(moviesToFilter, query, false);
      }
      if (shortFilm) {
        moviesToFilter = filterDuration(moviesToFilter);
      }
    }
    setFilteredMovies(moviesToFilter);
    setIsNotFoundError((query.trim() !== '' || shortFilm) && moviesToFilter.length === 0);
  };
  
  useEffect(() => {
    setIsNotFoundError(isShortFilmSaved && filteredMovies.length === 0);
  }, [filteredMovies, isShortFilmSaved]);
  
  const handleRemoveMovieInSavedMovies = (_id, movie_id) => {
    handleRemoveMovie(_id, movie_id);
    const updatedMoviesList = originalMovies.filter(savedMovie => savedMovie._id !== _id);
    setOriginalMovies(updatedMoviesList);
    updateFilteredMovies(searchQuerySaved, isShortFilmSaved);
  };
  
  const movieSaveSearch = localStorage.getItem('movieSaveSearch');

  return (
    <div className="saved-movies">
      <SearchForm
        onSearch={onSearchSavedMovies}
        setSearchQuery={setSearchQuerySaved}
        searchQuery={searchQuerySaved}
        onFilter={handleShortMoviesSaved}
        isShortFilmSaved={isShortFilmSaved}
      />
      <div className='saved-movies__content'>
        {filteredMovies.map((movie) => (
          <MoviesCard key={movie.movieId} movie={movie} handleRemoveMovieInSavedMovies={handleRemoveMovieInSavedMovies} />
        ))}
        {movieSaveSearch?.length > 0 && filteredMovies.length === 0 && <span>Ничего не найдено</span>}
      </div>
    </div>
  );
}

export default SavedMovies;