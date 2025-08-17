'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TwinPeaksBackground from '../components/TwinPeaksBackground';
import NameInput from '../components/NameInput';

export default function Home() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleValidName = (name: string) => {
    setCurrentUser(name);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    // After the fade to black, show the gallery
    setTimeout(() => {
      setShowGallery(true);
    }, 1000);
  };

  if (showGallery) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-red-400">
            Bienvenida, {currentUser} 🎬
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Selecciona tus 5 películas favoritas
          </p>
          {/* Movie Gallery will go here */}
          <div className="text-center text-gray-600">
            🎭 Movie Gallery Component Coming Soon...
          </div>
        </div>
      </div>
    );
  }

  // Don't render animations until client-side to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen relative">
        {/* Static Twin Peaks Background - Clean version without diagonal curtains */}
        <div className="fixed inset-0 overflow-hidden bg-black">
          {/* Minimal static render - just black background to prevent flash */}
        </div>
        
        {/* Static Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-yellow-400 drop-shadow-2xl">
              Welcome to the Fer Lodge
            </h1>
            
            <h2 className="text-2xl md:text-3xl mb-16 text-gray-300 drop-shadow-lg">
              A Realm of Scripts and Crazy Shit
            </h2>
            
            <div className="relative z-10">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 border border-red-500/30 shadow-2xl">
                <div className="text-center">
                  <p className="text-gray-300 mb-6 text-lg">
                    Si te sobra coraje, escribí tu nombre y apretá enter
                  </p>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your name..."
                        className="w-full bg-black/50 border-2 border-red-500/50 rounded-lg p-4 text-white text-center text-xl placeholder-red-400/50 focus:outline-none focus:border-red-400 focus:bg-black/70 transition-all duration-300"
                      />
                    </div>

                    <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300">
                      Entrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Twin Peaks Background */}
      <TwinPeaksBackground 
        isTransitioning={isTransitioning}
        onTransitionComplete={handleTransitionComplete}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatePresence>
            {!isTransitioning && (
              <>
                <motion.h1
                  className="text-5xl md:text-6xl font-bold mb-6 text-yellow-400 drop-shadow-2xl"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  Welcome to the Fer Lodge
                </motion.h1>
                
                <motion.h2
                  className="text-2xl md:text-3xl mb-16 text-gray-300 drop-shadow-lg"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                >
                  A Realm of Scripts and Crazy Shit
                </motion.h2>
                
                <NameInput onValidName={handleValidName} />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
