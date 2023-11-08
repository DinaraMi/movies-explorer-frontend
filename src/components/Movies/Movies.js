import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import { filterMovies, filterDuration } from '../../utils/filterMovies';
import { useEffect, useState } from 'react';
import apiMovies from '../../utils/MoviesApi';

function Movies({ handleSaveMovie, handleRemoveMovie, savedMovies, isLiked, formatMovies }) {
  const [isLoading, setIsLoading] = useState(false); //загрузка прелоадер
  const [initialMovies, setInitialMovies] = useState([]); //отфильтрованные по запросу
  const [filteredMovies, setFilteredMovies] = useState([]); //отфильтрованные по запросу и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек
  const [isReqErr, setIsReqErr] = useState(false); //ошибка запроса к серверу
  const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены

  //основнай метод фильрации, который отдает массив с фильмами на рендеринг
  function handleFilterMovies(movies, query, short) {
    const moviesList = filterMovies(movies, query, short); //фильтруем полученный массив по запросу
    setInitialMovies(moviesList); //записываем в стейт
    setFilteredMovies(short ? filterDuration(moviesList) : moviesList); //если чекбокс тру, то фильруем по длине и записываем в стейт
    localStorage.setItem('movies', JSON.stringify(moviesList));
    localStorage.setItem('allMovies', JSON.stringify(movies));
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      if (filterDuration(initialMovies).length === 0) {
        setFilteredMovies(filterDuration(initialMovies));
      } else {
        setFilteredMovies(filterDuration(initialMovies));
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('shortMovies', !isShortMovies);
  }

  //submit
  function onSearchMovies(query) {
    localStorage.setItem('movieSearch', query);
    localStorage.setItem('shortMovies', isShortMovies);
    if (localStorage.getItem('allMovies')) {
      const movies = JSON.parse(localStorage.getItem('allMovies'));
      handleFilterMovies(movies, query, isShortMovies);
    } else {
      setIsLoading(true);
      apiMovies.getSearchMovies()
        .then((dataMovies) => {
          handleFilterMovies(dataMovies, query, isShortMovies);
          setIsReqErr(false);
        })
        .catch((err) => {
          setIsReqErr(true);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setInitialMovies(movies);
      if (localStorage.getItem('shortMovies') === 'true') {
        setFilteredMovies(filterDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    } else {
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('movieSearch')) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  return (
    <main className='movies'>
      <SearchForm onSearchMovies={onSearchMovies}
        onFilter={handleShortMovies}
        isShortMovies={isShortMovies}
        />
      <MoviesCardList
        savedMovies={savedMovies}
        formatMovies={formatMovies}
        dataMovies={filteredMovies}
        isLiked={isLiked}
        isSavedFilms={false}
        isLoading={isLoading}
        isReqErr={isReqErr}
        isNotFound={isNotFound}
        handleSaveMovie={handleSaveMovie}
        handleRemoveMovie={handleRemoveMovie}
      />
    </main>
  )
}

export default Movies;