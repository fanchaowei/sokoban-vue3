<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'cargo'
})
</script>

<script setup lang='ts'>
import CargoImg from '@/assets/cargo.png'
import CargoOnTargetImg from '@/assets/cargo_on_target.png'
import { usePosition } from '@/composables/usePosition.ts'
import type { ICargo } from '@/types'

interface Props {
  cargo: ICargo
}
const { cargo } = defineProps<Props>()

const { position } = usePosition(cargo)

</script>

<template>
  <div class="absolute" :style="position">
    <img :src="cargo.onTarget ? CargoOnTargetImg : CargoImg" alt="">
  </div>
</template>

<style scoped lang='css'></style>