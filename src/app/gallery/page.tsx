'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Movie } from '@/types';
import moviesData from '@/data/movies.json';
import MovieCarousel from '@/components/MovieCarousel';
import SelectedMoviesBar from '@/components/SelectedMoviesBar';

export default function GalleryPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Fade from black transition
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMovies(moviesData.movies);
    
    // Get user name from localStorage or URL params
    const storedName = localStorage.getItem('userName');
    const urlName = searchParams.get('user');
    
    if (storedName) {
      setUserName(storedName);
    } else if (urlName) {
      setUserName(urlName);
      localStorage.setItem('userName', urlName);
    }
  }, [searchParams]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
          break;
        case 'ArrowRight':
          event.preventDefault();
          setCurrentIndex((prev) => (prev + 1) % movies.length);
          break;
        case ' ':
          event.preventDefault();
          if (movies[currentIndex]) {
            toggleMovieSelection(movies[currentIndex].id);
          }
          break;
        case 'Enter':
          event.preventDefault();
          if (movies[currentIndex]) {
            toggleMovieSelection(movies[currentIndex].id);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, selectedMovies, movies]);

  const toggleMovieSelection = (movieId: string) => {
    setSelectedMovies((prev) => {
      if (prev.includes(movieId)) {
        return prev.filter((id) => id !== movieId);
      } else if (prev.length < 5) {
        return [...prev, movieId];
      }
      return prev;
    });
  };

  const handleContinueToGame = () => {
    localStorage.setItem('selectedMovies', JSON.stringify(selectedMovies));
    router.push('/game');
  };

  return (
    <div className={`min-h-screen bg-black transition-opacity duration-1000 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="text-white hover:text-gray-300 transition-colors text-lg"
          >
            ← Volver
          </button>
          <div className="text-white text-center">
            <h1 className="text-2xl font-bold">Galería de Películas</h1>
            {userName && (
              <p className="text-lg text-red-400 font-semibold">
                Bienvenida, {userName} 🎬
              </p>
            )}
            <p className="text-sm text-gray-300">
              Selecciona hasta 5 películas ({selectedMovies.length}/5)
            </p>
          </div>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Gallery */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <MovieCarousel
          movies={movies}
          currentIndex={currentIndex}
          onIndexChange={setCurrentIndex}
          selectedMovies={selectedMovies}
          onMovieToggle={toggleMovieSelection}
        />
      </div>

      {/* Selected Movies Bar */}
      <SelectedMoviesBar
        selectedMovies={selectedMovies}
        allMovies={movies}
        onMovieRemove={toggleMovieSelection}
        onContinueToGame={handleContinueToGame}
      />

      {/* Keyboard Navigation Info */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center">
        <p>Usa las flechas del teclado para navegar</p>
        <p>Presiona Espacio o Enter para seleccionar/deseleccionar</p>
      </div>
    </div>
  );
}
