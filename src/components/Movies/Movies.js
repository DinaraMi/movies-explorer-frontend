import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import { filterMovies, filterDuration } from '../../utils/filterMovies';
import { useEffect, useState } from 'react';
import apiMovies from '../../utils/MoviesApi';

function Movies({ handleSaveMovie, handleRemoveMovie, savedMovies, isLiked }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [isNotFoundError, setIsNotFoundError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  function handleFilterMovies(movies, query, short) {
    const filteredResults = filterMovies(movies, query, short);
    setSearchResults(filteredResults);
    setFilteredMovies(short ? filterDuration(filteredResults) : filteredResults);
    localStorage.setItem('movies', JSON.stringify(filteredResults));
    localStorage.setItem('allMovies', JSON.stringify(movies));
  }

  useEffect(() => {
    setFilteredMovies(isShortFilm ? filterDuration(searchResults) : searchResults);
  }, [searchResults, isShortFilm]);

  function handleShortMovies() {
    setIsShortFilm(!isShortFilm);
    handleFilterMovies(searchResults, searchQuery, !isShortFilm);
    localStorage.setItem('shortMovies', !isShortFilm);
    localStorage.setItem('movies', JSON.stringify(searchResults));
  }

  function onSearchMovies(query) {
    setSearchQuery(query);
    localStorage.setItem('movieSearch', query);
    localStorage.setItem('shortMovies', isShortFilm);
    if (localStorage.getItem('allMovies')) {
      const movies = JSON.parse(localStorage.getItem('allMovies'));
      handleFilterMovies(movies, query, isShortFilm);
    } else {
      setIsLoading(true);
      apiMovies.getSearchMovies()
        .then((dataMovies) => {
          if (dataMovies.length === 0) {
            setIsNotFoundError(true);
          } else {
            setIsNotFoundError(false);
            handleFilterMovies(dataMovies, query, isShortFilm);
            localStorage.setItem('movies', JSON.stringify(dataMovies));
          }
          setIsServerError(false);
        })
        .catch((err) => {
          setIsServerError(true);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setIsShortFilm(true);
    } else {
      setIsShortFilm(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setSearchResults(movies);
      if (localStorage.getItem('shortMovies') === 'true') {
        setFilteredMovies(filterDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('movieSearch')) {
      if (filteredMovies.length === 0 && !isNotFoundError) {
        setIsNotFoundError(true);
      } else {
        setIsNotFoundError(false);
      }
    } else {
      setIsNotFoundError(false);
    }
  }, [filteredMovies]);

  return (
    <main className='movies'>
      <SearchForm
        onSearchMovies={onSearchMovies}
        onFilter={handleShortMovies}
        isShortFilm={isShortFilm}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        filteredMovies={filteredMovies}
        searchResults={searchResults}
        isLiked={isLiked}
        isLoading={isLoading}
        isServerError={isServerError}
        isNotFoundError={isNotFoundError}
        handleSaveMovie={handleSaveMovie}
        handleRemoveMovie={handleRemoveMovie}
      />
    </main>
  )
}

export default Movies;
