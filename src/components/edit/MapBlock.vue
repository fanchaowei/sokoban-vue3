<script lang="ts">
  import { defineComponent } from 'vue'
  import floorImg from '@/assets/floor.png'
  import wallImg from '@/assets/wall.png'
  import { MapTile } from '@/types'
  import { useMapEditStore } from '@/store/edit/MapEdit'
  import { useEditElementStore } from '@/store/edit/EditElement'
  import { useDrag } from '@/composables/useDrag'
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
  const { startDrag, stopDrag, isDragging } = useDrag()
  // 点击切换地图类型
  const handleClick = (x: number, y: number) => {
    getCurrentSelectEditElement().execute({ x, y })
  }
  const handleMouseDown = (x: number, y: number) => {
    startDrag()
    window.addEventListener('mouseup', handleMouseUp)
  }
  const handleMouseMove = (x: number, y: number) => {
    if (isDragging()) {
      getCurrentSelectEditElement().execute({ x, y })
    }
  }
  const handleMouseUp = () => {
    stopDrag()
    window.removeEventListener('mouseup', handleMouseUp)
  }
</script>

<template>
  <div
    @click="handleClick(i, j)"
    @mousedown="handleMouseDown(i, j)"
    @mousemove="handleMouseMove(i, j)"
  >
    <template v-if="map[i][j] === MapTile.WALL">
      <img :src="wallImg" alt="wall" draggable="false" />
    </template>
    <template v-else-if="map[i][j] === MapTile.FLOOR">
      <img :src="floorImg" alt="floor" draggable="false" />
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
