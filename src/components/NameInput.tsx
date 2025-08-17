'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { validateUserName } from '../utils/gameLogic';

interface NameInputProps {
  onValidName: (name: string) => void;
}

export default function NameInput({ onValidName }: NameInputProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Por favor, escribí tu nombre');
      return;
    }

    setError('');

    // Immediate validation without delay
    if (validateUserName(name.trim())) {
      onValidName(name.trim());
    } else {
      setError('Ese nombre no está en la lista. ¿Tienes el coraje necesario?');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as React.FormEvent);
    }
  };

  // Don't render animations until client-side to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="relative z-10">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 border border-red-500/30 shadow-2xl">
          <div className="text-center">
            <p className="text-gray-300 mb-6 text-lg">
              Si te sobra coraje, escribí tu nombre y apretá enter
            </p>
            
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your name..."
                  className="w-full bg-black/50 border-2 border-red-500/50 rounded-lg p-4 text-white text-center text-xl placeholder-red-400/50 focus:outline-none focus:border-red-400 focus:bg-black/70 transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 border border-red-500/30 shadow-2xl">
        <div className="text-center">
          <motion.p 
            className="text-gray-300 mb-6 text-lg"
            animate={{ 
              color: error ? '#ef4444' : '#9ca3af',
              scale: error ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            Si te sobra coraje, escribí tu nombre y apretá enter
          </motion.p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <motion.input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your name..."
                className="w-full bg-black/50 border-2 border-red-500/50 rounded-lg p-4 text-white text-center text-xl placeholder-red-400/50 focus:outline-none focus:border-red-400 focus:bg-black/70 transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
                whileHover={{ scale: 1.01 }}
              />
            </div>

            {error && (
              <motion.div
                className="text-red-400 text-center text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!name.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Entrar
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
