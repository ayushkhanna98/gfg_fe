import { useEffect } from 'react';

export const useInitializeGame = ({ setDots }) => {
  useEffect(() => {
    const dots = [];
    for (let x = 1; x < 27; x++) {
      for (let y = 1; y < 30; y++) {
        if (x % 2 === 0 && y % 2 === 0) {
          dots.push({ x, y, type: 'normal' });
        }
      }
    }
    setDots(dots);
  }, [setDots]);
}; 