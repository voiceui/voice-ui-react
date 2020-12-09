import { useVoiceControl } from '../VoiceControl'
import { renderHook } from '@testing-library/react-hooks'
import './corti'
describe('useVoiceControl', () => {
  let hook
  beforeEach(() => {

  })

  test('initial result should be null', () => {
    hook = renderHook(() => useVoiceControl({ formFields: ['name'] }))
    expect(hook.current).toBe(null)
  })
})
