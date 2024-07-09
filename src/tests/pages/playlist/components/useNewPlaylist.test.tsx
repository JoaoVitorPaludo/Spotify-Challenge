import '@testing-library/jest-dom'
import { act, renderHook, waitFor } from '@testing-library/react'
import { AxiosError } from 'axios'
import { vi } from 'vitest'
import { postNewPlaylist } from '../../../../controller/playlistController/playlistController'
import { useNewPlaylist } from '../../../../pages/playlist/components/modalNewPlaylist/useNewPlaylist'

const dataForm = {
  name: 'test name',
}
vi.mock('api', () => ({
  get: vi.fn(() => Promise.resolve({ data: {} })),
}))
vi.mock('../../../../controller/playlistController/playlistController')

describe('useNewPlaylist', () => {
  it('Should execute the function handleSubmitForm ', async () => {
    const handleCloseModal = vi.fn()
    const getPlaylist = vi.fn()
    const { result } = renderHook(() =>
      useNewPlaylist({
        getPlaylist,
        handleCloseModal,
      }),
    )
    act(() => {
      result.current.handleSubmitForm(dataForm)
    })
    await waitFor(() => expect(getPlaylist).not.toHaveBeenCalled())
  })
  it('Should return a error', async () => {
    const mockError = new Error('Unexpected error')

    ;(postNewPlaylist as jest.Mock).mockRejectedValue(mockError)
    const handleCloseModal = vi.fn()
    const getPlaylist = vi.fn()
    const { result } = renderHook(() =>
      useNewPlaylist({
        getPlaylist,
        handleCloseModal,
      }),
    )
    act(() => {
      result.current.handleSubmitForm(dataForm)
    })
  })
  it('Should return an error if the token is invalid', async () => {
    const mockError = new AxiosError(
      'Unexpected error',
      '401',
      undefined,
      undefined,
      {
        data: {},
        status: 401,
        headers: {},
        config: {
          headers: 'Content-Type: application/json' as any,
        },
        statusText: 'Unauthorized',
        request: {},
      },
    )

    ;(postNewPlaylist as jest.Mock).mockRejectedValue(mockError)

    const handleCloseModal = vi.fn()
    const getPlaylist = vi.fn()
    const { result } = renderHook(() =>
      useNewPlaylist({
        getPlaylist,
        handleCloseModal,
      }),
    )

    act(() => {
      result.current.handleSubmitForm(dataForm)
    })
  })
  // it('Should render the border error on input', async () => {
  //   const handleCloseModal = vi.fn()
  //   const getPlaylist = vi.fn()

  //   const { result } = renderHook(() =>
  //     useNewPlaylist({ handleCloseModal, getPlaylist }),
  //   )

  //   render(
  //     <ThemeProvider theme={defaultTheme}>
  //       <ModalNewPlaylist
  //         handleCloseModal={handleCloseModal}
  //         getPlaylist={getPlaylist}
  //       />
  //     </ThemeProvider>,
  //   )
  //   const input = screen.getByTestId('input-playlist-test')

  //   await act(async () => {
  //     result.current.methods.setError('name', {
  //       message: 'String must contain at least 1 character(s)',
  //       type: 'min',
  //     })
  //     fireEvent.change(input, { target: { value: '' } })
  //     fireEvent.blur(input)
  //     fireEvent.click(screen.getByTestId('input-playlist-test'))
  //   })

  //   await waitFor(() => {
  //     console.log(result.current.methods.formState.errors)

  //     const borderColor = window.getComputedStyle(input).borderBottomColor
  //     console.log(borderColor)
  //     expect(borderColor).toBe('rgba(255, 255, 255, 0.2)')
  //   })
  // })
})
