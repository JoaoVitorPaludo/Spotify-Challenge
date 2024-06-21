import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { PlaylistPage } from '../../../pages/playlist/index.page'

describe('PlaylistPage', () => {
  it('Should render the PlaylistPage', () => {
    render(<PlaylistPage />)
  })

  it('Should click the button', () => {
    render(<PlaylistPage />)

    fireEvent.click(screen.getByText('Criar playlist'))
    expect(screen.getByText('Criar playlist')).toBeInTheDocument()
  })
})
