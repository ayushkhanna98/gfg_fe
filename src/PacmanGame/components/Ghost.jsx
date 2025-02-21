import { CELL_SIZE } from '../constants/gameConstants'

export default function Ghost({ x, y, color }) {
  return (
    <div style={{
      position: 'absolute',
      left: x * CELL_SIZE,
      top: y * CELL_SIZE,
      width: '20px',
      height: '20px',
      backgroundColor: color,
      borderRadius: '10px 10px 2px 2px'
    }} />
  )
} 