import '@testing-library/jest-dom'
import { renderHook, waitFor } from '@testing-library/react'
import { AxiosError } from 'axios'
import { act } from 'react-dom/test-utils'
import { vi } from 'vitest'
import { ArtistContext } from '../../../../contexts/artistContext/artistContext'
import { getAlbums } from '../../../../controller/artistsController/artistsController'
import { useAlbums } from '../../../../pages/artists/components/albums/useAlbums'
vi.mock('../../../../controller/artistsController/artistsController')

describe('useAlbums', () => {
  it('Should call handlePaginate', async () => {
    const { result } = renderHook(() => useAlbums())

    await act(async () => {
      const event: React.ChangeEvent<unknown> = new Event('change') as any
      result.current.handlePaginate(event, 1)
    })
  })

  // it('Should validate handleGetAlbum', async () => {
  //   const mockData = {
  //     artistContent: {
  //       name: 'teste',
  //       image: 'http://example.com/artist.jpg',
  //     },
  //     albumsList: {
  //       items: [
  //         {
  //           id: '1',
  //           images: [{ url: 'http://example.com/image1.jpg' }],
  //           name: 'Album 1',
  //           release_date: '2022-01-01',
  //         },
  //         {
  //           id: '2',
  //           images: [{ url: 'http://example.com/image2.jpg' }],
  //           name: 'Album 2',
  //           release_date: '2022-02-02',
  //         },
  //       ],
  //       total: 10,
  //     },
  //   }

  //   const { result } = renderHook(() => useAlbums(), {
  //     wrapper: ({ children }) => (
  //       <ArtistContext.Provider value={mockData as any}>
  //         {children}
  //       </ArtistContext.Provider>
  //     ),
  //   })

  //   await act(async () => {
  //     await result.current.handleGetAlbum()
  //   })
  //   await waitFor(() => {
  //     expect(result.current.albumsList).toEqual(mockData.albumsList)
  //     expect(result.current.albumsList).not.toEqual(mockData.artistContent)
  //   })
  // })

  it('Should call getAlbums', async () => {
    const mockData = {
      artistContent: {
        id: '01',
        name: 'teste',
        image: 'http://example.com/artist.jpg',
      },
      albumsList: {
        items: [
          {
            id: '1',
            images: [
              { url: 'http://example.com/image1.jpg', height: 10, width: 10 },
            ],

            name: 'Album 1',
            release_date: '2022-01-01',
          },
          {
            id: '2',
            images: [
              { url: 'http://example.com/image1.jpg', height: 10, width: 10 },
            ],
            name: 'Album 2',
            release_date: '2022-02-02',
          },
        ],
        total: 10,
      },
      handleGetAlbum: vi.fn(),
      setAlbumsList: vi.fn(),
    }

    ;(getAlbums as jest.Mock).mockResolvedValue(mockData)

    const { result } = renderHook(() => useAlbums(), {
      wrapper: ({ children }) => (
        <ArtistContext.Provider value={mockData}>
          {children}
        </ArtistContext.Provider>
      ),
    })

    await act(async () => {
      await result.current.handleGetAlbum()
    })
    await waitFor(() => {
      expect(result.current.albumsList).toEqual(mockData.albumsList)
      expect(mockData.setAlbumsList).toHaveBeenCalled()
    })
  })

  it('Should remove cookie if has as error', async () => {
    const mockData = {
      artistContent: {
        id: '01',
        name: 'teste',
        image: 'http://example.com/artist.jpg',
      },
      albumsList: {},
      handleGetAlbum: vi.fn(),
      setAlbumsList: vi.fn(),
    }

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
    ;(getAlbums as jest.Mock).mockRejectedValue(mockError)

    const { result } = renderHook(() => useAlbums(), {
      wrapper: ({ children }) => (
        <ArtistContext.Provider value={mockData as any}>
          {children}
        </ArtistContext.Provider>
      ),
    })

    await act(async () => {
      await result.current.handleGetAlbum()
    })
    await waitFor(() => {
      expect(result.current.albumsList).toEqual({})
    })
  })
})
