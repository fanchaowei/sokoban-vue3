import { onMounted, onUnmounted } from 'vue'
import { usePlayerStore } from "@/store/player"


export function useMove() {
  const { movePlayerToLeft, movePlayerToDown, movePlayerToRight, movePlayerToUp } = usePlayerStore()

  function handleKeyUpEvent(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      movePlayerToLeft()
    } else if (e.key === 'ArrowRight') {
      movePlayerToRight()
    } else if (e.key === 'ArrowUp') {
      movePlayerToUp()
    } else if (e.key === 'ArrowDown') {
      movePlayerToDown()
    }
  }

  function addKeyUpEvent() {
    window.addEventListener('keyup', handleKeyUpEvent)
  }
  function removeKeyUpEvent() {
    window.removeEventListener('keyup', handleKeyUpEvent)
  }

  onMounted(() => {
    addKeyUpEvent()
  })

  onUnmounted(() => {
    removeKeyUpEvent()
  })

  return {
    addKeyUpEvent,
    removeKeyUpEvent
  }
}