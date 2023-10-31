import { describe, it, expect } from 'vitest'
import { usePosition } from '@/composables/usePosition'
import { reactive } from 'vue'

describe('usePosition', () => {
  it('传入一个坐标，返回对应的 position', () => {
    const pos = {
      x: 1,
      y: 1
    }
    const { position } = usePosition(pos)
    expect(position.value).toEqual({
      left: '32px',
      top: '32px'
    })
  })

  it('当坐标变动，position 也会变动', () => {
    const pos = reactive({
      x: 1,
      y: 1
    })

    const { position } = usePosition(pos)
    pos.x = 2
    expect(position.value).toEqual({
      left: '64px',
      top: '32px'
    })
  })
})