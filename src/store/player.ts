import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useMapStore } from './map'
import { useCargoStore } from './cargo'

export const usePlayerStore = defineStore('player', () => {

  const player = reactive({
    x: 3,
    y: 3
  })

  const { isMoveToWall } = useMapStore()
  const { findCargo, moveCargo } = useCargoStore()

  function moveMotion(dx: number, dy: number) {
    const nextPosition = { x: player.x + dx, y: player.y + dy }
    const isWall = isMoveToWall(nextPosition)
    if (isWall) return

    const cargo = findCargo(nextPosition)
    if (cargo) {
      const isMoveCargo = moveCargo(cargo, dx, dy)
      if (!isMoveCargo) return
    }

    player.x += dx
    player.y += dy
  }

  function movePlayerToLeft() {
    moveMotion(-1, 0)
  }
  function movePlayerToRight() {
    moveMotion(1, 0)
  }
  function movePlayerToUp() {
    moveMotion(0, -1)
  }
  function movePlayerToDown() {
    moveMotion(0, 1)
  }

  return {
    player,
    movePlayerToLeft,
    movePlayerToRight,
    movePlayerToUp,
    movePlayerToDown
  }
})