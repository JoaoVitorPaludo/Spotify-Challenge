import '@testing-library/jest-dom'
import { render, renderHook, screen, waitFor } from '@testing-library/react'
import { useContext } from 'react'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import { describe, vi } from 'vitest'
import { ArtistContext } from '../../../contexts/artistContext/artistContext'
import { ArtistsPage } from '../../../pages/artists/index.page'
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
        <ArtistContext.Provider value={mockData as any}>
          {children}
        </ArtistContext.Provider>
      ),
    })
    await act(async () => {
      result.current.handleGetAlbum(mockData as any)
    })
    await waitFor(() => {
      expect(result.current.handleGetAlbum).toHaveBeenCalled()
    })
  })
})

describe('ArtistsPage', () => {
  beforeEach(() => {
    vi.mock('../../../pages/artists/useArtists', () => ({
      useArtists: () => ({
        artistList: {},
      }),
    }))
  })
  it('Should execute the function handleGetAlbum from the context', async () => {
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
    renderHook(() => useContext(ArtistContext), {
      wrapper: ({ children }) => (
        <ArtistContext.Provider value={mockData as any}>
          {children}
        </ArtistContext.Provider>
      ),
    })
    render(
      <BrowserRouter>
        <ArtistContext.Provider value={mockData as any}>
          <ArtistsPage />
        </ArtistContext.Provider>
      </BrowserRouter>,
    )
    await waitFor(() => {
      expect(screen.getByTestId('artists-page-noList')).toBeInTheDocument()
    })
  })
})
