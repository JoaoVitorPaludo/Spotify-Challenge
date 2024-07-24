import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { vi } from 'vitest'
import { PwaInstaller } from '../../../libs/pwa/pwaInstaller'

describe('PwaInstaller', () => {
  it('Should execute the functions on the component PwaInstaller', async () => {
    const mockPrompt = vi.fn()
    const mockObject = {
      preventDefault: vi.fn(),
      userChoice: 'dismissed',
      prompt: mockPrompt,
    }

    const { result } = renderHook(() => PwaInstaller())

    act(() => {
      result.current.fetchDeferredPrompt(mockObject)
    })

    act(() => {
      result.current.handleInstallClick()
    })

    expect(mockPrompt).toHaveBeenCalled()
  })
})
