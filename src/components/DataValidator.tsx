'use client';

import { useEffect, useState } from 'react';

export default function DataValidator() {
  const [validation, setValidation] = useState<{
    users: boolean;
    movies: boolean;
    userMovies: boolean;
    totalMovies: number;
    userCount: number;
    isLoading: boolean;
  }>({
    users: false,
    movies: false,
    userMovies: false,
    totalMovies: 0,
    userCount: 0,
    isLoading: true,
  });

  useEffect(() => {
    // Import data dynamically to avoid SSR issues
    const loadData = async () => {
      try {
        const [usersData, moviesData, userMoviesData] = await Promise.all([
          import('../data/users.json'),
          import('../data/movies.json'),
          import('../data/userMovies.json'),
        ]);

        // Validate users data
        const usersValid = usersData.users && usersData.users.length === 4;
        
        // Validate movies data
        const moviesValid = moviesData.movies && moviesData.movies.length > 0;
        const totalMovies = moviesData.movies?.length || 0;
        
        // Validate user movies data
        const userMoviesValid = userMoviesData.userMovies && 
          Object.keys(userMoviesData.userMovies).length === 4;
        const userCount = Object.keys(userMoviesData.userMovies || {}).length;

        setValidation({
          users: usersValid,
          movies: moviesValid,
          userMovies: userMoviesValid,
          totalMovies,
          userCount,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error loading data:', error);
        setValidation(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadData();
  }, []);

  if (validation.isLoading) {
    return (
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
        <div className="text-blue-400 font-semibold text-center">
          Loading data validation...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mt-4">
      <h4 className="text-green-400 font-semibold mb-2">Data Validation Results:</h4>
      <div className="space-y-1 text-sm">
        <div className={`flex justify-between ${validation.users ? 'text-green-300' : 'text-red-300'}`}>
          <span>Users:</span>
          <span>{validation.users ? '✅' : '❌'} {validation.userCount}/4</span>
        </div>
        <div className={`flex justify-between ${validation.movies ? 'text-green-300' : 'text-red-300'}`}>
          <span>Movies:</span>
          <span>{validation.movies ? '✅' : '❌'} {validation.totalMovies} total</span>
        </div>
        <div className={`flex justify-between ${validation.userMovies ? 'text-green-300' : 'text-red-300'}`}>
          <span>User Movies:</span>
          <span>{validation.userMovies ? '✅' : '❌'} {validation.userCount}/4</span>
        </div>
      </div>
    </div>
  );
}
