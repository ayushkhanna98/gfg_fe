import { useEffect } from 'react';

export const useKeyPress = ({ gameOver, setDirection }) => {
  useEffect(() => {
    if (gameOver) return;

    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('up');
          break;
        case 'ArrowDown':
          setDirection('down');
          break;
        case 'ArrowLeft':
          setDirection('left');
          break;
        case 'ArrowRight':
          setDirection('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, setDirection]);
}; 