
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  top: number;
  left: number;
  size: number;
  opacity: number;
  animationDelay: number;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const numParticles = window.innerWidth < 768 ? 15 : 25; // Fewer on mobile
      const newParticles: Particle[] = [];

      for (let i = 0; i < numParticles; i++) {
        newParticles.push({
          id: i,
          top: Math.random() * 100, // Random position from 0% to 100%
          left: Math.random() * 100, // Random position from 0% to 100%
          size: Math.random() * 6 + 3, // Random size between 3px and 9px (smaller)
          opacity: Math.random() * 0.4 + 0.1, // Random opacity between 0.1 and 0.5 (more subtle)
          animationDelay: Math.random() * 12, // Random delay up to 12 seconds (slower)
        });
      }

      setParticles(newParticles);
    };

    generateParticles();

    // Regenerate particles every 15 seconds for more gentle dynamic effect
    const interval = setInterval(generateParticles, 15000);

    // Handle window resize
    const handleResize = () => generateParticles();
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-matrix-green rounded-full animate-pulse"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: '4s', // Slower pulse animation
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
