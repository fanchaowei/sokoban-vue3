import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useGameStore } from '../game'
import { useTargetStore } from '../target'
import { useCargoStore } from '../cargo'

describe('game', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
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
})
