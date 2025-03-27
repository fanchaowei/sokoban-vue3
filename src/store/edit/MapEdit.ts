import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { IMap, IEditElement } from '@/types'
import { MapTile } from '@/types'

export const useMapEditStore = defineStore('mapEdit', () => {
  const map: IMap = reactive([
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
  ])

  return {
    map,
  }
})
