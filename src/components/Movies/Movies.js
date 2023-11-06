import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

function Movies({ handleMoviesSaved, handleSaveMovie, handleRemoveMovie, savedMovies, onSearch, searchResults }) {

  return (
    <main className='movies'>
      <SearchForm onSearch={onSearch} />
      <MoviesCardList
        savedMovies={savedMovies}
        searchResults={searchResults}
        handleSaveMovie={handleSaveMovie}
        handleRemoveMovie={handleRemoveMovie}
        // handleMoviesSaved={handleMoviesSaved}
      />
    </main>
  )
}

export default Movies;