import '@testing-library/jest-dom'
import { renderHook, waitFor } from '@testing-library/react'
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
})
