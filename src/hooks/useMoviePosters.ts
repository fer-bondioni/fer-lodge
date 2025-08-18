import { useState, useEffect, useCallback, useRef } from "react";
import { Movie } from "@/types";
import { TMDBService, TMDBMovie, getFallbackPoster } from "@/utils/tmdbService";

interface MovieWithPoster extends Movie {
  posterUrl: string;
  backdropUrl?: string;
  tmdbData?: TMDBMovie;
  isLoading: boolean;
  error?: string;
}

export const useMoviePosters = (
  movies: Movie[]
): {
  moviesWithPosters: MovieWithPoster[];
  isLoading: boolean;
  error: string | null;
  refreshPoster: (movieId: string) => Promise<void>;
} => {
  const [moviesWithPosters, setMoviesWithPosters] = useState<MovieWithPoster[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);
  // No external abort controller needed; we guard with isMounted

  // Initialize movies with fallback posters
  const initializeMovies = useCallback((movies: Movie[]) => {
    return movies.map((movie) => ({
      ...movie,
      posterUrl: getFallbackPoster(movie.year),
      isLoading: false,
      error: undefined,
    }));
  }, []);

  // Note: Per-movie fetch helper was removed as it was unused.

  // Use movies directly; parent should provide stable references if needed

  useEffect(() => {
    if (!movies.length) {
      setMoviesWithPosters([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const fetchPosters = async () => {
      // Initialize with fallback posters to avoid layout shift
      setMoviesWithPosters(initializeMovies(movies));
      setIsLoading(true);
      setError(null);

      try {
        // Fetch posters for each movie
        const updatedMovies = await Promise.all(
          movies.map(async (movie) => {
            try {
              // Search for movie in TMDB
              const tmdbMovie = await TMDBService.searchMovie(
                movie.title,
                movie.year
              );

              if (tmdbMovie && tmdbMovie.poster_path) {
                const posterUrl = TMDBService.getPosterUrl(
                  tmdbMovie.poster_path,
                  "w500"
                );
                const backdropUrl = tmdbMovie.backdrop_path
                  ? TMDBService.getBackdropUrl(tmdbMovie.backdrop_path, "w1280")
                  : undefined;

                return {
                  ...movie,
                  posterUrl,
                  backdropUrl,
                  tmdbData: tmdbMovie,
                  isLoading: false,
                  error: undefined,
                };
              } else {
                // Use fallback poster if no TMDB match found
                return {
                  ...movie,
                  posterUrl: getFallbackPoster(movie.year),
                  isLoading: false,
                  error: undefined,
                };
              }
            } catch (err) {
              console.error(`Error fetching poster for ${movie.title}:`, err);
              return {
                ...movie,
                posterUrl: getFallbackPoster(movie.year),
                isLoading: false,
                error: "Failed to load poster",
              };
            }
          })
        );

        if (isMounted.current) {
          setMoviesWithPosters(updatedMovies);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching movie posters:", err);
        if (isMounted.current) {
          setError("Failed to load movie posters");
        }
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    };

    fetchPosters();

    return () => {
      isMounted.current = false;
    };
  }, [movies, initializeMovies]);

  const refreshPoster = async (movieId: string) => {
    const movie = movies.find((m) => m.id === movieId);
    if (!movie) return;

    setMoviesWithPosters((prev) =>
      prev.map((m) => (m.id === movieId ? { ...m, isLoading: true } : m))
    );

    try {
      const tmdbMovie = await TMDBService.searchMovie(movie.title, movie.year);

      if (tmdbMovie && tmdbMovie.poster_path) {
        const posterUrl = TMDBService.getPosterUrl(
          tmdbMovie.poster_path,
          "w500"
        );
        const backdropUrl = tmdbMovie.backdrop_path
          ? TMDBService.getBackdropUrl(tmdbMovie.backdrop_path, "w1280")
          : undefined;

        setMoviesWithPosters((prev) =>
          prev.map((m) =>
            m.id === movieId
              ? {
                  ...m,
                  posterUrl,
                  backdropUrl,
                  tmdbData: tmdbMovie,
                  isLoading: false,
                  error: undefined,
                }
              : m
          )
        );
      }
    } catch (err) {
      console.error(`Error refreshing poster for ${movie.title}:`, err);
      setMoviesWithPosters((prev) =>
        prev.map((m) =>
          m.id === movieId
            ? { ...m, isLoading: false, error: "Failed to refresh poster" }
            : m
        )
      );
    }
  };

  return {
    moviesWithPosters,
    isLoading,
    error,
    refreshPoster,
  };
};
