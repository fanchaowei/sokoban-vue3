import { ICargo, IPosition } from '@/types'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useMapStore } from './map'
import { useTargetStore } from './target'

export const useCargoStore = defineStore('cargo', () => {
  const cargos: ICargo[] = reactive([])

  const { isMoveToWall } = useMapStore()

  function addCargo(cargo: ICargo) {
    cargos.push(cargo)
  }

  function createCargo({ x, y }: IPosition): ICargo {
    return {
      x,
      y,
      onTarget: false
    }
  }

  function findCargo({ x, y }: IPosition) {
    const cargo = cargos.find((item) => {
      return item.x === x && item.y === y
    })
    return cargo
  }

  function moveCargo(cargo: ICargo, dx: number, dy: number) {
    const nextPosition = { x: cargo.x + dx, y: cargo.y + dy }
    if (isMoveToWall(nextPosition)) return false
    if (findCargo(nextPosition)) return false

    cargo.x += dx
    cargo.y += dy
    detectionTarget(cargo)

    return true
  }

  function detectionTarget(cargo: ICargo) {
    const { findTarget } = useTargetStore()
    cargo.onTarget = !!findTarget(cargo)
  }

  function cleanAllCargos() {
    cargos.splice(0, cargos.length)
  }

  return {
    cargos,
    addCargo,
    createCargo,
    findCargo,
    moveCargo,
    cleanAllCargos
  }
})