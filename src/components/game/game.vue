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

const { cargos, addCargo, createCargo } = useCargoStore()
addCargo(createCargo({ x: 3, y: 4 }))
addCargo(createCargo({ x: 3, y: 2 }))
addCargo(createCargo({ x: 4, y: 3 }))
addCargo(createCargo({ x: 2, y: 3 }))

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