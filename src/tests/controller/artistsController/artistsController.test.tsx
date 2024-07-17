import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'
import * as endpoint from '../../../controller/artistsController/artistsController'
import { api } from '../../../service/api'

vi.mock('../../../service/api')
describe('getArtistsList', () => {
  it('Should call the function getArtistsList', async () => {
    const token = 'fakeToken'
    const limit = 10
    const offset = 0
    const mockData = { data: 'fakeData' }

    vi.mocked(api.get).mockResolvedValue(mockData)

    const response = await endpoint.getArtistsList(token, limit, offset)

    expect(api.get).toHaveBeenCalledWith(
      `https://api.spotify.com/v1/me/top/artists?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    expect(response).toEqual(mockData)
  })

  it('Should call the function getAlbums', async () => {
    const spotifyId = '01'
    const token = 'fakeToken'
    const limit = 10
    const offset = 0
    const mockData = { data: 'fakeData' }

    vi.mocked(api.get).mockResolvedValue(mockData)

    const response = await endpoint.getAlbums(token, spotifyId, limit, offset)

    expect(api.get).toHaveBeenCalledWith(
      `https://api.spotify.com/v1/artists/${spotifyId}/albums?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    expect(response).toEqual(mockData)
  })
})
