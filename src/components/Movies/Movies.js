import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

function Movies({ handleSaveMovie, handleRemoveMovie, savedMovies }) {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList handleSaveMovie={handleSaveMovie} handleRemoveMovie={handleRemoveMovie} savedMovies={savedMovies} />
    </main>
  )
}

export default Movies;