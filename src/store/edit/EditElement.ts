import { defineStore } from 'pinia'
import type { IEditElement, IPosition } from '@/types'
import { useMapEditStore } from './MapEdit'
import { MapTile } from '@/types'
import { reactive } from 'vue'
  import floorImg from '@/assets/floor.png'
  import wallImg from '@/assets/wall.png'

export const wallEditElement: IEditElement = {
  id: MapTile.WALL,
  img: wallImg,
  execute: (position: IPosition) => {
    const { map } = useMapEditStore()
    map[position.x][position.y] = MapTile.WALL
  },
}

export const floorEditElement: IEditElement = {
  id: MapTile.FLOOR,
  img: floorImg,
  execute: (position: IPosition) => {
    const { map } = useMapEditStore()
    map[position.x][position.y] = MapTile.FLOOR
  },
}

export const useEditElementStore = defineStore('editElement', () => {
  let currentSelectEditElement: IEditElement = reactive(floorEditElement)

  const setCurrentSelectEditElement = (editElement: IEditElement) => {
    currentSelectEditElement = editElement
  }
  const getCurrentSelectEditElement = () => {
    return currentSelectEditElement
  }
  return {
    setCurrentSelectEditElement,
    getCurrentSelectEditElement,
  }
})
