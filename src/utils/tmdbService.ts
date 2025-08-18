// TMDB API Service
// Get your API key from: https://www.themoviedb.org/settings/api

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  genre_ids: number[];
}

export interface TMDBMovieSearchResult {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export class TMDBService {
  private static async makeRequest<T>(
    endpoint: string,
    queryParams: string = ""
  ): Promise<T> {
    const url = `${TMDB_BASE_URL}${endpoint}${
      endpoint.includes("?") ? "&" : "?"
    }language=es-ES${queryParams}`;

    try {
      console.log("Requesting URL:", url);
      const urlWithKey = `${url}${
        url.includes("?") ? "&" : "?"
      }api_key=${TMDB_API_KEY}`;
      const response = await fetch(urlWithKey, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("TMDB API Response:", {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
        });
        throw new Error(`TMDB API error: ${response.status} - ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching from TMDB:", error);
      throw error;
    }
  }

  private static cache: { [key: string]: TMDBMovie | null } = {};

  // Search for a movie by title and year
  static async searchMovie(
    title: string,
    year?: number
  ): Promise<TMDBMovie | null> {
    const cacheKey = `${title}-${year || ""}`;

    // Check cache first
    if (this.cache[cacheKey] !== undefined) {
      return this.cache[cacheKey];
    }

    try {
      const endpoint = `/search/movie`;
      const queryParams = `&query=${encodeURIComponent(title)}${
        year ? `&year=${year}` : ""
      }`;

      const result: TMDBMovieSearchResult = await this.makeRequest(
        endpoint,
        queryParams
      );

      if (result.results.length === 0) {
        return null;
      }

      // If year is specified, try to find exact match
      if (year) {
        const exactMatch = result.results.find((movie) => {
          const movieYear = new Date(movie.release_date).getFullYear();
          return movieYear === year;
        });
        if (exactMatch) {
          return exactMatch;
        }
      }

      const movieResult = result.results[0];
      // Store in cache
      this.cache[cacheKey] = movieResult || null;
      return movieResult;
    } catch (error) {
      console.error("Error searching movie:", error);
      this.cache[cacheKey] = null;
      return null;
    }
  }

  // Get movie details by TMDB ID
  static async getMovieDetails(tmdbId: number): Promise<TMDBMovie | null> {
    try {
      const endpoint = `/movie/${tmdbId}`;
      return await this.makeRequest<TMDBMovie>(endpoint);
    } catch (error) {
      console.error("Error getting movie details:", error);
      return null;
    }
  }

  // Get poster URL with specified size
  static getPosterUrl(
    posterPath: string,
    size:
      | "w92"
      | "w154"
      | "w185"
      | "w342"
      | "w500"
      | "w780"
      | "original" = "w500"
  ): string {
    if (!posterPath) return "";
    return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
  }

  // Get backdrop URL with specified size
  static getBackdropUrl(
    backdropPath: string,
    size: "w300" | "w780" | "w1280" | "original" = "w1280"
  ): string {
    if (!backdropPath) return "";
    return `${TMDB_IMAGE_BASE_URL}/${size}${backdropPath}`;
  }

  // Search multiple movies and return results with posters
  static async searchMultipleMovies(
    movies: Array<{ title: string; year: number }>
  ): Promise<Array<{ original: { title: string; year: number }; tmdb: TMDBMovie | null }>> {
    const results = await Promise.all(
      movies.map(async (movie) => {
        const tmdbMovie = await this.searchMovie(movie.title, movie.year);
        return {
          original: movie,
          tmdb: tmdbMovie,
        };
      })
    );

    return results;
  }
}

// Fallback poster URLs for common movie types
export const FALLBACK_POSTERS = {
  // Use local assets to prevent external network/DNS failures
  classic: "/images/placeholder-movie.jpg",
  modern: "/images/placeholder-movie.jpg",
  international: "/images/placeholder-movie.jpg",
  default: "/images/placeholder-movie.jpg",
};

// Get fallback poster based on movie year
export const getFallbackPoster = (year: number): string => {
  if (year < 1960) return FALLBACK_POSTERS.classic;
  if (year < 2000) return FALLBACK_POSTERS.modern;
  return FALLBACK_POSTERS.international;
};
