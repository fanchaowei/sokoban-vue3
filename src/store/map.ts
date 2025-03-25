import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { MapTile } from '@/types'
import type { IMap, IPosition } from '@/types'

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
    isMoveToWall,
  }
})
