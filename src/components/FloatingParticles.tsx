
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
          size: Math.random() * 8 + 4, // Random size between 4px and 12px
          opacity: Math.random() * 0.6 + 0.2, // Random opacity between 0.2 and 0.8
          animationDelay: Math.random() * 8, // Random delay up to 8 seconds
        });
      }

      setParticles(newParticles);
    };

    generateParticles();

    // Regenerate particles every 10 seconds for more dynamic effect
    const interval = setInterval(generateParticles, 10000);

    // Handle window resize
    const handleResize = () => generateParticles();
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-matrix-green rounded-full animate-ping"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
