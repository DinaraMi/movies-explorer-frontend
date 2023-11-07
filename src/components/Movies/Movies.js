import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

function Movies({ handleSaveMovie, handleRemoveMovie, savedMovies, onSearch, searchResults, isLiked }) {

  return (
    <main className='movies'>
      <SearchForm onSearch={onSearch} />
      <MoviesCardList
        savedMovies={savedMovies}
        searchResults={searchResults}
        handleSaveMovie={handleSaveMovie}
        handleRemoveMovie={handleRemoveMovie}
        isLiked={isLiked}
      />
    </main>
  )
}

export default Movies;