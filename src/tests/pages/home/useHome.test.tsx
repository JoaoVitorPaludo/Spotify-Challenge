import '@testing-library/jest-dom'
import { renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { getPlaylistList } from '../../../controller/playlistController/playlistController'
import { useHome } from '../../../pages/home/useHome'
vi.mock('../../../controller/playlistController/playlistController')

describe('useHome', () => {
  it('Should execute the function handleGetRecentPlayedTracks', async () => {
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

    ;(getPlaylistList as jest.Mock).mockResolvedValue({
      items: recentPlayed,
    })

    const { result } = renderHook(() => useHome())
    await waitFor(() =>
      expect(result.current.recentPlayedTracks).not.toEqual(recentPlayed),
    )
  })
})
