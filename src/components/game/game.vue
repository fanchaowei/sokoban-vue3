<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Game'
})
</script>

<script setup lang='ts'>
import Map from './map.vue'
import Player from './player.vue'
import Cargo from './cargo.vue'
import { useCargoStore } from '@/store/cargo.ts'

const { cargos } = useCargoStore()

</script>

<template>
  <div>
    <Map></Map>
    <Player></Player>
    <template v-for="cargo in cargos">
      <Cargo :x="cargo.x" :y="cargo.y"></Cargo>
    </template>
  </div>
</template>

<style scoped lang='css'></style>