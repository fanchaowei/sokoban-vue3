import { describe, it, expect, beforeEach } from 'vitest'
import { useMapStore } from '../map'
import { setActivePinia, createPinia } from 'pinia'

describe('map', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('happy path', () => {
    expect(true).toBe(true)
  })

  it('调用 setupMap 则改变地图', () => {
    const { setupMap, map } = useMapStore()

    const newMap = [
      [2, 2, 2],
      [2, 2, 2],
      [2, 2, 2],
    ]

    setupMap(newMap)
    expect(map).toEqual(newMap)
  })
})