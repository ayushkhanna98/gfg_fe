import { useState, useEffect } from 'react';
import Board from './Board';
import { useGameLoop } from '../hooks/useGameLoop';
import { useKeyPress } from '../hooks/useKeyPress';
import { useInitializeGame } from '../hooks/useInitializeGame';
import { GHOST_COLORS, MAZE } from '../constants/gameConstants';
import '../styles/Game.css';

export default function Game() {
  const [pacmanPos, setPacmanPos] = useState({ x: 1, y: 1 });
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState('right');
  const [mouthOpen, setMouthOpen] = useState(true);
  const [ghosts, setGhosts] = useState([
    { x: 9, y: 9, color: GHOST_COLORS.BLINKY, direction: 'right' },
    { x: 10, y: 9, color: GHOST_COLORS.INKY, direction: 'left' },
    { x: 11, y: 9, color: GHOST_COLORS.PINKY, direction: 'up' },
    { x: 12, y: 9, color: GHOST_COLORS.CLYDE, direction: 'down' }
  ]);
  const [gameOver, setGameOver] = useState(false);

  useInitializeGame({ setDots });
  useGameLoop({ gameOver, pacmanPos, direction, ghosts, setPacmanPos, setGhosts, setGameOver });
  useKeyPress({ gameOver, direction, setDirection });

  useEffect(() => {
    const interval = setInterval(() => {
      setMouthOpen(prev => !prev);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dotIndex = dots.findIndex(dot => dot.x === pacmanPos.x && dot.y === pacmanPos.y);
    if (dotIndex !== -1) {
      const dot = dots[dotIndex];
      setDots(prev => prev.filter((_, i) => i !== dotIndex));
      setScore(prev => prev + (dot.type === 'power' ? 50 : 10));
    }
  }, [pacmanPos, dots]);

  return (
    <div className="game-container">
      <h1>PACMAN</h1>
      <div className="score">SCORE: {score}</div>
      {gameOver && <div className="game-over">GAME OVER</div>}
      
      <Board 
        maze={MAZE}
        dots={dots}
        pacmanPos={pacmanPos}
        ghosts={ghosts}
        direction={direction}
        mouthOpen={mouthOpen}
        gameOver={gameOver}
      />
      
      <div className="instructions">
        Use arrow keys to change direction
      </div>
    </div>
  );
} 