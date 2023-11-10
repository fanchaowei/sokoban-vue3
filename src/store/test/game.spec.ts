import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useGameStore } from '../game'
import { useTargetStore } from '../target'
import { useCargoStore } from '../cargo'
import { useMapStore } from '../map'
import { ILevelGameData } from '@/types'
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
    const levelGameData = getLevelGameData()
    setupGame(levelGameData)

    const { player } = usePlayerStore()
    const { cargos } = useCargoStore()
    const { map } = useMapStore()
    const { targets } = useTargetStore()

    expect(player).toEqual(levelGameData.player)
    expect(map).toEqual(levelGameData.map)
    expect(cargos.length).toBe(2)
    expect(targets.length).toBe(2)
  })
})

function getLevelGameData(): ILevelGameData {
  return {
    player: {
      x: 3,
      y: 3,
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