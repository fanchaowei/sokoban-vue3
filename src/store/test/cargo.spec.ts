import { describe, it, expect, beforeEach } from 'vitest'
import { useCargoStore } from '../cargo'
import { createPinia, setActivePinia } from 'pinia'

describe('箱子', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('创建箱子', () => {
    const { addCargo, createCargo, cargos } = useCargoStore()
    const cargo = createCargo({ x: 1, y: 1 })
    addCargo(cargo)
    expect(cargos.length).toBe(1)
  })
})