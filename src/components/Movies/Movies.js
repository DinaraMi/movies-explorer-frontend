import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

function Movies({ handleMoviesSaved, onFilter, handleSaveMovie, handleRemoveMovie, savedMovies, onSearch, searchResults }) {

  return (
    <main className='movies'>
      <SearchForm onSearch={onSearch} onFilter={onFilter}/>
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