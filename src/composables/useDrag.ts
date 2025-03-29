import { ref } from 'vue'

const isDrag = ref(false)

export function useDrag() {
  const startDrag = () => {
    isDrag.value = true
  }

  const stopDrag = () => {
    isDrag.value = false
  }

  const isDragging = () => {
    return isDrag.value
  }

  return { isDragging, startDrag, stopDrag }
}
