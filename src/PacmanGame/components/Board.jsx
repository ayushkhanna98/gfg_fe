import React from 'react';
import './Board.css';

const Board = ({ maze, dots, pacmanPos, ghosts, direction, mouthOpen }) => {
  return (
    <div className="board">
      {/* Render maze */}
      {maze.map((row, y) => (
        <div key={y} className="row">
          {row.split('').map((cell, x) => (
            <div key={`${x}-${y}`} className={`cell ${cell === '#' ? 'wall' : ''}`} />
          ))}
        </div>
      ))}

      {/* Render dots */}
      {dots.map((dot, index) => (
        <div
          key={`dot-${index}`}
          className={`dot ${dot.type}`}
          style={{
            left: `${dot.x * 20}px`,
            top: `${dot.y * 20}px`,
          }}
        />
      ))}

      {/* Render Pacman */}
      <div
        className={`pacman ${mouthOpen ? 'mouth-open' : ''}`}
        style={{
          left: `${pacmanPos.x * 20}px`,
          top: `${pacmanPos.y * 20}px`,
          transform: `rotate(${
            direction === 'right' ? 0 :
            direction === 'down' ? 90 :
            direction === 'left' ? 180 :
            direction === 'up' ? 270 : 0
          }deg)`,
        }}
      />

      {/* Render Ghosts */}
      {ghosts.map((ghost, index) => (
        <div
          key={`ghost-${index}`}
          className="ghost"
          style={{
            left: `${ghost.x * 20}px`,
            top: `${ghost.y * 20}px`,
            backgroundColor: ghost.color,
          }}
        />
      ))}
    </div>
  );
};

export default Board; 