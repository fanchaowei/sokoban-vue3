import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { IPosition } from '@/types'

type IMap = MapTile[][]

export const enum MapTile {
  WALL = 1,
  FLOOR = 2
}

export const useMapStore = defineStore('map', () => {
  const map: IMap = reactive([])

  function setupMap(newMap: IMap) {
    map.splice(0, map.length, ...newMap)
  }

  function isMoveToWall(position: IPosition) {
    return map[position.y][position.x] === MapTile.WALL
  }

  return {
    map,
    setupMap,
    isMoveToWall
  }
})