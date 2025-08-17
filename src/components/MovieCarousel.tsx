'use client';

import { useState, useEffect } from 'react';
import { Movie } from '@/types';
import { useMoviePosters } from '@/hooks/useMoviePosters';

interface MovieCarouselProps {
  movies: Movie[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  selectedMovies: string[];
  onMovieToggle: (movieId: string) => void;
}

export default function MovieCarousel({
  movies,
  currentIndex,
  onIndexChange,
  selectedMovies,
  onMovieToggle,
}: MovieCarouselProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  
  // Use the custom hook to get movies with posters
  const { moviesWithPosters, isLoading, error, refreshPoster } = useMoviePosters(movies);

  const nextMovie = () => {
    if (isTransitioning) return;
    setDirection('right');
    setIsTransitioning(true);
    setTimeout(() => {
      onIndexChange((currentIndex + 1) % movies.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevMovie = () => {
    if (isTransitioning) return;
    setDirection('left');
    setIsTransitioning(true);
    setTimeout(() => {
      onIndexChange((currentIndex - 1 + movies.length) % movies.length);
      setIsTransitioning(false);
    }, 300);
  };

  const currentMovie = moviesWithPosters[currentIndex];
  const isMovieSelected = (movieId: string) => selectedMovies.includes(movieId);
  const canSelectMore = selectedMovies.length < 5;

  if (!currentMovie) return null;

  return (
    <div className="relative w-full max-w-4xl">
      {/* Loading State */}
      {isLoading && (
        <div className="text-center text-white py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p>Cargando posters de películas...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-400 py-20">
          <p className="mb-4">Error al cargar los posters: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Movie Display with Transition */}
      {!isLoading && !error && (
        <div
          className={`relative transition-all duration-300 ${
            isTransitioning
              ? direction === 'right'
                ? 'transform translate-x-full opacity-0'
                : 'transform -translate-x-full opacity-0'
              : 'transform translate-x-0 opacity-100'
          }`}
        >
          <div className="relative group">
            {/* Movie Poster */}
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <img
                src={currentMovie.posterUrl}
                alt={currentMovie.title}
                className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // If TMDB poster fails, try fallback
                  if (target.src !== getFallbackPoster(currentMovie.year)) {
                    target.src = getFallbackPoster(currentMovie.year);
                  }
                }}
              />
              
              {/* Loading Overlay */}
              {currentMovie.isLoading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Movie Details on Hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <h2 className="text-3xl font-bold mb-2">{currentMovie.title}</h2>
                <p className="text-xl text-gray-300 mb-3">{currentMovie.year}</p>
                <p className="text-lg mb-2">
                  <span className="font-semibold">Director:</span> {currentMovie.director}
                </p>
                <p className="text-sm mb-3">
                  <span className="font-semibold">Actores:</span> {currentMovie.actors.join(', ')}
                </p>
                <p className="text-sm leading-relaxed">{currentMovie.synopsis}</p>
                
                {/* TMDB Rating if available */}
                {currentMovie.tmdbData && (
                  <div className="flex items-center mt-3">
                    <span className="text-yellow-400 mr-2">⭐</span>
                    <span className="text-sm">
                      {currentMovie.tmdbData.vote_average.toFixed(1)}/10
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Selection Indicator */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => onMovieToggle(currentMovie.id)}
                disabled={!canSelectMore && !isMovieSelected(currentMovie.id)}
                className={`w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                  isMovieSelected(currentMovie.id)
                    ? 'bg-green-500 border-green-400 scale-110'
                    : canSelectMore
                    ? 'bg-white/20 border-white/40 hover:bg-white/30 hover:border-white/60'
                    : 'bg-gray-500/50 border-gray-400/50 cursor-not-allowed'
                }`}
                aria-label={isMovieSelected(currentMovie.id) ? 'Deseleccionar película' : 'Seleccionar película'}
              >
                {isMovieSelected(currentMovie.id) && (
                  <svg className="w-6 h-6 text-white mx-auto mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>

            {/* Quick Info Overlay */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-sm">
                <p className="font-semibold">{currentMovie.year}</p>
                <p className="text-xs text-gray-300">{currentMovie.director}</p>
                {currentMovie.tmdbData && (
                  <p className="text-xs text-yellow-400">
                    ⭐ {currentMovie.tmdbData.vote_average.toFixed(1)}
                  </p>
                )}
              </div>
            </div>

            {/* Refresh Poster Button */}
            {currentMovie.error && (
              <button
                onClick={() => refreshPoster(currentMovie.id)}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors"
                title="Reintentar cargar poster"
              >
                🔄 Reintentar
              </button>
            )}
          </div>

          {/* Movie Counter */}
          <div className="text-center mt-6 text-white">
            <p className="text-lg">
              {currentIndex + 1} de {movies.length}
            </p>
          </div>
        </div>
      )}

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setDirection(index > currentIndex ? 'right' : 'left');
                setIsTransitioning(true);
                setTimeout(() => {
                  onIndexChange(index);
                  setIsTransitioning(false);
                }, 300);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Ir a película ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevMovie}
        disabled={isTransitioning || isLoading}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 disabled:bg-black/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
        aria-label="Película anterior"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextMovie}
        disabled={isTransitioning || isLoading}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 disabled:bg-black/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
        aria-label="Siguiente película"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// Helper function for fallback posters
function getFallbackPoster(year: number): string {
  if (year < 1960) return 'https://via.placeholder.com/500x750/2a2a2a/ffffff?text=Classic+Film';
  if (year < 2000) return 'https://via.placeholder.com/500x750/1a1a1a/ffffff?text=Modern+Film';
  return 'https://via.placeholder.com/500x750/3a3a3a/ffffff?text=International+Film';
}
