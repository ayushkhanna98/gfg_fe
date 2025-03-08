import { useEffect } from 'react';

export const useGameLoop = ({ 
  gameOver, 
  pacmanPos, 
  direction, 
  ghosts, 
  setPacmanPos, 
  setGhosts, 
  setGameOver 
}) => {
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      // Move Pacman
      const newPos = { ...pacmanPos };
      switch (direction) {
        case 'right':
          newPos.x = Math.min(26, newPos.x + 1);
          break;
        case 'left':
          newPos.x = Math.max(1, newPos.x - 1);
          break;
        case 'up':
          newPos.y = Math.max(1, newPos.y - 1);
          break;
        case 'down':
          newPos.y = Math.min(29, newPos.y + 1);
          break;
        default:
          break;
      }
      setPacmanPos(newPos);

      // Move Ghosts
      const newGhosts = ghosts.map(ghost => {
        const directions = ['right', 'left', 'up', 'down'];
        if (Math.random() < 0.2) {
          ghost.direction = directions[Math.floor(Math.random() * directions.length)];
        }

        const newGhostPos = { ...ghost };
        switch (ghost.direction) {
          case 'right':
            newGhostPos.x = Math.min(26, newGhostPos.x + 1);
            break;
          case 'left':
            newGhostPos.x = Math.max(1, newGhostPos.x - 1);
            break;
          case 'up':
            newGhostPos.y = Math.max(1, newGhostPos.y - 1);
            break;
          case 'down':
            newGhostPos.y = Math.min(29, newGhostPos.y + 1);
            break;
          default:
            break;
        }
        return newGhostPos;
      });
      setGhosts(newGhosts);

      // Check for collisions
      const collision = newGhosts.some(
        ghost => ghost.x === newPos.x && ghost.y === newPos.y
      );
      if (collision) {
        setGameOver(true);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [gameOver, pacmanPos, direction, ghosts, setPacmanPos, setGhosts, setGameOver]);
}; 