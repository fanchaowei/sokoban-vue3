import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useMapStore } from './map'

export const usePlayerStore = defineStore('player', () => {

  const player = reactive({
    x: 1,
    y: 1
  })

  const { isMoveToWall } = useMapStore()

  function movePlayerToLeft() {
    const isWall = isMoveToWall({ x: player.x - 1, y: player.y })
    if (isWall) return

    player.x--
  }
  function movePlayerToRight() {
    const isWall = isMoveToWall({ x: player.x + 1, y: player.y })
    if (isWall) return
    player.x++
  }
  function movePlayerToUp() {
    const isWall = isMoveToWall({ x: player.x, y: player.y - 1 })
    if (isWall) return
    player.y--
  }
  function movePlayerToDown() {
    const isWall = isMoveToWall({ x: player.x, y: player.y + 1 })
    if (isWall) return
    player.y++
  }

  return {
    player,
    movePlayerToLeft,
    movePlayerToRight,
    movePlayerToUp,
    movePlayerToDown
  }
})