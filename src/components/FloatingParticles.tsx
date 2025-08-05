
import React, { useEffect, useState, useCallback } from 'react';

interface Particle {
  id: number;
  left: number;
  char: string;
  size: number;
  opacity: number;
  animationDelay: number;
  animationDuration: number;
  initialPosition: number;
}

const FloatingParticles = React.memo(() => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const generateParticles = useCallback(() => {
      // Menos partículas en móvil para mejor rendimiento
      const isMobile = window.innerWidth < 768;
      const numParticles = isMobile ? 15 : window.innerWidth < 1024 ? 25 : 35;
      const newParticles: Particle[] = [];

      for (let i = 0; i < numParticles; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          char: Math.random() > 0.5 ? '1' : '0',
          size: isMobile ? Math.random() * 4 + 10 : Math.random() * 6 + 12,
          opacity: Math.random() * 0.6 + 0.2,
          animationDelay: -(Math.random() * 20),
          animationDuration: Math.random() * 8 + 10, // Más lento en móvil
          initialPosition: Math.random() * 100,
        });
      }

      setParticles(newParticles);
    }, []);

  useEffect(() => {

    generateParticles();

    const handleResize = () => generateParticles();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [generateParticles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-matrix-green font-matrix animate-matrix-binary-fall
                     will-change-transform"
          style={{
            left: `${particle.left}%`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
            top: `${particle.initialPosition}%`,
            textShadow: '0 0 8px rgba(0, 255, 65, 0.4)',
          }}
        >
          {particle.char}
        </div>
      ))}
    </div>
  );
});

FloatingParticles.displayName = 'FloatingParticles';

export default FloatingParticles;
