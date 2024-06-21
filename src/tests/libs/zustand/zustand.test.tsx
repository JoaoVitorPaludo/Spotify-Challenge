import '@testing-library/jest-dom'
import { renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { useTokenValidator } from '../../../libs/zustand/globalStore'
vi.mock('../../../libs/zustand/globalStore', () => ({
  useTokenValidator: () => ({
    validateStatus: (status: number, removeCookie: (name: string) => void) => {
      if (status === 401) {
        removeCookie('token')
      }
    },
  }),
}))
describe('useTokenValidator', () => {
  it('Should remove token if status is 401', async () => {
    const mockRemoveCookieFunction = vi.fn()

    expect(mockRemoveCookieFunction).not.toHaveBeenCalled()

    const { result } = renderHook(() => useTokenValidator())

    result.current.validateStatus(401, mockRemoveCookieFunction)

    await waitFor(() => expect(mockRemoveCookieFunction).toHaveBeenCalled())
  })
  it('Should not remove token if status is not 401', async () => {
    const mockRemoveCookieFunction = vi.fn()

    const { result } = renderHook(() => useTokenValidator())

    result.current.validateStatus(200, mockRemoveCookieFunction)

    await waitFor(() => expect(mockRemoveCookieFunction).not.toHaveBeenCalled())
  })
})
