import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useCargoStore } from './cargo'

interface IGame {
  isGameCompleted: boolean
}

export const useGameStore = defineStore('game', () => {

  const game = reactive<IGame>({
    isGameCompleted: false
  })

  function detectionGameCompleted() {
    const { cargos } = useCargoStore()
    game.isGameCompleted = cargos.every(cargo => cargo.onTarget)
  }

  return {
    detectionGameCompleted,
    game
  }

})