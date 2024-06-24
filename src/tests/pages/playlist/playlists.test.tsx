import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { ModalNewPlaylist } from '../../../pages/playlist/components/modalNewPlaylist/index.page'
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

describe('PlaylistPage', () => {
  it('Should pass the props to the modal component', () => {
    const getPlaylist = vi.fn()
    const handleCloseModal = vi.fn()
    render(
      <ModalNewPlaylist
        getPlaylist={getPlaylist}
        handleCloseModal={handleCloseModal}
      />,
    )

    expect(screen.queryByText('Dê um nome a sua playlist')).toBeInTheDocument()
  })
})
