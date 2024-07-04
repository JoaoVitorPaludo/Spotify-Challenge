import '@testing-library/jest-dom'
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react'
import { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { ArtistContext } from '../../../contexts/artistContext/artistContext'
import { ArtistsPage } from '../../../pages/artists/index.page'
import { useArtists } from '../../../pages/artists/useArtists'

describe('ArtistsPage', () => {
  it('Should render the ArtistsPage', () => {
    render(<ArtistsPage />)
    expect(screen.getByText('Top Artistas')).toBeInTheDocument()
    expect(
      screen.getByText('Aqui você encontra seus artistas preferidos'),
    ).toBeInTheDocument()
  })
})

describe('ArtistsPage', () => {
  beforeEach(() => {
    vi.mock('../../../pages/artists/useArtists', () => ({
      useArtists: vi.fn().mockReturnValue({
        artistList: {
          items: [
            {
              id: '1',
              name: 'Artist 1',
              images: [{ url: 'http://example.com/artist1.jpg' }],
            },
            {
              id: '2',
              name: 'Artist 2',
              images: [{ url: 'http://example.com/artist1.jpg' }],
            },
          ],
          total: 10,
        },
        handleGetAlbum: vi.fn(),
        setAlbumsList: vi.fn(),
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
    const { result } = renderHook(() => useContext(ArtistContext), {
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
    await act(async () => {
      const listItems = screen.getAllByTestId('artists-page-list')
      fireEvent.dblClick(listItems[0])
    })
    await waitFor(() => {
      expect(result.current.handleGetAlbum).toHaveBeenCalled()
    })
  })
  it('Should check if has no artistList ', async () => {
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
    vi.mocked(useArtists as jest.Mock).mockReturnValue({
      artistList: {},
    })

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
  // it('Should execute handlePaginate', async () => {
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
  //     handleGetAlbum: vi.fn(),
  //     setAlbumsList: vi.fn(),
  //     handlePaginate: vi.fn(),
  //   }
  //   render(
  //     <BrowserRouter>
  //       <ArtistContext.Provider value={mockData as any}>
  //         <ArtistsPage />
  //       </ArtistContext.Provider>
  //     </BrowserRouter>,
  //   )

  //   const { result } = renderHook(() => useArtists())

  //   // await act(async () => {
  //   //   // Simula um clique no botão de paginação para a página 2
  //   //   const pageButton = screen.getAllByTestId('artists-page-pagination')
  //   //   fireEvent.click(pageButton[1])
  //   // })
  //   await waitFor(() => {
  //     console.log(result)
  //   })
  // })
})
