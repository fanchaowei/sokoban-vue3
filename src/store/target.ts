import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useTargetStore = defineStore('target', () => {
  const targets = reactive([
    {
      x: 4,
      y: 4
    },
    {
      x: 5,
      y: 4
    }
  ])

  return {
    targets
  }
})