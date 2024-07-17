import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { getProfileInfos } from '../../../controller/profileController/profileController'
import { api } from '../../../service/api'

vi.mock('../../../service/api')

describe('profileController', () => {
  it('Should call the function getProfileInfos', async () => {
    const token = 'fakeToken'
    const mockData = { data: 'fakeData' }

    vi.mocked(api.get).mockResolvedValue(mockData)

    const response = await getProfileInfos(token)

    expect(api.get).toHaveBeenCalledWith('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    expect(response).toEqual(mockData)
  })
})
