import { IPosition } from '@/types'
import { defineStore } from 'pinia'

export const useCargoStore = defineStore('cargo', () => {
  const cargos: IPosition[] = [
    {
      x: 2,
      y: 2
    },
    {
      x: 3,
      y: 3
    },
  ]

  return {
    cargos
  }
})