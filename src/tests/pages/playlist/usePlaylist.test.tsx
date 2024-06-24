import '@testing-library/jest-dom'

import { renderHook, waitFor } from '@testing-library/react'
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
    ;(getPlaylistList as jest.Mock).mockRejectedValue({
      response: { status: 401 },
    })
    const { result } = renderHook(() => usePlaylist(), {
      initialProps: {
        ...mockData,
      },
    })
    await waitFor(() => {
      expect(result.current.playlistList).toEqual({})
    })
  })

  // it('Shout set the hook useState setPlaylistList', async () => {
  //   const mockDataResult = {
  //     items: {
  //       id: '01',
  //       images: [
  //         {
  //           height: 10,
  //           url: 'http://image.com',
  //           width: 10,
  //         },
  //       ],
  //       name: 'name test',
  //       owner: {
  //         display_name: 'display name test',
  //       },
  //     },
  //     total: 10,
  //   }

  //   const { result } = renderHook(() => usePlaylist(), {
  //     initialProps: {
  //       ...mockDataResult,
  //     },
  //   })
  //   await act(async () => {
  //     await result.current.getPlaylist()
  //   })
  //   await waitFor(() => {
  //     expect(result.current.playlistList).toEqual(mockDataResult)
  //   })
  // })
})
