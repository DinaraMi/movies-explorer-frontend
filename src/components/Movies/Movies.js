import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import { filterMovies, filterDuration } from '../../utils/filterMovies';
import { useEffect, useState } from 'react';
import apiMovies from '../../utils/MoviesApi';

function Movies({ handleSaveMovie, handleRemoveMovie, savedMovies }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [isNotFoundError, setIsNotFoundError] = useState(false);
  const [searchQueryMovies, setSearchQueryMovies] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
      const updatedMovies = searchResults.map(filteredMovie => {
        const isSaved = savedMovies.some(savedMovie => savedMovie.movieId === filteredMovie.id);
        return { ...filteredMovie, isSaved };
      });
      setFilteredMovies(isShortFilm ? filterDuration(updatedMovies) : updatedMovies);
  }, [searchResults, isShortFilm, savedMovies]);

  function handleFilterMovies(movies, query, short) {
    let filteredMovies = movies;
    if (query.trim() !== '' && short) {
      const moviesByQuery = filterMovies(filteredMovies, query, false);
      filteredMovies = filterDuration(moviesByQuery);
    } else {
      filteredMovies = filterMovies(filteredMovies, query, false);
    }
    setSearchResults(filteredMovies);
    setFilteredMovies(filteredMovies);
    localStorage.setItem('searchResults', JSON.stringify(filteredMovies));
  }

  function handleShortMovies() {
    setIsShortFilm(!isShortFilm);
    onSearchMovies(searchQueryMovies, !isShortFilm);
    localStorage.setItem('shortMovies', JSON.stringify(!isShortFilm));
  }

  function onSearchMovies(query, isShort = isShortFilm) {
    setSearchQueryMovies(query);
    localStorage.setItem('movieSearch', query);
    if (localStorage.getItem('allMovies')) {
      const movies = JSON.parse(localStorage.getItem('allMovies'));
      handleFilterMovies(movies, query, isShort);
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
    const storedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
    if (storedSearchResults) {
      setSearchResults(storedSearchResults);
      setFilteredMovies(isShortFilm ? filterDuration(storedSearchResults) : storedSearchResults);
    } else if (localStorage.getItem('allMovies')) {
      const movies = JSON.parse(localStorage.getItem('allMovies'));
      setSearchResults(movies);
      setFilteredMovies(isShortFilm ? filterDuration(movies) : movies);
    }
  }, [isShortFilm]);
  
  useEffect(() => {
    const movieSearch = localStorage.getItem('movieSearch');
    if (localStorage.getItem('shortMovies') === 'true') {
      setIsShortFilm(true);
    } else {
      setIsShortFilm(false);
    }
    if(movieSearch?.length > 0){
      setSearchQueryMovies(movieSearch);
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
        onSearch={onSearchMovies}
        onFilter={handleShortMovies}
        isShortFilm={isShortFilm}
        searchQuery={searchQueryMovies}
        setSearchQuery={setSearchQueryMovies}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        filteredMovies={filteredMovies}
        searchResults={searchResults}
        isSaved={isSaved}
        setIsSaved={setIsSaved}
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