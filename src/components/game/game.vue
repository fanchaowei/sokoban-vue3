<script lang='ts'>
import { defineComponent } from 'vue'
import { useGameStore } from '@/store/game'
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
// addCargo(createCargo({ x: 3, y: 4 }))
// addCargo(createCargo({ x: 3, y: 2 }))
addCargo(createCargo({ x: 4, y: 3 }))
addCargo(createCargo({ x: 2, y: 3 }))

const { addTarget, createTarget, targets } = useTargetStore()
addTarget(createTarget({ x: 4, y: 4 }))
addTarget(createTarget({ x: 5, y: 4 }))

const { game } = useGameStore()

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
    <span class="nextLevelBtn" v-show="game.isGameCompleted">下一关</span>
  </div>
</template>

<style scoped lang='css'>
.nextLevelBtn {
  padding: 3px 5px;
  background-color: red;
  cursor: pointer;
}
</style>