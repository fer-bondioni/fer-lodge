'use client';

import { Movie } from '@/types';
import { useMoviePosters } from '@/hooks/useMoviePosters';

interface SelectedMoviesBarProps {
  selectedMovies: string[];
  allMovies: Movie[];
  onMovieRemove: (movieId: string) => void;
  onContinueToGame: () => void;
}

export default function SelectedMoviesBar({
  selectedMovies,
  allMovies,
  onMovieRemove,
  onContinueToGame,
}: SelectedMoviesBarProps) {
  if (selectedMovies.length === 0) return null;

  // Get the selected movie objects
  const selectedMovieObjects = allMovies.filter(movie => 
    selectedMovies.includes(movie.id)
  );

  // Use the custom hook to get posters for selected movies
  const { moviesWithPosters } = useMoviePosters(selectedMovieObjects);

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-white/20">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between">
          {/* Selected Movies Display */}
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <span className="text-white font-semibold text-lg">
                Películas seleccionadas ({selectedMovies.length}/5):
              </span>
              
              {/* Movies Grid */}
              <div className="flex space-x-3">
                {moviesWithPosters.map((movie) => (
                  <div
                    key={movie.id}
                    className="group relative bg-white/20 rounded-lg p-2 transition-all duration-300 hover:bg-white/30 hover:scale-105"
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-8 h-8 rounded object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          // Use fallback poster if TMDB poster fails
                          if (target.src !== getFallbackPoster(movie.year)) {
                            target.src = getFallbackPoster(movie.year);
                          }
                        }}
                      />
                      <div className="text-white text-sm">
                        <p className="font-medium truncate max-w-24">{movie.title}</p>
                        <p className="text-xs text-gray-300">{movie.year}</p>
                        {movie.tmdbData && (
                          <p className="text-xs text-yellow-400">
                            ⭐ {movie.tmdbData.vote_average.toFixed(1)}
                          </p>
                        )}
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => onMovieRemove(movie.id)}
                        className="text-white/70 hover:text-white transition-colors ml-1 opacity-0 group-hover:opacity-100"
                        aria-label={`Remover ${movie.title}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Continue Button */}
          {selectedMovies.length >= 3 && (
            <div className="flex items-center space-x-4">
              <div className="text-white/80 text-sm text-right">
                <p>Mínimo 3 películas para continuar</p>
                <p className="text-xs">Máximo 5 películas</p>
              </div>
              
              <button
                onClick={onContinueToGame}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Continuar al Juego
                <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          )}

          {/* Selection Status */}
          {selectedMovies.length < 3 && (
            <div className="text-white/60 text-sm text-right">
              <p>Selecciona al menos 3 películas</p>
              <p className="text-xs">Puedes seleccionar hasta 5</p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-3 w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(selectedMovies.length / 5) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// Helper function for fallback posters
function getFallbackPoster(year: number): string {
  if (year < 1960) return 'https://via.placeholder.com/500x750/2a2a2a/ffffff?text=Classic+Film';
  if (year < 2000) return 'https://via.placeholder.com/500x750/1a1a1a/ffffff?text=Modern+Film';
  return 'https://via.placeholder.com/500x750/3a3a3a/ffffff?text=International+Film';
}
