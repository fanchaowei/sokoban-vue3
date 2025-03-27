<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'EditGame',
  })
</script>

<script setup lang="ts">
  import EditGame from '@/components/edit/MapEdit.vue'
  import EditElementView from '@/components/edit/EditElementView.vue'
</script>

<template>
  <div class="views-content">
    <div class="map">
      <div class="map__editor">
        <EditGame></EditGame>
      </div>
      <div class="map__info">数据展示区</div>
    </div>
    <div class="el-select">
      <EditElementView></EditElementView>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .views-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    flex-direction: column;

    .map {
      flex: 2;
      display: flex;
      width: 100%;

      .map__editor {
        flex: 2;
        width: 100%;
      }
      .map__info {
        flex: 1;
        width: 100%;
      }
    }
    .el-select {
      flex: 1;
      width: 100%;
    }
  }
</style>
