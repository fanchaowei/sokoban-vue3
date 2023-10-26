<script lang='ts'>
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'Player'
})
</script>

<script setup lang='ts'>
import PlayerImg from '@/assets/keeper.png'
import { usePlayerStore } from '@/store/player.ts'
import { useMove } from './player/useMove'

useMove()
const { position } = usePosition()

function usePosition() {
  const { player } = usePlayerStore()

  const STEP = 32
  const position = computed(() => {
    return {
      "left": player.x * STEP + 'px',
      "top": player.y * STEP + 'px'
    }
  })

  return {
    position
  }
}

</script>

<template>
  <div class="absolute" :style="position">
    <img :src="PlayerImg" alt="">
  </div>
</template>

<style scoped lang='css'></style>