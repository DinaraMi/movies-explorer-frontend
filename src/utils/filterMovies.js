// export function searchAndFilterMovies(movies, searchQuery, isShortFilm) {
//   return movies.filter((movie) => {
//     const searchQueryLowerCase = searchQuery ? searchQuery.toLowerCase() : '';
//     const nameRU = movie.nameRU ? movie.nameRU.toLowerCase() : '';
//     const nameEN = movie.nameEN ? movie.nameEN.toLowerCase() : '';
//     if (isShortFilm) {
//       return (nameRU.includes(searchQueryLowerCase) || nameEN.includes(searchQueryLowerCase)) && movie.duration <= 40;
//     } else {
//       return nameRU.includes(searchQueryLowerCase) || nameEN.includes(searchQueryLowerCase);
//     }
//   });
// }

// export default searchAndFilterMovies;
import { short } from './contants';
export function filterMovies(movies, query) {
  const moviesByQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userQuery = query.toLowerCase().trim();
    return movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1;
  });
  return moviesByQuery;
}

//фильтр по длительности
export function filterDuration(movies) {
  return movies.filter((movie) => movie.duration <= short);
}