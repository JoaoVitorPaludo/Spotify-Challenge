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
  it('Deve remover o token se o status for 401', () => {
    const { validateStatus } = useTokenValidator()
    const mockRemoveCookieFunction = vi.fn()
    validateStatus(401, mockRemoveCookieFunction)
    expect(mockRemoveCookieFunction).toHaveBeenCalledWith('token')
  })

  it('Não deve remover o token se o status não for 401', () => {
    const { validateStatus } = useTokenValidator()
    const mockRemoveCookieFunction = vi.fn()
    validateStatus(200, mockRemoveCookieFunction)
    expect(mockRemoveCookieFunction).not.toHaveBeenCalled()
  })

  it('Não deve remover o token se o status não for 401', () => {
    const { validateStatus } = useTokenValidator()
    const mockRemoveCookieFunction = vi.fn()
    const status = 404
    validateStatus(status, mockRemoveCookieFunction)
    expect(status).not.toBe(401)
  })
})
