import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import { filterMovies, filterDuration } from '../../utils/filterMovies';
import { useEffect, useState } from 'react';
import apiMovies from '../../utils/MoviesApi';
import api from '../../utils/MainApi';

function Movies({ handleSaveMovie, handleRemoveMovie, savedMovies }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [isNotFoundError, setIsNotFoundError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchSavedMovies = () => {
      api.getSavedMovies()
        .then(savedMoviesFromServer => {
          const updatedMovies = searchResults.map(filteredMovie => {
            const isSaved = savedMoviesFromServer.some(savedMovie => savedMovie.movieId === filteredMovie.id);
            return { ...filteredMovie, isSaved };
          });
          setFilteredMovies(isShortFilm ? filterDuration(updatedMovies) : updatedMovies);
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchSavedMovies();
  }, [searchResults, isShortFilm]);

  function handleFilterMovies(movies, query, short) {
    const filteredByQuery = filterMovies(movies, query, short);
    const filteredMovies = short ? filterDuration(filteredByQuery) : filteredByQuery;
    setSearchResults(filteredMovies);
    setFilteredMovies(filteredMovies);
    localStorage.setItem('searchResults', JSON.stringify(filteredMovies));
  }

  useEffect(() => {
    if (localStorage.getItem('searchResults')) {
      const savedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
      setSearchResults(savedSearchResults);
      setFilteredMovies(isShortFilm ? filterDuration(savedSearchResults) : savedSearchResults);
    }
  }, []);

  function handleShortMovies() {
    setIsShortFilm(!isShortFilm);
    localStorage.setItem('shortMovies', JSON.stringify(!isShortFilm));
    handleFilterMovies(searchResults, searchQuery, !isShortFilm);
  }

  function onSearchMovies(query) {
    setSearchQuery(query);
    localStorage.setItem('movieSearch', query);
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
            localStorage.setItem('allMovies', JSON.stringify(dataMovies));
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
    if (localStorage.getItem('allMovies')) {
      const movies = JSON.parse(localStorage.getItem('allMovies'));
      setSearchResults(movies);
      setFilteredMovies(isShortFilm ? filterDuration(movies) : movies);
    }
  }, [isShortFilm]);

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
        isSaved={isSaved}
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