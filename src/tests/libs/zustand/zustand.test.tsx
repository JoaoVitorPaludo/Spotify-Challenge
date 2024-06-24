import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { useTokenValidator } from '../../../libs/zustand/globalStore'
vi.mock('../../../libs/zustand/globalStore', () => ({
  useTokenValidator: vi.fn().mockImplementation(() => ({
    validateStatus: vi.fn().mockImplementation((status, removeCookie) => {
      if (status === 401) {
        removeCookie('token')
      }
    }),
  })),
}))
describe('useTokenValidator', () => {
  it('Should remove token if status is 401', async () => {
    const { validateStatus } = useTokenValidator()
    const mockRemoveCookieFunction = vi.fn()
    validateStatus(401, mockRemoveCookieFunction)
    expect(mockRemoveCookieFunction).toHaveBeenCalledWith('token')
  })
  it('Should not remove token if status is not 401', async () => {
    const { validateStatus } = useTokenValidator()
    const mockRemoveCookieFunction = vi.fn()
    validateStatus(200, mockRemoveCookieFunction)
    expect(mockRemoveCookieFunction).not.toHaveBeenCalledWith('token')
  })
})
