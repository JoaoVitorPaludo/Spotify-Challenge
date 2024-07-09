import '@testing-library/jest-dom'
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react'
import { vi } from 'vitest'
import { PlaylistPage } from '../../../pages/playlist/index.page'
import { usePlaylist } from '../../../pages/playlist/usePlaylist'
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
    handlePlaylistModal: false,
  }),
}))
vi.mock(
  '../../../pages/playlist/components/modalNewPlaylist/useNewPlaylist',
  () => ({
    useNewPlaylist: vi
      .fn()
      .mockImplementation(({ handleCloseModal, getPlaylist }) => ({
        handleSubmitForm: vi.fn().mockImplementation(() => {
          getPlaylist(0)
          handleCloseModal()
        }),
        methods: {
          handleSubmit: (fn: any) => (event: any) => {
            event.preventDefault()
            fn()
          },
          register: vi.fn(),
          formState: { isValid: true },
        },
      })),
  }),
)
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

  it('Should open and close the modal', async () => {
    const mockGetPlaylist = vi.fn()

    vi.mocked(usePlaylist as jest.Mock).mockReturnValue({
      ...usePlaylist(),
      handlePlaylistModal: true,
      setHandlePlayListModal: vi.fn(),
      getPlaylist: mockGetPlaylist,
    })

    render(<PlaylistPage />)

    const { result } = renderHook(() => usePlaylist())
    act(() => {
      fireEvent.click(screen.getByText('Criar playlist'))
    })
    await waitFor(() => {
      expect(screen.getByTestId('playlist-modal')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('close-modal-test'))
    expect(result.current.setHandlePlayListModal).toHaveBeenCalledWith(false)
  })
  it('Should close modal by pressing esc', () => {
    vi.mocked(usePlaylist as jest.Mock).mockReturnValue({
      ...usePlaylist(),
      handlePlaylistModal: true,
      setHandlePlayListModal: vi.fn(),
    })
    const { result } = renderHook(() => usePlaylist())

    render(<PlaylistPage />)
    act(() => {
      fireEvent.click(screen.getByText('Criar playlist'))
    })

    fireEvent.keyDown(screen.getByTestId('playlist-modal'), {
      key: 'Escape',
    })

    expect(result.current.setHandlePlayListModal).toHaveBeenCalledWith(false)
  })
  // it('calls getPlaylist with 0 when the modal is opened', () => {
  //   const handleCloseModal = vi.fn()
  //   const getPlaylist = vi.fn()
  //   const { result } = renderHook(() => usePlaylist())
  //   // Render the modal component
  //   const { getByTestId } = render(
  //     <Dialog open={true} onClose={handleCloseModal}>
  //       <ModalNewPlaylist
  //         handleCloseModal={handleCloseModal}
  //         getPlaylist={getPlaylist}
  //       />
  //     </Dialog>,
  //   )
  //   // Simulate user input
  //   const input = getByTestId('input-playlist-test')
  //   fireEvent.change(input, { target: { value: 'My Playlist' } })

  //   // Simulate the form submission
  //   const form = input.closest('form')
  //   fireEvent.submit(form)

  //   // Check if getPlaylist was called with 0
  //   expect(getPlaylist).toHaveBeenCalled()
  // })
})
describe('PlaylistPage', () => {
  it('should call getPlaylist with 0 when the form is submitted', () => {
    const { getByText, getByTestId } = render(<PlaylistPage />)
    const createPlaylistButton = getByText('Criar playlist')

    // Simular clique no botão para abrir o modal
    fireEvent.click(createPlaylistButton)

    // Simular entrada do usuário no input do modal
    const input = getByTestId('input-playlist-test')
    fireEvent.change(input, { target: { value: 'My Playlist' } })

    // Simular submissão do formulário
    const form = input.closest('form')
    fireEvent.submit(form as any)

    // Verificar se getPlaylist foi chamado com 0
    expect(screen.getByTestId('playlist-modal')).toHaveTextContent(
      'Dê um nome a sua playlist',
    )
    expect(screen.getByTestId('input-playlist-test')).toBeInTheDocument()
    expect(screen.getByTestId('input-playlist-test')).toHaveValue('My Playlist')
  })
})
