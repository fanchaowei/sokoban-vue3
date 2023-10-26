import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePlayerStore  } from '@/store/player'

describe('player',() => {
  beforeEach(() => {
    setActivePinia(createPinia())
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