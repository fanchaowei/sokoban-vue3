<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Target'
})
</script>

<script setup lang='ts'>
import TargetImg from '@/assets/target.png'
import { usePosition } from '@/composables/usePosition.ts'
import type { IPosition } from '@/types'

const props = defineProps<IPosition>()

const { position } = usePosition(props)
</script>

<template>
  <div class="absolute" :style="position">
    <img :src="TargetImg" alt="">
  </div>
</template>

<style scoped lang='css'></style>