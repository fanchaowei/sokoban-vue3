import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useMove } from '../player/useMove'
import { usePlayerStore } from '@/store/player'
import { onMounted, onUnmounted } from 'vue'
import { useMapStore } from '@/store/map'

vi.mock('vue', async () => {
  const actual: any = await vi.importActual("vue")
  return {
    ...actual,
    onMounted: (fn: Function) => fn(),
    onUnmounted: (fn: Function) => fn()
  }
})


describe('play', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    const { setupMap } = useMapStore()
    setupMap([
      [2, 2, 2],
      [2, 2, 2],
      [2, 2, 2],
    ])

    const { addKeyUpEvent } = useMove()
    onMounted(addKeyUpEvent)
  })
  afterEach(() => {
    const { removeKeyUpEvent } = useMove()
    onUnmounted(removeKeyUpEvent)
  })
  it('当按下左方向键时，人物向左移动', () => {
    const { player } = usePlayerStore()
    player.x = 1
    player.y = 1

    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowLeft' }))

    expect(player.x).toBe(0)
  })
  it('当按下右方向键时，人物向右移动', () => {
    const { player } = usePlayerStore()
    player.x = 1
    player.y = 1

    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight' }))

    expect(player.x).toBe(2)
  })
  it('当按下上方向键时，人物向上移动', () => {
    const { player } = usePlayerStore()
    player.x = 1
    player.y = 1

    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowUp' }))

    expect(player.y).toBe(0)
  })
  it('当按下下方向键时，人物向下移动', () => {
    const { player } = usePlayerStore()
    player.x = 1
    player.y = 1

    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowDown' }))

    expect(player.y).toBe(2)
  })
})

