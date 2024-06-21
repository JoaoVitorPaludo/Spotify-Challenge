import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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
