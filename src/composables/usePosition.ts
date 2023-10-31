import { computed } from 'vue'
import type { IPosition } from '@/types'

export function usePosition(pos: IPosition) {

  const STEP = 32
  const position = computed(() => {
    return {
      "left": pos.x * STEP + 'px',
      "top": pos.y * STEP + 'px'
    }
  })

  return {
    position
  }
}