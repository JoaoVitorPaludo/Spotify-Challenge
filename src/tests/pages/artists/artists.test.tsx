import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { expect } from 'vitest'
import { ArtistsPage } from '../../../pages/artists/index.page'

describe('ArtistsPage', () => {
  it('Should render the ArtistsPage', () => {
    render(<ArtistsPage />)
    expect(screen.getByText('Top Artistas')).toBeInTheDocument()
    expect(
      screen.getByText('Aqui você encontra seus artistas preferidos'),
    ).toBeInTheDocument()
  })
})

// describe('ArtistsPage', () => {
//   it('Should not render the ArtistsPageListItem', () => {
//     const mockData = {
//       artistContent: {
//         name: 'teste',
//         image: 'http://example.com/artist.jpg',
//       },
//       albumsList: {
//         items: [
//           {
//             id: '1',
//             images: [{ url: 'http://example.com/image1.jpg' }],
//             name: 'Album 1',
//             release_date: '2022-01-01',
//           },
//           {
//             id: '2',
//             images: [{ url: 'http://example.com/image2.jpg' }],
//             name: 'Album 2',
//             release_date: '2022-02-02',
//           },
//         ],
//         total: 10,
//       },
//       setAlbumsList: vitest.fn(),
//       handleGetAlbum: vitest.fn(),
//     }

//     render(
//       <BrowserRouter>
//         <ArtistContext.Provider value={mockData as any}>
//           <AlbumsPage />
//         </ArtistContext.Provider>
//       </BrowserRouter>,
//     )
//     waitFor(() => {
//       expect(screen.getByTestId('artists-page-list')).toBeInTheDocument()
//       fireEvent.dblClick(screen.getByTestId('artists-page-list'))
//       expect(mockData.handleGetAlbum).toHaveBeenCalled()
//     })
//   })
// })

describe('ArtistsPage', () => {
  beforeEach(() => {
    render(<ArtistsPage />)
  })
  // it('Should double click the button', async () => {
  //   vi.mock('../../../pages/artists/useArtists.ts')
  // const handleClick = vi.fn()
  // const button = screen.getByTestId('artists-page-list')
  // fireEvent.dblClick(button)
  // expect(handleClick).toHaveBeenCalled()
  // })
  it('Should render ArtistsPageListItem', () => {
    waitFor(() => {
      expect(screen.getByTestId('artists-page-list')).toBeInTheDocument()
    })
  })
})
