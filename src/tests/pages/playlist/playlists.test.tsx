import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { PlaylistPage } from '../../../pages/playlist/index.page'
import { usePlaylist } from '../../../pages/playlist/usePlaylist'

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

// describe('PlaylistPage', () => {
//   it('Should pass the props to the modal component', async () => {
//     const { result } = renderHook(usePlaylist)
//     render(
//       <ModalNewPlaylist
//         getPlaylist={() => result.current.getPlaylist(0)}
//         handleCloseModal={() => result.current.setHandlePlayListModal(false)}
//       />,
//     )
//   })
// })

describe('PlaylistPage', () => {
  beforeEach(() => {
    vi.mock('../../../pages/playlist/usePlaylist', () => ({
      usePlaylist: vi.fn().mockReturnValue({
        playlistList: {
          total: 10,
          items: [
            {
              images: [
                {
                  url: 'http://example.com/image1.jpg',
                  height: 100,
                  width: 100,
                },
              ],
              name: 'test name',
              owner: {
                display_name: 'test owner',
              },
            },
          ],
        },
        setHandlePlayListModal: vi.fn(),
        getPlaylist: vi.fn(),
        handlePaginate: vi.fn(),
        handlePlaylistModal: vi.fn(),
      }),
    }))
  })

  it('Should render the playlist list if has data', async () => {
    render(<PlaylistPage />)

    await waitFor(() => {
      expect(screen.getByTestId('playlist-list')).toBeInTheDocument()
    })
  })

  it('Should render a message if the playlist list is empty', async () => {
    const mockData = {}
    vi.mocked(usePlaylist as jest.Mock).mockReturnValue({
      playlistList: mockData,
    })

    render(<PlaylistPage />)

    await waitFor(() => {
      expect(screen.getByTestId('playlist-list-no-content')).toBeInTheDocument()
    })
  })

  it('Should render no image content', async () => {
    const mockData = {
      total: 10,
      items: [
        {
          images: [],
          name: 'test name',
          owner: {
            display_name: 'test owner',
          },
        },
      ],
    }
    vi.mocked(usePlaylist as jest.Mock).mockReturnValue({
      playlistList: mockData,
    })
    render(<PlaylistPage />)

    await waitFor(() => {
      expect(screen.getByTestId('playlist-list-no-image')).toBeInTheDocument()
    })
  })
})
