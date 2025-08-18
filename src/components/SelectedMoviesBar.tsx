'use client';

import { Movie } from '@/types';

interface SelectedMoviesBarProps {
  selectedMovies: string[];
  allMovies: Movie[];
  onMovieRemove: (movieId: string) => void;
  onContinueToGame: () => void;
  correctMovies?: string[];
  gameWon?: boolean;
  onTurnOffLights?: () => void;
}

export default function SelectedMoviesBar({
  selectedMovies,
  allMovies,
  onMovieRemove,
  onContinueToGame,
  correctMovies = [],
  gameWon = false,
  onTurnOffLights,
}: SelectedMoviesBarProps) {
  if (selectedMovies.length === 0) return null;

  // Render bar only when there are selected movies

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-md rounded-xl border border-yellow-500/30 shadow-2xl" style={{ zIndex: 50 }}>
      <div className="px-8 py-3">
        <div className="flex items-center justify-between gap-8">
          {/* Selected Movies Display */}
          <div className="flex-shrink">
            <div className="flex items-center gap-4">
              
              {/* Movies Grid */}
              <div className="flex gap-2 items-center" style={{ maxWidth: 'calc(100vw - 400px)' }}>
                {selectedMovies.map((movieId) => {
                  const movie = allMovies.find((m: Movie) => m.id === movieId);
                  if (!movie) return null;
                  return (
                  <div
                    key={movieId}
                    className={`group relative px-4 py-2 transition-all duration-300 w-[160px] shrink-0
                      ${correctMovies?.includes(movieId) 
                        ? 'bg-black border-2 border-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.5)]' 
                        : 'bg-black/60 border border-white/20 hover:border-white/40'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-white flex-1 mr-2 overflow-hidden">
                        <p className="font-medium text-sm truncate" title={movie.title}>{movie.title}</p>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => onMovieRemove(movieId)}
                        className="text-white/70 hover:text-white transition-colors ml-1 opacity-0 group-hover:opacity-100 shrink-0"
                        aria-label={`Remover ${movie.title}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Continue Button or Turn Off Lights Button */}
          {selectedMovies.length === 5 && (
            <div className="flex items-center ml-8 border-l border-yellow-500/30 pl-8">
              {gameWon ? (
                <button
                  onClick={onTurnOffLights}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-8 py-2.5 rounded-lg transition-all duration-300 font-bold text-lg shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transform hover:scale-105"
                >
                  Apagar las luces
                  <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={onContinueToGame}
                  className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black px-8 py-2.5 rounded-lg transition-all duration-300 font-bold text-lg shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] transform hover:scale-105"
                >
                  Consulta
                  <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Selection Status */}
          {selectedMovies.length < 5 && (
            <div className="text-white/60 text-sm text-right">
              <p>Selecciona 5 películas</p>
              <p className="text-xs">Has seleccionado {selectedMovies.length} de 5</p>
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


