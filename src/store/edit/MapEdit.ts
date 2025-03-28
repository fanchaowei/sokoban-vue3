import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { IMap } from '@/types'
import { MapTile } from '@/types'

export const useMapEditStore = defineStore('mapEdit', () => {
  const mapRow = ref<number>(6)
  const mapCol = ref<number>(6)
  const map: IMap = reactive([])

  const initMap = (_row?: number, _col?: number) => {
    if (_row) {
      mapRow.value = _row
    }
    if (_col) {
      mapCol.value = _col
    }
    // 调整行数
    if (mapRow.value > map.length) {
      // 1. Array(mapRow.value - map.length) 创建一个长度为 mapRow.value - map.length 的数组
      // 2. fill(null) 将数组中的每个元素填充为 null
      // 3. map(() => Array(mapCol.value).fill(MapTile.FLOOR)) 将数组中的每个元素填充为一个长度为 mapCol.value 的数组，且每个元素填充为 MapTile.FLOOR
      // 4. map.push(...newRows) 将 newRows 数组中的每个元素添加到 map 数组中
      const newRows = Array(mapRow.value - map.length)
        .fill(null)
        .map(() => Array(mapCol.value).fill(MapTile.FLOOR))
      map.push(...newRows)
    } else {
      map.length = mapRow.value
    }

    // 调整每行的列数
    map.forEach((row, i) => {
      if (mapCol.value > row.length) {
        map[i] = [
          ...row,
          ...Array(mapCol.value - row.length).fill(MapTile.FLOOR),
        ]
      } else {
        row.length = mapCol.value
      }
    })
  }

  const updateMap = (_row?: number, _col?: number) => {
    initMap(_row, _col)
  }

  initMap()

  return {
    map,
    mapRow,
    mapCol,
    initMap,
    updateMap,
  }
})
