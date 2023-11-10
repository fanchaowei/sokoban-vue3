import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { ITarget, IPosition } from '@/types'

export const useTargetStore = defineStore('target', () => {
  const targets: ITarget[] = reactive([])

  function createTarget({ x, y }: IPosition): ITarget {
    return {
      x, y
    }
  }

  function addTarget(target: ITarget) {
    targets.push(target)
  }

  function findTarget({ x, y }: IPosition) {
    return targets.find((item) => {
      return item.x === x && item.y === y
    })
  }

  function cleanAllTargets() {
    targets.splice(0, targets.length)
  }

  return {
    targets,
    createTarget,
    addTarget,
    findTarget,
    cleanAllTargets
  }
})