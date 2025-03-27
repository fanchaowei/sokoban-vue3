<script lang="ts">
  import { defineComponent } from 'vue'
  import floorImg from '@/assets/floor.png'
  import wallImg from '@/assets/wall.png'
  import { MapTile } from '@/types'
  import { useMapEditStore } from '@/store/edit/MapEdit'
  import { useEditElementStore } from '@/store/edit/EditElement'
  export default defineComponent({
    name: 'MapBlock',
  })
</script>

<script setup lang="ts">
  interface Props {
    i: number
    j: number
  }
  const { i, j } = defineProps<Props>()
  const { map } = useMapEditStore()
  const { getCurrentSelectEditElement } = useEditElementStore()
  // 点击切换地图类型
  const handleClick = (i: number, j: number) => {
    getCurrentSelectEditElement().execute({ x: i, y: j })
  }
</script>

<template>
  <div @click="handleClick(i, j)">
    <template v-if="map[i][j] === MapTile.WALL">
      <img :src="wallImg" alt="wall" />
    </template>
    <template v-else-if="map[i][j] === MapTile.FLOOR">
      <img :src="floorImg" alt="floor" />
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
