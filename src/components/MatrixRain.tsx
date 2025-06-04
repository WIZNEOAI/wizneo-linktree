
import React, { useEffect, useState } from 'react';

const MatrixRain = () => {
  const [characters, setCharacters] = useState<Array<{
    id: number;
    char: string;
    left: number;
    animationDelay: number;
    animationDuration: number;
  }>>([]);

  useEffect(() => {
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const generateCharacters = () => {
      const chars = [];
      const numChars = window.innerWidth < 768 ? 30 : 50; // Fewer chars on mobile
      
      for (let i = 0; i < numChars; i++) {
        chars.push({
          id: i,
          char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
          left: Math.random() * 100,
          animationDelay: Math.random() * 8,
          animationDuration: 6 + Math.random() * 4,
        });
      }
      return chars;
    };

    setCharacters(generateCharacters());

    const interval = setInterval(() => {
      setCharacters(prev => 
        prev.map(char => ({
          ...char,
          char: matrixChars[Math.floor(Math.random() * matrixChars.length)]
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="matrix-rain">
      {characters.map((char) => (
        <div
          key={char.id}
          className="matrix-char"
          style={{
            left: `${char.left}%`,
            animationDelay: `${char.animationDelay}s`,
            animationDuration: `${char.animationDuration}s`,
          }}
        >
          {char.char}
        </div>
      ))}
    </div>
  );
};

export default MatrixRain;
