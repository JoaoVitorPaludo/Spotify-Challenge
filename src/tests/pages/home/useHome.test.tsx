import '@testing-library/jest-dom'
import { renderHook, waitFor } from '@testing-library/react'
import { AxiosError } from 'axios'
import { vi } from 'vitest'
import { getRecentPlayedTracks } from '../../../controller/homeController/homeController'
import { useTokenValidator } from '../../../libs/zustand/globalStore'
import { useHome } from '../../../pages/home/useHome'
vi.mock('../../../controller/homeController/homeController')
vi.mock('../../../libs/zustand/globalStore', () => ({
  useTokenValidator: () => ({
    validateStatus: vi.fn(),
  }),
}))

describe('useHome', () => {
  it('Should execute the function getRecentPlayedTracks', async () => {
    const recentPlayed = [
      {
        track: {
          name: 'teste',
          id: '1',
          album: {
            images: [
              {
                url: 'http://example.com/image1.jpg',
                height: 100,
                width: 100,
              },
            ],
            name: 'Name',
          },
        },
      },
    ]

    ;(getRecentPlayedTracks as jest.Mock).mockResolvedValue({
      items: recentPlayed,
    })

    const { result } = renderHook(() => useHome())
    const validateToken = renderHook(() => useTokenValidator())

    await waitFor(() => {
      expect(result.current.recentPlayedTracks).not.toEqual(recentPlayed)
      expect(validateToken.result.current.validateStatus).not.toHaveBeenCalled()
    })
  })

  it('Should return an error if the token is invalid', async () => {
    const mockError = new AxiosError(
      'Unexpected error',
      '401',
      undefined,
      undefined,
      {
        data: {},
        status: 401,
        headers: {},
        config: {
          headers: 'Content-Type: application/json' as any,
        },
        statusText: 'Unauthorized',
        request: {},
      },
    )

    ;(getRecentPlayedTracks as jest.Mock).mockRejectedValue(mockError)

    const { result } = renderHook(() => useHome())

    await waitFor(() => expect(result.current.recentPlayedTracks).toEqual([]))
  })
})
