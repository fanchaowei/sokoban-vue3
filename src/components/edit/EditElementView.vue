<script lang="ts">
  import { ref, defineComponent, computed } from 'vue'
  import floorImg from '@/assets/floor.png'
  import wallImg from '@/assets/wall.png'
  import { IEditElement, MapTile } from '@/types'
  import { useEditElementStore } from '@/store/edit/EditElement'
  import { floorEditElement, wallEditElement } from '@/store/edit/EditElement'
  export default defineComponent({
    name: 'EditElementView',
  })
</script>

<script setup lang="ts">
  const { setCurrentSelectEditElement, getCurrentSelectEditElement } =
    useEditElementStore()

  const isSelected = ref<MapTile>(getCurrentSelectEditElement().id)

  const floorClass = computed(() => handleChangeSelectClass(MapTile.FLOOR))
  const wallClass = computed(() => handleChangeSelectClass(MapTile.WALL))
  const handleChangeSelectClass = (type: MapTile) => {
    return isSelected.value === type ? 'border-rose-600' : 'border-white'
  }

  const selectObj = ref([
    {
      id: MapTile.FLOOR,
      img: floorEditElement.img,
      selectClass: floorClass,
      click: () => handleClick(floorEditElement),
    },
    {
      id: MapTile.WALL,
      img: wallEditElement.img,
      selectClass: wallClass,
      click: () => handleClick(wallEditElement),
    },
  ])

  const handleClick = (editElement: IEditElement) => {
    setCurrentSelectEditElement(editElement)
    isSelected.value = editElement.id
  }
</script>

<template>
  <h3>元素选择区</h3>
  <div class="select-area">
    <div
      v-for="item in selectObj"
      class="border-2"
      :key="item.id"
      :class="item.selectClass"
      @click="item.click"
    >
      <img :src="item.img" alt="img" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .select-area {
    display: flex;
    flex-direction: row;
    div {
      cursor: pointer;
    }
  }
</style>
