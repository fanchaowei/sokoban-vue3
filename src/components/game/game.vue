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
import Target from './target.vue'
import { useCargoStore } from '@/store/cargo.ts'
import { useTargetStore } from '@/store/target.ts'

const { cargos, addCargo, createCargo } = useCargoStore()
addCargo(createCargo({ x: 3, y: 4 }))
addCargo(createCargo({ x: 3, y: 2 }))
addCargo(createCargo({ x: 4, y: 3 }))
addCargo(createCargo({ x: 2, y: 3 }))

const { addTarget, createTarget, targets } = useTargetStore()
addTarget(createTarget({ x: 4, y: 4 }))
addTarget(createTarget({ x: 5, y: 4 }))

</script>

<template>
  <div>
    <Map></Map>
    <template v-for="target in targets">
      <Target :x="target.x" :y="target.y"></Target>
    </template>
    <Player></Player>
    <template v-for="cargo in cargos">
      <Cargo :cargo="cargo"></Cargo>
    </template>
  </div>
</template>

<style scoped lang='css'></style>