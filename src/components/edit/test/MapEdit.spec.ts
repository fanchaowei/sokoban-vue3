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
  it('未选择元素时，点击地图块不会改变地图块', () => {
    const { map } = useMapEditStore()
    const { setCurrentSelectEditElement, getCurrentSelectEditElement } =
      useEditElementStore()
    setCurrentSelectEditElement(floorEditElement)
    const mapStyle = map[1][1]
    getCurrentSelectEditElement()!.execute({ x: 1, y: 1 })
    expect(map[1][1]).toBe(mapStyle)
  })
  it('选择墙面元素时，点击地图块会改变墙面', () => {
    const { map } = useMapEditStore()
    const { setCurrentSelectEditElement, getCurrentSelectEditElement } =
      useEditElementStore()
    setCurrentSelectEditElement(wallEditElement)
    map[1][1] = MapTile.FLOOR
    getCurrentSelectEditElement()!.execute({ x: 1, y: 1 })
    const mapStyle = map[1][1]
    expect(mapStyle).toBe(MapTile.WALL)
  })
  it('选择地板元素时，点击地图块会改变地板', () => {
    const { map } = useMapEditStore()
    const { setCurrentSelectEditElement, getCurrentSelectEditElement } =
      useEditElementStore()
    setCurrentSelectEditElement(floorEditElement)
    map[1][1] = MapTile.WALL
    getCurrentSelectEditElement()!.execute({ x: 1, y: 1 })
    const mapStyle = map[1][1]
    expect(mapStyle).toBe(MapTile.FLOOR)
  })
})
