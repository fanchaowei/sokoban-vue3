<script lang="ts">
  import { defineComponent } from 'vue'
  import MapBlock from './MapBlock.vue'
  import { useMapEditStore } from '@/store/edit/MapEdit'
  export default defineComponent({
    name: 'EditGame',
  })
</script>

<script setup lang="ts">
  // 使用 store 代替{ map, mapRow, mapCol }，因为使用解构语法会造成响应式丢失
  const store = useMapEditStore()

  const handleChange = () => {
    store.initMap()
  }
</script>

<template>
  <div v-for="(_, i) in store.map" class="flex">
    <div
      class="border border-white"
      style="cursor: pointer"
      v-for="(_, j) in store.map[i]"
    >
      <MapBlock :i="i" :j="j" />
    </div>
  </div>
  <div class="input-area">
    <div>
      <span class="mr-2 label">row:</span>
      <input
        class="border border-zinc-200 pl-1"
        type="number"
        v-model="store.mapRow"
      />
    </div>
    <div>
      <span class="mr-2 label">col:</span>
      <input
        class="border border-zinc-200 pl-1"
        type="number"
        v-model="store.mapCol"
      />
    </div>
    <button class="btn" @click="handleChange">change</button>
  </div>
</template>

<style scoped lang="scss">
  .input-area {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-top: 10px;

    div {
      margin-bottom: 5px;
    }

    .label {
      width: 30px;
      display: inline-block;
    }

    .btn {
      width: 80px;
      height: 30px;
      border-radius: 5px;
      border: 1px solid #ccc;
      background-color: #f0f0f0;
      cursor: pointer;
    }
  }
</style>
