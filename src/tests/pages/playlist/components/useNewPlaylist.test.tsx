import '@testing-library/jest-dom'
import { act, renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
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
})
