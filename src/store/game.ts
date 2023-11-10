import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useCargoStore } from './cargo'
import { usePlayerStore } from '@/store/player.ts'
import { useMapStore } from '@/store/map.ts'
import type { IGameData, ILevelGameData } from '@/types'
import { useTargetStore } from './target'

interface IGame {
  isGameCompleted: boolean
  level: number
}

export const useGameStore = defineStore('game', () => {

  const game = reactive<IGame>({
    isGameCompleted: false,
    level: 1
  })

  let _gameData: IGameData

  function detectionGameCompleted() {
    const { cargos } = useCargoStore()
    game.isGameCompleted = cargos.every(cargo => cargo.onTarget)
  }

  function setupGame(gameData: IGameData) {
    _gameData = gameData

    const levelGameData: ILevelGameData = gameData[game.level - 1]
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

  function toNextLevel() {
    game.level++
    resetGame()
    setupGame(_gameData)
  }

  function resetGame() {
    const { cleanAllCargos } = useCargoStore()
    const { cleanAllTargets } = useTargetStore()
    cleanAllCargos()
    cleanAllTargets()
  }

  return {
    detectionGameCompleted,
    game,
    setupGame,
    toNextLevel
  }
})