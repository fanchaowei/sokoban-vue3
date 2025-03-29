import { describe, it, expect } from 'vitest'
import { useDrag } from '../useDrag'
describe('useDrag', () => {
  it('鼠标按下时，isDragging 为 true', () => {
    const { isDragging, startDrag, stopDrag } = useDrag()
    expect(isDragging()).toBe(false)
    startDrag()
    expect(isDragging()).toBe(true)
  })
})
