<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
name: 'Game'
})
</script>

<script setup lang='ts'>
import Map from './map.vue'
import Player from './player.vue'

</script>

<template>
  <div>
    <Map></Map>
    <Player></Player>
  </div>
</template>

<style scoped lang='css'>
</style>