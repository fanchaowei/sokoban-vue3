<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Player'
})
</script>

<script setup lang='ts'>
import PlayerImg from '@/assets/keeper.png'
import { usePlayerStore } from '@/store/player.ts'
import { useMove } from './player/useMove'
import { usePosition } from '@/composables/usePosition.ts'

useMove()

const { player } = usePlayerStore()
const { position } = usePosition(player)

</script>

<template>
  <div class="absolute" :style="position">
    <img :src="PlayerImg" alt="">
  </div>
</template>

<style scoped lang='css'></style>