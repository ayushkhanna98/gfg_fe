import { useEffect } from 'react'
import { MAZE, GAME_SPEED } from '../constants/gameConstants'

export function useGameLoop({ 
  gameOver,
  pacmanPos,
  direction,
  ghosts,
  setPacmanPos,
  setGhosts,
  setGameOver 
}) {
  useEffect(() => {
    if (gameOver) return

    const moveCharacters = () => {
      // Move Pacman
      setPacmanPos(prevPos => {
        const newPos = { ...prevPos }
        
        switch(direction) {
          case 'up': newPos.y = Math.max(0, prevPos.y - 1); break
          case 'down': newPos.y = Math.min(MAZE.length - 1, prevPos.y + 1); break
          case 'left': newPos.x = Math.max(0, prevPos.x - 1); break
          case 'right': newPos.x = Math.min(MAZE[0].length - 1, prevPos.x + 1); break
        }

        return MAZE[newPos.y][newPos.x] !== 1 ? newPos : prevPos
      })

      // Move Ghosts
      setGhosts(prevGhosts => {
        const newGhosts = prevGhosts.map(ghost => {
          let newX = ghost.x
          let newY = ghost.y
          let possibleDirections = []

          // Check all possible directions
          if (newY > 0 && MAZE[newY - 1][newX] !== 1) possibleDirections.push('up')
          if (newY < MAZE.length - 1 && MAZE[newY + 1][newX] !== 1) possibleDirections.push('down')
          if (newX > 0 && MAZE[newY][newX - 1] !== 1) possibleDirections.push('left')
          if (newX < MAZE[0].length - 1 && MAZE[newY][newX + 1] !== 1) possibleDirections.push('right')

          // If at intersection or hitting wall, choose new random direction
          if (possibleDirections.length > 2 || !possibleDirections.includes(ghost.direction)) {
            ghost.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)]
          }

          // Move in current direction if possible
          switch(ghost.direction) {
            case 'up': 
              if (possibleDirections.includes('up')) newY--
              break
            case 'down':
              if (possibleDirections.includes('down')) newY++
              break
            case 'left':
              if (possibleDirections.includes('left')) newX--
              break
            case 'right':
              if (possibleDirections.includes('right')) newX++
              break
          }

          return { ...ghost, x: newX, y: newY }
        })

        // Check for collisions with Pacman
        const collision = newGhosts.some(ghost => 
          ghost.x === pacmanPos.x && ghost.y === pacmanPos.y
        )
        
        if (collision) {
          setGameOver(true)
        }
        
        return newGhosts
      })
    }

    const interval = setInterval(moveCharacters, GAME_SPEED)
    return () => clearInterval(interval)
  }, [pacmanPos, direction, gameOver, setGameOver, setPacmanPos, setGhosts, ghosts])
} 