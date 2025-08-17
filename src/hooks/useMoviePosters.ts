import { useState, useEffect } from "react";
import { Movie } from "@/types";
import { TMDBService, TMDBMovie, getFallbackPoster } from "@/utils/tmdbService";

interface MovieWithPoster extends Movie {
  posterUrl: string;
  backdropUrl?: string;
  tmdbData?: TMDBMovie;
  isLoading: boolean;
  error?: string;
}

export const useMoviePosters = (movies: Movie[]) => {
  const [moviesWithPosters, setMoviesWithPosters] = useState<MovieWithPoster[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosters = async () => {
      if (!movies.length) return;

      setIsLoading(true);
      setError(null);

      try {
        // Initialize movies with fallback posters
        const initialMovies: MovieWithPoster[] = movies.map((movie) => ({
          ...movie,
          posterUrl: getFallbackPoster(movie.year),
          isLoading: true,
        }));

        setMoviesWithPosters(initialMovies);

        // Fetch posters for each movie
        const updatedMovies = await Promise.all(
          movies.map(async (movie, index) => {
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
                };
              } else {
                // Use fallback poster if no TMDB match found
                return {
                  ...movie,
                  posterUrl: getFallbackPoster(movie.year),
                  isLoading: false,
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

        setMoviesWithPosters(updatedMovies);
      } catch (err) {
        console.error("Error fetching movie posters:", err);
        setError("Failed to load movie posters");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosters();
  }, [movies]);

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
