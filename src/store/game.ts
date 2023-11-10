import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useCargoStore } from './cargo'
import { usePlayerStore } from '@/store/player.ts'
import { useMapStore } from '@/store/map.ts'
import type { ILevelGameData } from '@/types'
import { useTargetStore } from './target'

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

  function setupGame(levelGameData: ILevelGameData) {
    const { player } = usePlayerStore()
    player.x = levelGameData.player.x
    player.y = levelGameData.player.y

    const { setupMap } = useMapStore()
    setupMap(levelGameData.map)

    const { addCargo, createCargo } = useCargoStore()
    for (const cargo of levelGameData.cargos) {
      addCargo(createCargo(cargo))
    }

    const { addTarget, createTarget } = useTargetStore()
    for (const target of levelGameData.targets) {
      addTarget(createTarget(target))
    }
  }

  return {
    detectionGameCompleted,
    game,
    setupGame
  }
})