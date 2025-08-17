'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StarDustEffectProps {
  onComplete: () => void;
}

export default function StarDustEffect({ onComplete }: StarDustEffectProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Trigger completion after 3 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
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

      {/* Countdown Text */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-4xl font-bold text-white mb-4"
          animate={{
            textShadow: [
              "0 0 10px rgba(255,255,255,0.5)",
              "0 0 20px rgba(255,255,255,0.8)",
              "0 0 10px rgba(255,255,255,0.5)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ✨
        </motion.div>
        <motion.p
          className="text-xl text-gray-300"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Preparando la galería...
        </motion.p>
      </motion.div>
    </div>
  );
}
