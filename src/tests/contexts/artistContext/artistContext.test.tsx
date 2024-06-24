import '@testing-library/jest-dom'
import { renderHook, waitFor } from '@testing-library/react'
import { useContext } from 'react'
import { act } from 'react-dom/test-utils'
import { describe, vi } from 'vitest'
import { ArtistContext } from '../../../contexts/artistContext/artistContext'

describe('ArtistContext', () => {
  it('should call handleGetAlbum and update context', async () => {
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
      handleGetAlbum: vi.fn(),
      setAlbumsList: vi.fn(),
    }

    const { result } = renderHook(() => useContext(ArtistContext), {
      wrapper: ({ children }) => (
        <ArtistContext.Provider value={mockData}>
          {children}
        </ArtistContext.Provider>
      ),
    })
    await act(async () => {
      await result.current.handleGetAlbum
    })
    await waitFor(() => {
      console.log(result.current)
      expect(result.current.handleGetAlbum).toHaveBeenCalled()
    })
  })
})
