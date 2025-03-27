<script lang="ts">
  import { defineComponent } from 'vue'
  import MapBlock from './MapBlock.vue'
  import { useMapEditStore } from '@/store/edit/MapEdit'
  export default defineComponent({
    name: 'EditGame',
  })
</script>

<script setup lang="ts">
  const { map } = useMapEditStore()
</script>

<template>
  <div v-for="(_, i) in map" class="flex">
    <div
      class="border border-white"
      style="cursor: pointer"
      v-for="(_, j) in map[i]"
    >
      <MapBlock :i="i" :j="j" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
