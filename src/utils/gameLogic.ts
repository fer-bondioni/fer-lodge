import { Movie, UserMovie, UserMovies } from "../types";

export const VALID_USER_NAMES = ["Ornella", "Mariel", "Florencia", "Paola"];

export const validateUserName = (name: string): boolean => {
  return VALID_USER_NAMES.includes(name);
};

export const getUserMovies = (
  userName: string,
  userMovies: UserMovies
): UserMovie[] => {
  return userMovies[userName] || [];
};

export const validateMovieSelection = (
  selectedMovies: string[],
  userMovies: UserMovie[]
): { isValid: boolean; correctCount: number; incorrectMovies: string[] } => {
  const userMovieIds = userMovies.map((movie) => movie.id);
  const correctMovies = selectedMovies.filter((movieId) =>
    userMovieIds.includes(movieId)
  );
  const incorrectMovies = selectedMovies.filter(
    (movieId) => !userMovieIds.includes(movieId)
  );

  return {
    isValid: correctMovies.length === 5 && incorrectMovies.length === 0,
    correctCount: correctMovies.length,
    incorrectMovies,
  };
};

export const getGameMessage = (tryCount: number): string => {
  switch (tryCount) {
    case 1:
    case 2:
      return "Dale Marlene Dietrich, ponele onda, que nos espera Hollywood";
    case 3:
      return "Estamos cerrando, flaca";
    default:
      return "¿estás segura?";
  }
};

export const getVictoryMessage = (): string => {
  return "Llamemos a Scorsese, loquita querida";
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getRandomMovies = (
  movies: Movie[],
  count: number,
  excludeIds: string[] = []
): Movie[] => {
  const availableMovies = movies.filter(
    (movie) => !excludeIds.includes(movie.id)
  );
  return shuffleArray(availableMovies).slice(0, count);
};
