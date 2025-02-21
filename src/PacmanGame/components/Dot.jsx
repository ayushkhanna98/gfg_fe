import { CELL_SIZE } from '../constants/gameConstants'

export default function Dot({ x, y, type }) {
  return (
    <div style={{
      position: 'absolute',
      left: x * CELL_SIZE + (type === 'power' ? 6 : 8),
      top: y * CELL_SIZE + (type === 'power' ? 6 : 8),
      width: type === 'power' ? '8px' : '4px',
      height: type === 'power' ? '8px' : '4px',
      backgroundColor: '#FFD700',
      borderRadius: '50%'
    }} />
  )
} 