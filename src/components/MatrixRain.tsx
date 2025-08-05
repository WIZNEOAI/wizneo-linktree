
import React, { useEffect, useState, useCallback, useMemo } from 'react';

const MatrixRain = React.memo(() => {
  const [characters, setCharacters] = useState<Array<{
    id: number;
    char: string;
    left: number;
    animationDelay: number;
    animationDuration: number;
  }>>([]);

  const matrixChars = useMemo(() => 
    '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン', []
  );

  const generateCharacters = useCallback(() => {
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
    }, [matrixChars]);

  useEffect(() => {

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
  }, [generateCharacters, matrixChars]);

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
});

MatrixRain.displayName = 'MatrixRain';

export default MatrixRain;
