import { useEffect } from 'react'
import { MAZE } from '../constants/gameConstants'

export function useInitializeGame({ setDots }) {
  useEffect(() => {
    const initialDots = []
    for (let y = 0; y < MAZE.length; y++) {
      for (let x = 0; x < MAZE[0].length; x++) {
        if (MAZE[y][x] === 2) {
          initialDots.push({ x, y, type: 'dot' })
        } else if (MAZE[y][x] === 3) {
          initialDots.push({ x, y, type: 'power' })
        }
      }
    }
    setDots(initialDots)
  }, [setDots])
} 