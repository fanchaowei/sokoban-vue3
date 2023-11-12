import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useGameStore } from '../game'
import { useTargetStore } from '../target'
import { useCargoStore } from '../cargo'
import { useMapStore } from '../map'
import { IGameData, ILevelGameData } from '@/types'
import { usePlayerStore } from '../player'

describe('game', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const { setupMap } = useMapStore()
    setupMap([
      [1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ])
  })
  it('game completed', () => {
    const { createTarget, addTarget } = useTargetStore()
    addTarget(createTarget({ x: 2, y: 1 }))

    const { addCargo, createCargo } = useCargoStore()
    const cargo = createCargo({ x: 1, y: 1 })
    addCargo(cargo)

    const { moveCargo } = useCargoStore()
    moveCargo(cargo, 1, 0)

    const { detectionGameCompleted, game } = useGameStore()
    detectionGameCompleted()
    expect(game.isGameCompleted).toBe(true)

  })
  it('not game completed', () => {
    const { createTarget, addTarget } = useTargetStore()
    addTarget(createTarget({ x: 2, y: 1 }))

    const { addCargo, createCargo } = useCargoStore()
    const cargo = createCargo({ x: 1, y: 1 })
    addCargo(cargo)

    const { moveCargo } = useCargoStore()
    moveCargo(cargo, 1, 0)
    moveCargo(cargo, 1, 0)

    const { detectionGameCompleted, game } = useGameStore()
    detectionGameCompleted()
    expect(game.isGameCompleted).toBe(false)

  })
  it('setup game', () => {
    const { setupGame } = useGameStore()
    const gameData = getTestGameData()
    setupGame(gameData)

    const { player } = usePlayerStore()
    const { cargos } = useCargoStore()
    const { map } = useMapStore()
    const { targets } = useTargetStore()

    expect(player).toEqual(gameData[0].player)
    expect(map).toEqual(gameData[0].map)
    expect(cargos.length).toBe(gameData[0].cargos.length)
    expect(targets.length).toBe(gameData[0].targets.length)
  })
  it('to next level', () => {
    const { setupGame, toNextLevel, game } = useGameStore()
    const gameData = getTestGameData()
    setupGame(gameData)

    toNextLevel()

    const { player } = usePlayerStore()
    const { cargos } = useCargoStore()
    const { map } = useMapStore()
    const { targets } = useTargetStore()

    expect(game.level).toBe(2)
    expect(player).toEqual(gameData[1].player)
    expect(map).toEqual(gameData[1].map)
    expect(cargos.length).toBe(gameData[1].cargos.length)
    expect(targets.length).toBe(gameData[1].targets.length)
  })
  it('enter the next level, "the next level" button should disappears', () => {
    const { toNextLevel, game, setupGame } = useGameStore()
    const gameData = getTestGameData()
    setupGame(gameData)
    game.isGameCompleted = true

    toNextLevel()

    expect(game.isGameCompleted).toBe(false)
  })
})

function getTestGameData(): IGameData {
  return [getTestLevelGameData({ x: 3, y: 3 }), getTestLevelGameData({ x: 1, y: 1 })]
}

function getTestLevelGameData({ x, y }: { x: number, y: number }): ILevelGameData {
  return {
    player: {
      x,
      y,
    },
    map: [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ],
    cargos: [
      {
        x: 4,
        y: 3,
      },
      {
        x: 2,
        y: 3,
      }
    ],
    targets: [
      {
        x: 4,
        y: 4,
      },
      {
        x: 5,
        y: 4,
      }
    ]
  }
}