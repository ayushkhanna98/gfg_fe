import { useCallback, useEffect } from 'react'
import { MAZE } from '../constants/gameConstants'

export function useKeyPress({ gameOver, pacmanPos, direction, setDirection }) {
  const handleKeyPress = useCallback((e) => {
    if (gameOver) return

    let newDirection = direction

    switch(e.key) {
      case 'ArrowUp': newDirection = 'up'; break
      case 'ArrowDown': newDirection = 'down'; break
      case 'ArrowLeft': newDirection = 'left'; break
      case 'ArrowRight': newDirection = 'right'; break
      default: return
    }

    const nextPos = { ...pacmanPos }
    switch(newDirection) {
      case 'up': nextPos.y--; break
      case 'down': nextPos.y++; break
      case 'left': nextPos.x--; break
      case 'right': nextPos.x++; break
    }

    if (nextPos.y >= 0 && nextPos.y < MAZE.length &&
        nextPos.x >= 0 && nextPos.x < MAZE[0].length &&
        MAZE[nextPos.y][nextPos.x] !== 1) {
      setDirection(newDirection)
    }
  }, [pacmanPos, direction, gameOver, setDirection])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])
} 