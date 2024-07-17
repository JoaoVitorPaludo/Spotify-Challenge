import '@testing-library/jest-dom'
import { vi } from 'vitest'
import * as endpoint from '../../../controller/playlistController/playlistController'
import { api } from '../../../service/api'

vi.mock('../../../service/api')
describe('playlistController', () => {
  it('Should call the function getPlaylistList', async () => {
    const token = 'fakeToken'
    const limit = 10
    const offset = 0
    const mockData = { data: 'fakeData' }
    vi.mocked(api.get).mockResolvedValue(mockData)

    const response = await endpoint.getPlaylistList(token, limit, offset)

    expect(api.get).toHaveBeenCalledWith(
      `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    expect(response).toEqual(mockData)
  })
  it('Should call the function getUserId', async () => {
    const token = 'fakeToken'

    const mockData = { data: 'fakeData' }
    vi.mocked(api.get).mockResolvedValue(mockData)

    const response = await endpoint.getUserId(token)

    expect(api.get).toHaveBeenCalledWith(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response).toEqual(mockData)
  })

  it('Should call the function postNewPlaylist', async () => {
    const token = 'fakeToken'
    const name = {
      name: 'fakeName',
    }
    const userId = 'fakeUserId'
    const mockData = { data: 'fakeData' }
    vi.mocked(api.post).mockResolvedValue(mockData)

    const response = await endpoint.postNewPlaylist(name, token, userId)

    expect(api.post).toHaveBeenCalledWith(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        ...name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    expect(response).toEqual(mockData)
  })
})
