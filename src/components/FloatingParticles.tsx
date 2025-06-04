
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  size: number;
  opacity: number;
  animationDelay: number;
  animationDuration: number;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const numParticles = window.innerWidth < 768 ? 20 : 35; // More particles for cascading effect
      const newParticles: Particle[] = [];

      for (let i = 0; i < numParticles; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100, // Random horizontal position
          size: Math.random() * 4 + 2, // Smaller dots for Matrix effect (2px to 6px)
          opacity: Math.random() * 0.6 + 0.3, // More visible for cascading effect
          animationDelay: Math.random() * 15, // Staggered start times
          animationDuration: Math.random() * 8 + 6, // Variable falling speed (6-14 seconds)
        });
      }

      setParticles(newParticles);
    };

    generateParticles();

    // Handle window resize
    const handleResize = () => generateParticles();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-matrix-green rounded-full animate-matrix-fall"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
