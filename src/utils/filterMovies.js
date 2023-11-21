import { short } from './contants';

export function filterMovies(movies, query) {
  const userQuery = query ? query.toLowerCase().trim() : '';
  return movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    return movieRu.includes(userQuery) || movieEn.includes(userQuery);
  });
}

export function filterDuration(movies) {
  return movies.filter((movie) => movie.duration <= short);
}
