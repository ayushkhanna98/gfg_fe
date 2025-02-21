import { CELL_SIZE, WALL_COLOR } from '../constants/gameConstants'

export default function Wall({ x, y }) {
  return (
    <div style={{
      position: 'absolute',
      left: x * CELL_SIZE,
      top: y * CELL_SIZE,
      width: CELL_SIZE,
      height: CELL_SIZE,
      backgroundColor: WALL_COLOR
    }} />
  )
} 