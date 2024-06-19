import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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

describe('ArtistsPage', () => {
  it('Should render the ArtistsPageList', () => {
    render(<ArtistsPage />)
    expect(screen.queryByRole('artists-page-list')).not.toBeInTheDocument()
  })
})
