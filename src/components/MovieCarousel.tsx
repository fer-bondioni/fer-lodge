'use client';

import { useState, useRef, useMemo } from 'react';
import { Movie } from '@/types';
import { useMoviePosters } from '@/hooks/useMoviePosters';
import { getFallbackPoster } from '@/utils/tmdbService';

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
  
  // Use memoized movies array to prevent unnecessary re-renders
  const moviesArrayRef = useRef(movies);
  const { moviesWithPosters = [], isLoading, error, refreshPoster } = useMoviePosters(
    useMemo(() => movies, [JSON.stringify(movies)])
  );

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
    <div className="fixed inset-0 overflow-hidden">
      {/* Full screen red curtain background */}
      <div className="fixed inset-0 bg-[#1a0f0f] z-0">
        <div className="absolute inset-0 bg-[url('/images/red-curtain.jpg')] bg-cover bg-center opacity-40" />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center text-white py-20 relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4" />
          <p>Cargando posters de películas...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-400 py-20 relative z-10">
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
          className={`relative z-10 transition-all duration-300 ${
            isTransitioning
              ? direction === 'right'
                ? 'transform translate-x-full opacity-0'
                : 'transform -translate-x-full opacity-0'
              : 'transform translate-x-0 opacity-100'
          }`}
        >
          <div className="relative group flex justify-center items-center min-h-screen pt-20">
            {/* Movie Poster and Info Container */}
            <div className="relative flex gap-8">
              {/* Poster Container */}
              <div className="relative w-[300px] h-[450px]">
                {/* LED lights border */}
                <div className="absolute -inset-4 z-10">
                  {/* Top lights */}
                  <div className="absolute top-0 left-4 right-4 flex justify-between">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div 
                        key={`top-${i}`} 
                        className="w-3 h-3 rounded-full animate-twinkle" 
                        style={{
                          animationDelay: `${i * 0.15}s`,
                          backgroundColor: '#fbbf24',
                          boxShadow: '0 0 10px rgba(234, 179, 8, 0.8), 0 0 20px rgba(234, 179, 8, 0.6)'
                        }} 
                      />
                    ))}
                  </div>

                  {/* Bottom lights */}
                  <div className="absolute bottom-0 left-4 right-4 flex justify-between">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div 
                        key={`bottom-${i}`} 
                        className="w-3 h-3 rounded-full animate-twinkle" 
                        style={{
                          animationDelay: `${i * 0.15}s`,
                          backgroundColor: '#fbbf24',
                          boxShadow: '0 0 10px rgba(234, 179, 8, 0.8), 0 0 20px rgba(234, 179, 8, 0.6)'
                      }} />
                    ))}
                  </div>

                  {/* Left lights */}
                  <div className="absolute left-0 top-4 bottom-4 flex flex-col justify-between">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div 
                        key={`left-${i}`} 
                        className="w-3 h-3 rounded-full animate-twinkle group-hover:scale-105 transition-transform duration-700" 
                        style={{
                          animationDelay: `${i * 0.15}s`,
                          backgroundColor: '#fbbf24',
                          boxShadow: '0 0 10px rgba(234, 179, 8, 0.8), 0 0 20px rgba(234, 179, 8, 0.6)'
                      }} />
                    ))}
                  </div>

                  {/* Right lights */}
                  <div className="absolute right-0 top-4 bottom-4 flex flex-col justify-between">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div 
                        key={`right-${i}`} 
                        className="w-3 h-3 rounded-full animate-twinkle group-hover:scale-105 transition-transform duration-700" 
                        style={{
                          animationDelay: `${i * 0.15}s`,
                          backgroundColor: '#fbbf24',
                          boxShadow: '0 0 10px rgba(234, 179, 8, 0.8), 0 0 20px rgba(234, 179, 8, 0.6)'
                      }} />
                    ))}
                  </div>
                </div>

                {/* Movie Poster */}
                <img
                  src={currentMovie.posterUrl}
                  alt={currentMovie.title}
                  className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-lg shadow-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const fallbackUrl = getFallbackPoster(currentMovie.year);
                    if (target.src !== fallbackUrl) {
                      target.src = fallbackUrl;
                    }
                  }}
                />

                {/* Loading Overlay */}
                {currentMovie.isLoading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
                  </div>
                )}
              </div>

              {/* Movie Info Panel - Always visible */}
              <div className="w-[400px] h-[450px] bg-black/80 backdrop-blur-sm p-6 rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                <h2 className="text-3xl font-bold mb-4 text-white">{currentMovie.title}</h2>
                <div className="space-y-4 text-white">
                  <p className="text-xl text-yellow-400">{currentMovie.year}</p>
                  <p className="text-lg">
                    <span className="font-semibold">Director:</span><br/>
                    {currentMovie.director}
                  </p>
                  <p>
                    <span className="font-semibold">Actores:</span><br/>
                    {currentMovie.actors.join(', ')}
                  </p>
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold">Sinopsis:</span><br/>
                    {currentMovie.tmdbData?.overview || currentMovie.synopsis}
                  </p>
                </div>
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

          {/* Navigation Counter */}
          <div className="text-center mt-6">
            <p className="text-lg text-white">
              {currentIndex + 1} de {movies.length}
            </p>
          </div>
        </div>
      )}

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
