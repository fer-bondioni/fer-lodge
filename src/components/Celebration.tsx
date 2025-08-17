'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export default function Celebration() {
  useEffect(() => {
    // Lanzar confeti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const colors = ['#fbbf24', '#f59e0b', '#d97706'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Lanzar globos
    const launchBalloons = () => {
      const balloon = document.createElement('div');
      balloon.className = 'absolute w-8 h-12 animate-float';
      balloon.style.left = Math.random() * 100 + 'vw';
      balloon.style.bottom = '-50px';
      balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      balloon.style.borderRadius = '50% 50% 50% 50% / 40% 40% 60% 60%';
      document.body.appendChild(balloon);

      setTimeout(() => {
        document.body.removeChild(balloon);
      }, 5000);
    };

    const balloonInterval = setInterval(launchBalloons, 300);
    setTimeout(() => clearInterval(balloonInterval), duration);

    return () => {
      clearInterval(balloonInterval);
    };
  }, []);

  return null;
}

// Agregar estos estilos al archivo globals.css:
/*
@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(-100vh) rotate(20deg);
  }
}

.animate-float {
  animation: float 5s linear forwards;
}
*/
