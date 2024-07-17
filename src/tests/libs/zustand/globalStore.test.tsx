import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { useTokenValidator } from '../../../libs/zustand/globalStore'

// vi.mock('../../../libs/zustand/globalStore')

// Mock da função removeCookie
const removeCookieMock = vi.fn()

describe('useTokenValidator', () => {
  it('Should remove the token if the status is 401', () => {
    const { validateStatus } = useTokenValidator.getState()
    validateStatus(401, removeCookieMock)
    expect(removeCookieMock).toHaveBeenCalledWith('token')
  })

  it('Should not remove the token if the status is not 401', () => {
    const { validateStatus } = useTokenValidator.getState()
    validateStatus(200, removeCookieMock)
  })
})
