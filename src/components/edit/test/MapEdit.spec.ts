import { describe, it, expect, beforeEach } from 'vitest'
import { useMapEditStore } from '@/store/edit/MapEdit'
import { MapTile } from '@/types'
import { setActivePinia, createPinia } from 'pinia'
import { useEditElementStore } from '@/store/edit/EditElement'
import { floorEditElement, wallEditElement } from '@/store/edit/EditElement'
describe('MapEdit', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('选择墙面元素时，点击地图块会改变墙面', () => {
    const { map } = useMapEditStore()
    const { setCurrentSelectEditElement, getCurrentSelectEditElement } =
      useEditElementStore()
    setCurrentSelectEditElement(wallEditElement)
    map[1][1] = MapTile.FLOOR
    getCurrentSelectEditElement().execute({ x: 1, y: 1 })
    const mapStyle = map[1][1]
    expect(mapStyle).toBe(MapTile.WALL)
  })
  it('选择地板元素时，点击地图块会改变地板', () => {
    const { map } = useMapEditStore()
    const { setCurrentSelectEditElement, getCurrentSelectEditElement } =
      useEditElementStore()
    setCurrentSelectEditElement(floorEditElement)
    map[1][1] = MapTile.WALL
    getCurrentSelectEditElement().execute({ x: 1, y: 1 })
    const mapStyle = map[1][1]
    expect(mapStyle).toBe(MapTile.FLOOR)
  })
  it('输入行和列，会改变地图的长高', () => {
    const { map, initMap, updateMap } = useMapEditStore()
    initMap(6, 6)
    updateMap(8, 8)

    initMap()

    expect(map.length).toBe(8)
    expect(map[0].length).toBe(8)
  })
  it('输入行和列，会改变地图的长高, 且之前地图的元素会被保留', () => {
    const { map, initMap, updateMap } = useMapEditStore()
    const { setCurrentSelectEditElement, getCurrentSelectEditElement } =
      useEditElementStore()
    setCurrentSelectEditElement(wallEditElement)
    map[2][2] = MapTile.WALL
    initMap()

    updateMap(4, 4)
    expect(map[2][2]).toBe(MapTile.WALL)

    updateMap(undefined, 3)
    expect(map[2][2]).toBe(MapTile.WALL)
    // 快照测试
    expect(map).toMatchInlineSnapshot(`
      [
        [
          2,
          2,
          2,
        ],
        [
          2,
          2,
          2,
        ],
        [
          2,
          2,
          1,
        ],
        [
          2,
          2,
          2,
        ],
      ]
    `)
  })
})
