import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePlayerStore } from '../player'
import { useMapStore } from '../map'
import { useCargoStore } from '../cargo'

describe('player', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('人物移动测试', () => {
    beforeEach(() => {
      const { setupMap } = useMapStore()
      setupMap([
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ])
    })

    it('人物向左移动', () => {
      const { player, movePlayerToLeft } = usePlayerStore()
      player.x = 1
      player.y = 1

      movePlayerToLeft()

      expect(player.x).toBe(0)
    })
    it('人物向右移动', () => {
      const { player, movePlayerToRight } = usePlayerStore()
      player.x = 1
      player.y = 1

      movePlayerToRight()

      expect(player.x).toBe(2)
    })
    it('人物向上移动', () => {
      const { player, movePlayerToUp } = usePlayerStore()
      player.x = 1
      player.y = 1

      movePlayerToUp()

      expect(player.y).toBe(0)
    })
    it('人物向下移动', () => {
      const { player, movePlayerToDown } = usePlayerStore()
      player.x = 1
      player.y = 1

      movePlayerToDown()

      expect(player.y).toBe(2)
    })
  })

  describe('撞墙测试', () => {
    beforeEach(() => {
      const { setupMap } = useMapStore()
      setupMap([
        [1, 1, 1],
        [1, 2, 1],
        [1, 1, 1],
      ])
    })
    it('人物向左移动时，如果碰到墙壁则不移动', () => {
      const { player, movePlayerToLeft } = usePlayerStore()
      player.x = 1
      player.y = 1

      movePlayerToLeft()

      expect(player.x).toBe(1)
    })
    it('人物向右移动时，如果碰到墙壁则不移动', () => {
      const { player, movePlayerToRight } = usePlayerStore()
      player.x = 1
      player.y = 1

      movePlayerToRight()

      expect(player.x).toBe(1)
    })
    it('人物向上移动时，如果碰到墙壁则不移动', () => {
      const { player, movePlayerToUp } = usePlayerStore()
      player.x = 1
      player.y = 1

      movePlayerToUp()

      expect(player.y).toBe(1)
    })
    it('人物向下移动时，如果碰到墙壁则不移动', () => {
      const { player, movePlayerToDown } = usePlayerStore()
      player.x = 1
      player.y = 1

      movePlayerToDown()

      expect(player.y).toBe(1)
    })
  })

  describe('撞箱子测试', () => {
    beforeEach(() => {
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

    it('左边有空位时，人物向左推箱子，箱子和人物都向左移动', () => {
      const { addCargo, createCargo } = useCargoStore()
      const cargo = createCargo({ x: 2, y: 1 })
      addCargo(cargo)

      const { player, movePlayerToLeft } = usePlayerStore()
      player.x = 3
      player.y = 1

      movePlayerToLeft()

      expect(player.x).toBe(2)
      expect(cargo.x).toBe(1)
    })
    it('右边有空位时，人物向右推箱子，箱子和人物都向右移动', () => {
      const { addCargo, createCargo } = useCargoStore()
      const cargo = createCargo({ x: 4, y: 3 })
      addCargo(cargo)

      const { player, movePlayerToRight } = usePlayerStore()
      player.x = 3
      player.y = 3

      movePlayerToRight()

      expect(player.x).toBe(4)
      expect(cargo.x).toBe(5)
    })
    it('上边有空位时，人物向上推箱子，箱子和人物都向上移动', () => {
      const { addCargo, createCargo } = useCargoStore()
      const cargo = createCargo({ x: 3, y: 2 })
      addCargo(cargo)

      const { player, movePlayerToUp } = usePlayerStore()
      player.x = 3
      player.y = 3

      movePlayerToUp()

      expect(player.y).toBe(2)
      expect(cargo.y).toBe(1)
    })
    it('下边有空位时，人物向下推箱子，箱子和人物都向下移动', () => {
      const { addCargo, createCargo } = useCargoStore()
      const cargo = createCargo({ x: 3, y: 4 })
      addCargo(cargo)

      const { player, movePlayerToDown } = usePlayerStore()
      player.x = 3
      player.y = 3

      movePlayerToDown()

      expect(player.y).toBe(4)
      expect(cargo.y).toBe(5)
    })
  })

  describe('推动箱子撞墙测试', () => {
    beforeEach(() => {
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

    it('向左推箱子，如果碰到墙壁则不推动', () => {
      const { addCargo, createCargo } = useCargoStore()
      const cargo = createCargo({ x: 1, y: 1 })
      addCargo(cargo)

      const { player, movePlayerToLeft } = usePlayerStore()
      player.x = 2
      player.y = 1

      movePlayerToLeft()

      expect(player.x).toBe(2)
      expect(cargo.x).toBe(1)
    })
  })

  describe('推动箱子撞箱子测试', () => {
    beforeEach(() => {
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
    it('向左推箱子，如果碰到箱子则不推动', () => {
      const { addCargo, createCargo } = useCargoStore()
      const cargo1 = createCargo({ x: 2, y: 1 })
      const cargo2 = createCargo({ x: 3, y: 1 })
      addCargo(cargo1)
      addCargo(cargo2)

      const { player, movePlayerToLeft } = usePlayerStore()
      player.x = 4
      player.y = 1

      movePlayerToLeft()

      expect(player.x).toBe(4)
      expect(cargo1.x).toBe(2)
      expect(cargo2.x).toBe(3)
    })
  })
})