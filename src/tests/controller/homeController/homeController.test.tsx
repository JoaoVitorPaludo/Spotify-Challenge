import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { getRecentPlayedTracks } from '../../../controller/homeController/homeController'
import { api } from '../../../service/api'

vi.mock('../../../service/api')

describe('homeController', () => {
  it('Should call the function getRecentPlayedTracks ', async () => {
    const token = 'fakeToken'
    const mockData = { data: 'fakeData' }

    vi.mocked(api.get).mockResolvedValue(mockData)

    const response = await getRecentPlayedTracks(token)

    expect(api.get).toHaveBeenCalledWith(
      'https://api.spotify.com/v1/me/player/recently-played?limit=5',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    expect(response).toEqual(mockData)
  })
})
