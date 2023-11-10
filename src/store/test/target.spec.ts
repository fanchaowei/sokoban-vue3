import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTargetStore } from '../target'

describe('target', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('clean/reset all targets', () => {
    const { addTarget, createTarget, cleanAllTargets, targets } = useTargetStore()
    const target = createTarget({ x: 1, y: 1 })
    addTarget(target)
    cleanAllTargets()
    expect(targets.length).toBe(0)
  })
})