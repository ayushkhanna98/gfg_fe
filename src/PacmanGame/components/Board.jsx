import Wall from './Wall'
import Dot from './Dot'
import Pacman from './Pacman'
import Ghost from './Ghost'
import { GRID_SIZE, CELL_SIZE } from '../constants/gameConstants'

export default function Board({ maze, dots, pacmanPos, ghosts, direction, mouthOpen, gameOver }) {
  return (
    <div style={{
      width: GRID_SIZE * CELL_SIZE,
      height: GRID_SIZE * CELL_SIZE,
      backgroundColor: '#000',
      position: 'relative',
      margin: '0 auto'
    }}>
      {/* Render Walls */}
      {maze.map((row, y) => 
        row.map((cell, x) => 
          cell === 1 && <Wall key={`${x}-${y}`} x={x} y={y} />
        )
      )}

      {/* Render Dots */}
      {dots.map((dot, i) => (
        <Dot key={i} {...dot} />
      ))}
      
      {/* Render Pacman */}
      <Pacman position={pacmanPos} direction={direction} mouthOpen={mouthOpen} />

      {/* Render Ghosts */}
      {ghosts.map((ghost, i) => (
        <Ghost key={i} {...ghost} />
      ))}
    </div>
  )
} 