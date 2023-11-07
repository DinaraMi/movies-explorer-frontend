const filterMovies = (movies, query, shortMovies) => {
  let lowercaseQuery;
  if (typeof query === 'string') {
    lowercaseQuery = query.toLowerCase();
  }
  const filteredMovies = movies.filter((movie) => {
    const nameRULower = movie.nameRU.toLowerCase();
    const nameENLower = movie.nameEN.toLowerCase();
    const matchesQuery = nameRULower.includes(lowercaseQuery) || nameENLower.includes(lowercaseQuery);
    const isShortMovie = shortMovies ? movie.duration <= 40 : true;
    return matchesQuery && isShortMovie;
  });

  return filteredMovies;
};

export default filterMovies;
