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
import { gameData } from '@/config/gameData.ts'

const { game, setupGame, toNextLevel } = useGameStore()
const { targets } = useTargetStore()
const { cargos } = useCargoStore()

setupGame(gameData)

function handleToNextLevel() {
  toNextLevel()
}

</script>

<template>
  <div>
    <Map></Map>
    <template v-for="target in targets">
      <Target :x="target.x" :y="target.y"></Target>
    </template>
    <Player></Player>
    <!--  为什么要设置一个 :key ？
        因为进入下一关会删除上一关的箱子重新传入箱子，也就是 Cargo 组件传入的 cargo 参数会被删除。
        已知 vue3 存储副作用函数的 buket 是一个 WeakMap ，这会导致后续传入的新 cargo 没有 computed 响应式。
        所以我们需要添加一个 key ，diff 算法在更新 Cargo 组件时检测到 key 不同，则会构建新的 Cargo 组件，这样就能保证新的 cargo 有 computed 响应式。
    -->
    <template v-for="cargo in cargos" :key="cargo.id">
      <Cargo :cargo="cargo"></Cargo>
    </template>
    <span class="nextLevelBtn" v-show="game.isGameCompleted" @click="handleToNextLevel">下一关</span>
  </div>
</template>

<style scoped lang='css'>
.nextLevelBtn {
  padding: 3px 5px;
  background-color: red;
  cursor: pointer;
}
</style>