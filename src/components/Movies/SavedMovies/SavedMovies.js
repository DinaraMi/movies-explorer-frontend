import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import { filterMovies, filterDuration } from '../../../utils/filterMovies';
import api from '../../../utils/MainApi';

function SavedMovies({ savedMovies, handleRemoveMovie, loggedIn }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotFoundError, setIsNotFoundError] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      api.getSavedMovies()
        .then((savedMovies) => {
          const updatedMovies = filteredMovies.map(movie => ({
            ...movie,
            isLiked: savedMovies.some(savedMovie => savedMovie.movieId === movie.movieId),
          }));
          setFilteredMovies(updatedMovies);
          const moviesList = filterMovies(savedMovies, searchQuery, isShortFilm);
          setFilteredMovies(isShortFilm ? filterDuration(moviesList) : moviesList);
          setIsNotFoundError(isShortFilm && moviesList.length === 0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn, searchQuery, isShortFilm]);

  // useEffect(() => {
  //   const storedSearchQuery = localStorage.getItem('movieSearch');
  //   const storedIsShortFilm = localStorage.getItem('shortMovies') === 'true';
  //   setSearchQuery(storedSearchQuery || '');
  //   setIsShortFilm(storedIsShortFilm || false);
  //   updateFilteredMovies(storedSearchQuery, storedIsShortFilm);
  // }, []);

  const onSearchSavedMovies = (query) => {
    setSearchQuery(query);
    // localStorage.setItem('movieSearch', query);
    updateFilteredMovies(query, isShortFilm);
  };

  const handleShortMovies = () => {
    const newIsShortFilm = !isShortFilm;
    setIsShortFilm(newIsShortFilm);
    // localStorage.setItem('shortMovies', newIsShortFilm);
    updateFilteredMovies(searchQuery, newIsShortFilm);
  };

  const updateFilteredMovies = (query, shortFilm) => {
    const moviesList = filterMovies(savedMovies, query, shortFilm);
    setFilteredMovies(shortFilm ? filterDuration(moviesList) : moviesList);
  };

  useEffect(() => {
    setIsNotFoundError(isShortFilm && filteredMovies.length === 0);
  }, [filteredMovies, isShortFilm]);
  
  const handleRemoveMovieInSavedMovies = (_id, movie_id) => {
    handleRemoveMovie(_id, movie_id);
    const updatedMoviesList = savedMovies.filter(savedMovie => savedMovie._id !== _id);
    setFilteredMovies(filterMovies(updatedMoviesList, searchQuery, isShortFilm));
    setIsNotFoundError(isShortFilm && updatedMoviesList.length === 0);
  };

  return (
    <div className="saved-movies">
      <SearchForm
        onSearchSavedMovies={onSearchSavedMovies}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        onFilter={handleShortMovies}
        isShortFilm={isShortFilm}
      />
      <div className='saved-movies__content'>
        {filteredMovies.map((movie) => (
          <MoviesCard key={movie.Id} movie={movie} handleRemoveMovieInSavedMovies={handleRemoveMovieInSavedMovies} />
        ))}
        {isNotFoundError && <span>Ничего не найдено</span>}
      </div>
    </div>
  );
}

export default SavedMovies;