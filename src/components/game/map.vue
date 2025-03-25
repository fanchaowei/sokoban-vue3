<script lang="ts">
  import { defineComponent } from 'vue'
  import floorImg from '@/assets/floor.png'
  import wallImg from '@/assets/wall.png'
  import { useMapStore } from '@/store/map.ts'
  import { MapTile } from '@/types'

  export default defineComponent({
    name: 'Map',
  })
</script>

<script setup lang="ts">
  const { map } = useMapStore()
</script>

<template>
  <div v-for="(_, i) in map" class="flex">
    <div v-for="(_, j) in map[i]">
      <template v-if="map[i][j] === MapTile.WALL">
        <img :src="wallImg" alt="wall" />
      </template>
      <template v-else-if="map[i][j] === MapTile.FLOOR">
        <img :src="floorImg" alt="floor" />
      </template>
    </div>
  </div>
</template>

<style scoped lang="css"></style>
