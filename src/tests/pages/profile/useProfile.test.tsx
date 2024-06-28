import '@testing-library/jest-dom'

import { renderHook, waitFor } from '@testing-library/react'
import { AxiosError } from 'axios'
import { vi } from 'vitest'
import { getProfileInfos } from '../../../controller/profileController/profileController'
import { useProfile } from '../../../pages/profile/useProfile'
vi.mock('../../../controller/profileController/profileController')

describe('useProfile', () => {
  it('should get profile info on start', async () => {
    const mockData = {
      display_name: 'Test',
      external_urls: {
        spotify: 'https://open.spotify.com/user/123',
      },
      href: 'https://api.spotify.com/v1/users/123',
      id: '123',
      images: [{ url: 'image_url', height: 10, width: 10 }],
      type: 'user',
      uri: 'spotify:user:123',
      followers: {
        href: 'https://api.spotify.com/v1/users/123/followers',
        total: 123,
      },
    }

    ;(getProfileInfos as jest.Mock).mockResolvedValue({ data: mockData })

    const { result } = renderHook(() => useProfile())
    await waitFor(() => {
      expect(result.current.profileList).toEqual(mockData)
    })
  })

  it('Should remove cookie if has as error', async () => {
    const mockData = {}
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
    ;(getProfileInfos as jest.Mock).mockRejectedValue(mockError)
    const { result } = renderHook(() => useProfile())
    await waitFor(() => expect(result.current.profileList).toEqual(mockData))
  })
})
