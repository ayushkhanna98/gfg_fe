import { CELL_SIZE } from '../constants/gameConstants'

export default function Pacman({ position, direction, mouthOpen }) {
  return (
    <div style={{
      position: 'absolute',
      left: position.x * CELL_SIZE,
      top: position.y * CELL_SIZE,
      width: '20px',
      height: '20px',
      backgroundColor: '#FFD700',
      borderRadius: '50%',
      clipPath: mouthOpen ? 
        direction === 'right' ? 'polygon(0 0, 100% 50%, 0 100%)' :
        direction === 'left' ? 'polygon(100% 0, 0 50%, 100% 100%)' :
        direction === 'up' ? 'polygon(0 100%, 50% 0, 100% 100%)' :
        'polygon(0 0, 50% 100%, 100% 0)' : 'circle(50%)',
      transform: `rotate(${
        direction === 'right' ? '0deg' :
        direction === 'down' ? '90deg' :
        direction === 'left' ? '180deg' : '270deg'
      })`
    }} />
  )
} 