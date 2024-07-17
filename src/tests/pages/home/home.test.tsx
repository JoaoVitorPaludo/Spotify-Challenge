import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { vitest } from 'vitest'
import { HomePage } from '../../../pages/home/index.page'
import { useHome } from '../../../pages/home/useHome'
vitest.mock('../../../pages/home/useHome', () => ({
  __esModule: true,
  useHome: vitest.fn(),
}))
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
describe('HomePage', () => {
  it('Should render the HomePage', () => {
    ;(useHome as jest.Mock).mockReturnValue({
      recentPlayedTracks: [],
    })

    render(<HomePage />)

    expect(screen.getByText('Histórico de musicas')).toBeInTheDocument()
    expect(screen.getByText('Suas ultimas musicas ouvidas')).toBeInTheDocument()
  })

  it('Should render the list of recentPlayedTracks', () => {
    ;(useHome as jest.Mock).mockReturnValue({
      recentPlayedTracks: recentPlayed,
    })

    render(<HomePage />)

    expect(screen.getByText('teste')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
  })
})
