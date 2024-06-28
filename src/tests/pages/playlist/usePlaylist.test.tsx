import '@testing-library/jest-dom'

import { renderHook, waitFor } from '@testing-library/react'
import { AxiosError } from 'axios'
import { vi } from 'vitest'
import { getPlaylistList } from '../../../controller/playlistController/playlistController'
import { usePlaylist } from '../../../pages/playlist/usePlaylist'
vi.mock('../../../controller/playlistController/playlistController')
describe('usePlaylist', () => {
  it('Should get profile info on start', async () => {
    const mockData = {
      items: {
        id: '01',
        images: [
          {
            height: 10,
            url: 'http://image.com',
            width: 10,
          },
        ],
        name: 'name test',
        owner: {
          display_name: 'display name test',
        },
      },
      total: 10,
    }
    ;(getPlaylistList as jest.Mock).mockResolvedValue({ data: mockData })

    const { result } = renderHook(() => usePlaylist())
    await waitFor(() => {
      expect(result.current.playlistList).toEqual(mockData)
    })
  })

  it('Should remove cookie if has as error', async () => {
    const mockData = {}
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
    ;(getPlaylistList as jest.Mock).mockRejectedValue(mockError)
    const { result } = renderHook(() => usePlaylist())
    await waitFor(() => {
      expect(result.current.playlistList).toEqual(mockData)
    })
  })
})
