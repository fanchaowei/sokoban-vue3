<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'cargo'
})
</script>

<script setup lang='ts'>
import CargoImg from '@/assets/cargo.png'
import { usePosition } from '@/composables/usePosition.ts'
import type { IPosition } from '@/types'

const props = defineProps<IPosition>()

const { position } = usePosition(props)

</script>

<template>
  <div class="absolute" :style="position">
    <img :src="CargoImg" alt="">
  </div>
</template>

<style scoped lang='css'></style>