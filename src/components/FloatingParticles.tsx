
import React, { useEffect, useState } from 'react';

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

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const numParticles = window.innerWidth < 768 ? 25 : 40; // Más partículas para efecto Matrix
      const newParticles: Particle[] = [];

      for (let i = 0; i < numParticles; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100, // Posición horizontal aleatoria
          char: Math.random() > 0.5 ? '1' : '0', // Aleatorio entre 1 y 0
          size: Math.random() * 6 + 12, // Tamaño de fuente entre 12px y 18px
          opacity: Math.random() * 0.7 + 0.2, // Opacidad visible
          animationDelay: -(Math.random() * 20), // Delay negativo para que ya esté corriendo
          animationDuration: Math.random() * 10 + 8, // Velocidad de caída variable (8-18 segundos)
          initialPosition: Math.random() * 100, // Posición inicial aleatoria en Y
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
          className="absolute text-matrix-green font-matrix animate-matrix-binary-fall"
          style={{
            left: `${particle.left}%`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
            top: `${particle.initialPosition}%`,
            textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
          }}
        >
          {particle.char}
        </div>
      ))}
    </div>
  );
};

export default FloatingParticles;
