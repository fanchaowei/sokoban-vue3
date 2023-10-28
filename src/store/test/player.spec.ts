import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePlayerStore } from '@/store/player'
import { useMapStore } from '../map'

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
})