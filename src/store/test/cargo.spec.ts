import { describe, it, expect, beforeEach } from 'vitest'
import { useCargoStore } from '../cargo'
import { useTargetStore } from '../target'
import { createPinia, setActivePinia } from 'pinia'
import { useMapStore } from '../map'

describe('cargo', () => {
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
  it('create cargo', () => {
    const { addCargo, createCargo, cargos } = useCargoStore()
    const cargo = createCargo({ x: 1, y: 1 })
    addCargo(cargo)
    expect(cargos.length).toBe(1)
  })

  describe('on target point', () => {
    it('Move to the target point', () => {
      const { createTarget, addTarget } = useTargetStore()
      addTarget(createTarget({ x: 2, y: 1 }))

      const { addCargo, createCargo } = useCargoStore()
      const cargo = createCargo({ x: 1, y: 1 })
      addCargo(cargo)

      const { moveCargo } = useCargoStore()
      moveCargo(cargo, 1, 0)

      expect(cargo.onTarget).toBe(true)

    })
    it('Move away from the target point', () => {
      const { createTarget, addTarget } = useTargetStore()
      addTarget(createTarget({ x: 2, y: 1 }))

      const { addCargo, createCargo } = useCargoStore()
      const cargo = createCargo({ x: 1, y: 1 })
      addCargo(cargo)

      const { moveCargo } = useCargoStore()
      moveCargo(cargo, 1, 0)
      moveCargo(cargo, 1, 0)

      expect(cargo.onTarget).toBe(false)
    })
  })

  it('clean/reset all cargos', () => {
    const { addCargo, createCargo, cleanAllCargos, cargos } = useCargoStore()
    const cargo = createCargo({ x: 1, y: 1 })
    addCargo(cargo)

    cleanAllCargos()

    expect(cargos.length).toBe(0)
  })
})