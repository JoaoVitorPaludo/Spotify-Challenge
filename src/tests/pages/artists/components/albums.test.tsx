import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import {
  ArtistContext,
  ArtistProvider,
} from '../../../../contexts/artistContext/artistContext'
import { AlbumsPage } from '../../../../pages/artists/components/albums/index.page'

describe('AlbumsPage', () => {
  it('Should render the AlbumsPage', () => {
    render(
      <BrowserRouter>
        <ArtistProvider>
          <AlbumsPage />
        </ArtistProvider>
      </BrowserRouter>,
    )

    fireEvent.click(screen.getByTestId('back-button-album'))
    expect(window.history.back())
  })
})
describe('AlbumsPage', () => {
  it('Should render the AlbumsPageItem', () => {
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

    render(
      <BrowserRouter>
        <ArtistContext.Provider value={mockData as any}>
          <AlbumsPage />
        </ArtistContext.Provider>
      </BrowserRouter>,
    )
    // Verifica se os itens foram renderizados
    expect(screen.getByText('Album 1')).toBeInTheDocument()
    expect(screen.getByText('2022-01-01')).toBeInTheDocument()
    expect(screen.getByText('Album 2')).toBeInTheDocument()
    expect(screen.getByText('2022-02-02')).toBeInTheDocument()
  })
})
