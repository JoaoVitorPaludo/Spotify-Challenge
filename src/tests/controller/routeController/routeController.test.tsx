import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { getAccessToken } from '../../../controller/routeController/routeController'
import { api } from '../../../service/api'

vi.mock('../../../service/api')

describe('routeController', () => {
  it('Should call the function getAccessToken', async () => {
    const code = 'fakeCode'
    const mockData = { data: 'fakeData' }

    vi.mocked(api.post).mockResolvedValue(mockData)

    const response = await getAccessToken(code)

    expect(api.post).toHaveBeenCalledWith(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${import.meta.env.VITE_REDIRECT_URL}`,
        scope: 'user-top-read playlist-modify-public playlist-modify-private',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(
            `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`,
          )}`,
        },
      },
    )

    expect(response).toEqual(mockData)
  })
})
