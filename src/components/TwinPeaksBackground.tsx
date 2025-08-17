'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TwinPeaksBackgroundProps {
  isTransitioning: boolean;
  onTransitionComplete: () => void;
}

export default function TwinPeaksBackground({ 
  isTransitioning, 
  onTransitionComplete 
}: TwinPeaksBackgroundProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [curtainsOpen, setIsCurtainsOpen] = useState(false);
  const [showStarDustOnly, setShowStarDustOnly] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // When transitioning starts, open curtains first, then show star dust only
  useEffect(() => {
    if (isTransitioning) {
      // Open curtains first
      setTimeout(() => {
        setIsCurtainsOpen(true);
        // After curtains are fully open, start showing star dust while curtains fade out
        setTimeout(() => {
          setShowStarDustOnly(true);
          // After 3 seconds of star dust viewing, trigger completion for fade to black
          setTimeout(() => {
            onTransitionComplete();
          }, 3000); // 3 seconds of star dust viewing as requested
        }, 2000); // Wait for curtains to fully open
      }, 500); // Small delay to start curtain movement
    }
  }, [isTransitioning, onTransitionComplete]);

  // Don't render animations until client-side to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="fixed inset-0 overflow-hidden bg-black">
        {/* Minimal initial render - just black background to prevent flash */}
      </div>
    );
  }

  // If we're showing only star dust, render just that
  if (showStarDustOnly) {
    return (
      <div className="fixed inset-0 bg-black overflow-hidden">
        {/* Star Dust Effect - Full screen */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Star Dust Particles */}
          {Array.from({ length: 150 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
                y: 0,
              }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1, 1.5, 0],
                y: [0, -100 - Math.random() * 200],
                x: [0, (Math.random() - 0.5) * 50],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                ease: "easeOut",
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3,
              }}
            />
          ))}

          {/* Larger Sparkles */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
                y: 0,
              }}
              animate={{
                opacity: [0, 1, 0.9, 0],
                scale: [0, 1, 2, 0],
                y: [0, -150 - Math.random() * 300],
                x: [0, (Math.random() - 0.5) * 80],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                ease: "easeOut",
                delay: Math.random() * 3,
                repeat: Infinity,
                repeatDelay: Math.random() * 4,
              }}
            />
          ))}

          {/* Twinkling Stars */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-blue-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, 1, 0, 1, 0],
                scale: [0, 1, 0.5, 1.5, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                ease: "easeInOut",
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            />
          ))}

          {/* Shooting Stars */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`shooting-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                x: [0, 200 + Math.random() * 300],
                y: [0, -200 - Math.random() * 300],
              }}
              transition={{
                duration: 2 + Math.random() * 1,
                ease: "easeIn",
                delay: Math.random() * 3,
                repeat: Infinity,
                repeatDelay: 5 + Math.random() * 5,
              }}
            />
          ))}

          {/* Ambient Glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-blue-900/5 via-transparent to-transparent"
            animate={{
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Fade to Black Overlay */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 3, // 3 second fade to black as requested
            delay: 0, // Start fading immediately when star dust only view appears
            ease: "easeInOut"
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Smooth Black Background Transition - Prevents whiteness flash */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{
          opacity: curtainsOpen ? 1 : 0,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut"
        }}
      />

      {/* Animated Chevron Floor - Only show when curtains are closed AND not transitioning */}
      {!curtainsOpen && !isTransitioning && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-60" />
          


          {/* Animated Spotlight Effects */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96">
            {/* Main Spotlight */}
            <motion.div
              className="w-full h-full bg-gradient-radial from-amber-200/30 via-amber-100/15 to-transparent"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Secondary Spotlight */}
            <motion.div
              className="absolute inset-0 w-full h-full bg-gradient-radial from-yellow-300/20 via-amber-200/10 to-transparent"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* Atmospheric Light Rays */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-t from-amber-200/20 to-transparent"
                  style={{
                    transformOrigin: 'center bottom',
                    transform: `rotate(${i * 45}deg)`,
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scaleY: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Atmospheric Ambient Lighting */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-red-900/10 via-transparent to-transparent"
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating Light Particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-200/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      )}

      {/* Animated Red Curtains with Wave Effects */}
      <div className="absolute inset-0">
        {/* Left Curtain */}
        <motion.div
          className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-red-900 via-red-800 to-red-900"
          animate={{
            x: isTransitioning ? -200 : 0,
            opacity: showStarDustOnly ? 0 : 1,
          }}
          transition={{
            duration: showStarDustOnly ? 3 : 2, // Slower fade out when showing star dust
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-800/50 to-transparent" />
          {/* Animated Curtain Folds with Wave Effect - Only show when curtains are fully visible */}
          {!isTransitioning && Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 w-8 h-full bg-gradient-to-r from-red-950 to-red-800"
              style={{
                left: `${i * 12}px`,
                transform: `skewX(${i % 2 === 0 ? 15 : -15}deg)`,
              }}
              animate={{
                x: [0, 2, 0, -2, 0],
                opacity: [0.8, 1, 0.8, 1, 0.8],
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Right Curtain */}
        <motion.div
          className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-red-900 via-red-800 to-red-900"
          animate={{
            x: isTransitioning ? 200 : 0,
            opacity: showStarDustOnly ? 0 : 1,
          }}
          transition={{
            duration: showStarDustOnly ? 3 : 2, // Slower fade out when showing star dust
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-red-800/50 to-transparent" />
          {/* Animated Curtain Folds with Wave Effect - Only show when curtains are fully visible */}
          {!isTransitioning && Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 w-8 h-full bg-gradient-to-l from-red-950 to-red-800"
              style={{
                right: `${i * 12}px`,
                transform: `skewX(${i % 2 === 0 ? -15 : 15}deg)`,
              }}
              animate={{
                x: [0, -2, 0, 2, 0],
                opacity: [0.8, 1, 0.8, 1, 0.8],
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Center Curtain */}
        <motion.div
          className="absolute left-1/3 top-0 w-1/3 h-full bg-gradient-to-b from-red-900 via-red-800 to-red-900"
          animate={{
            y: isTransitioning ? -200 : 0,
            opacity: showStarDustOnly ? 0 : 1,
          }}
          transition={{
            duration: showStarDustOnly ? 3 : 2, // Slower fade out when showing star dust
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-red-800/50 to-transparent" />
          {/* Animated Curtain Folds with Wave Effect - Only show when curtains are fully visible */}
          {!isTransitioning && Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 w-full h-8 bg-gradient-to-b from-red-950 to-red-800"
              style={{
                top: `${i * 16}px`,
                transform: `skewY(${i % 2 === 0 ? 10 : -10}deg)`,
              }}
              animate={{
                y: [0, 1, 0, -1, 0],
                opacity: [0.8, 1, 0.8, 1, 0.8],
              }}
              transition={{
                duration: 4 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </motion.div>

        {/* Curtain Edge Highlights */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: showStarDustOnly ? 0 : [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: showStarDustOnly ? 0 : Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Left edge highlight */}
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-red-300/50 via-red-400/30 to-transparent" />
          {/* Right edge highlight */}
          <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-red-300/50 via-red-400/30 to-transparent" />
          {/* Top edge highlight */}
          <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-red-300/50 via-red-400/30 to-transparent" />
        </motion.div>
      </div>

      {/* Star Dust Effect - Appears when curtains are open but before Twin Peaks removal */}
      {curtainsOpen && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Star Dust Particles */}
          {Array.from({ length: 150 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
                y: 0,
              }}
              animate={{
                opacity: showStarDustOnly ? [0, 1, 0.8, 0] : [0, 0.3, 0.2, 0],
                scale: showStarDustOnly ? [0, 1, 1.5, 0] : [0, 0.5, 0.3, 0],
                y: [0, -100 + Math.random() * 200],
                x: [0, (Math.random() - 0.5) * 50],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                ease: "easeOut",
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3,
              }}
            />
          ))}

          {/* Larger Sparkles */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
                y: 0,
              }}
              animate={{
                opacity: showStarDustOnly ? [0, 1, 0.9, 0] : [0, 0.4, 0.3, 0],
                scale: showStarDustOnly ? [0, 1, 2, 0] : [0, 0.6, 0.4, 0],
                y: [0, -150 + Math.random() * 300],
                x: [0, (Math.random() - 0.5) * 80],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                ease: "easeOut",
                delay: Math.random() * 3,
                repeat: Infinity,
                repeatDelay: Math.random() * 4,
              }}
            />
          ))}

          {/* Twinkling Stars */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-blue-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: showStarDustOnly ? [0, 1, 0, 1, 0] : [0, 0.3, 0, 0.3, 0],
                scale: showStarDustOnly ? [0, 1, 0.5, 1.5, 0] : [0, 0.4, 0.2, 0.6, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                ease: "easeInOut",
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            />
          ))}

          {/* Shooting Stars */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`shooting-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                opacity: showStarDustOnly ? [0, 1, 1, 0] : [0, 0.4, 0.4, 0],
                scale: showStarDustOnly ? [0, 1, 1, 0] : [0, 0.5, 0.5, 0],
                x: [0, 200 + Math.random() * 300],
                y: [0, -200 + Math.random() * 300],
              }}
              transition={{
                duration: 2 + Math.random() * 1,
                ease: "easeIn",
                delay: Math.random() * 3,
                repeat: Infinity,
                repeatDelay: 5 + Math.random() * 5,
              }}
            />
          ))}

          {/* Ambient Glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-blue-900/5 via-transparent to-transparent"
            animate={{
              opacity: showStarDustOnly ? [0.05, 0.1, 0.05] : [0.02, 0.05, 0.02],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      )}
    </div>
  );
}
