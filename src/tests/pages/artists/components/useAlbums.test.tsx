import '@testing-library/jest-dom'
import { renderHook, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { ArtistContext } from '../../../../contexts/artistContext/artistContext'
import { useAlbums } from '../../../../pages/artists/components/albums/useAlbums'

describe('useAlbums', () => {
  it('Should execute handleGetAlbum', () => {
    const { result } = renderHook(() => useAlbums())

    act(() => {
      result.current.handleGetAlbum()
    })

    expect(result.current.handleGetAlbum).toBeDefined()
  })

  it('Should set the useState setAlbumsList', async () => {
    const mockData = {
      artistContent: {
        name: 'teste',
        image: 'http://example.com/artist.jpg',
      },
      albumsList: {
        items: [
          {
            id: '1',
            images: [{ url: 'http://example.com/image1.jpg' }],
            name: 'Album 1',
            release_date: '2022-01-01',
          },
          {
            id: '2',
            images: [{ url: 'http://example.com/image2.jpg' }],
            name: 'Album 2',
            release_date: '2022-02-02',
          },
        ],
        total: 10,
      },
    }

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
      expect(result.current.albumsList).toEqual(mockData.albumsList)
    })
  })
})
