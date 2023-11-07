const filterMovies = (movies, query, shortMovies) => {
  // Преобразование запроса в нижний регистр для нерегистрозависимого сравнения
  let lowercaseQuery;
  if (typeof query === 'string') {
    lowercaseQuery = query.toLowerCase();
  }

  // Фильтрация фильмов на основе запроса
  const filteredMovies = movies.filter((movie) => {
    // Преобразование названий в нижний регистр для нерегистрозависимого сравнения
    const nameRULower = movie.nameRU.toLowerCase();
    const nameENLower = movie.nameEN.toLowerCase();

    // Проверка наличия запроса в названиях фильма (на русском или английском)
    const matchesQuery = nameRULower.includes(lowercaseQuery) || nameENLower.includes(lowercaseQuery);

    // Проверка короткометражности фильма, если чекбокс короткометражных фильмов отмечен
    const isShortMovie = shortMovies ? movie.duration <= 40 : true;

    return matchesQuery && isShortMovie;
  });

  return filteredMovies;
};

export default filterMovies;
