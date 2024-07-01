import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { vi } from 'vitest'
import { useUserId } from '../../../libs/zustand/userId'

vi.mock('./../../libs/zustand/userId', () => ({
  useUserId: vi.fn().mockImplementation(() => ({
    fetchUserId: vi.fn().mockImplementation((token) => {
      if (token === 'valid-token') {
        return Promise.resolve('user-id')
      } else {
        return Promise.reject(new Error('Invalid token'))
      }
    }),
    set: vi.fn(),
  })),
}))
vi.mock('../../../controller/playlistController/playlistController', () => ({
  getUserId: vi.fn().mockResolvedValue({ data: { id: 'mocked-user-id' } }),
}))

describe('useUserId', () => {
  it('Should set the userId if has token', async () => {
    const { result } = renderHook(() => useUserId())

    await act(() => {
      result.current.fetchUserId('valid-token')
    })

    expect(result.current.userId).toBe('mocked-user-id')
  })
})
