export interface Movie {
  id: string;
  title: string;
  year: number;
  image: string;
  director: string;
  actors: string[];
  synopsis: string;
  isUserMovie: boolean;
}

export interface User {
  name: string;
  movies: string[];
}

export interface UserMovie {
  id: string;
  title: string;
  year: number;
  image: string;
  director: string;
  actors: string[];
  synopsis: string;
}

export interface UserMovies {
  [userName: string]: UserMovie[];
}

export interface GameState {
  currentUser: string | null;
  selectedMovies: string[];
  currentTry: number;
  isGameComplete: boolean;
  hasWon: boolean;
}

export interface ModalState {
  isOpen: boolean;
  type: "confirmation" | "encouragement" | "closing" | "victory";
  message: string;
}
