import { ICargo, IPosition } from '@/types'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useCargoStore = defineStore('cargo', () => {
  const cargos: ICargo[] = reactive([])

  function addCargo(cargo: ICargo) {
    cargos.push(cargo)
  }

  function createCargo({ x, y }: IPosition): ICargo {
    return {
      x,
      y
    }
  }

  function findCargo({ x, y }: IPosition) {
    const cargo = cargos.find((cargo) => {
      return cargo.x === x && cargo.y === y
    })
    return cargo
  }

  return {
    cargos,
    addCargo,
    createCargo,
    findCargo
  }
})