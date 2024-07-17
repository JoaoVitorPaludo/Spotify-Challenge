import '@testing-library/jest-dom'
import { act, renderHook, waitFor } from '@testing-library/react'
import { AxiosError } from 'axios'
import { describe, vi } from 'vitest'
import { getArtistsList } from '../../../controller/artistsController/artistsController'
import { useArtists } from '../../../pages/artists/useArtists'

vi.mock('../../../controller/artistsController/artistsController')

describe('useArtists', () => {
  it('should get artist info on start', async () => {
    const mockData = {
      items: [
        {
          external_urls: {
            spotify: 'http://spotify.com',
          },
          followers: {
            href: 'http://spotify.com',
            total: 10,
          },
          href: 'http://spotify.com',
          id: '01',
          images: [
            {
              height: 10,
              url: 'http://spotify.com',
              width: 10,
            },
          ],
          name: 'name test',
          popularity: 10,
          type: 'type test',
          uri: 'uri test',
        },
      ],
      total: 10,
    }

    ;(getArtistsList as jest.Mock).mockResolvedValue({ data: mockData })

    const { result } = renderHook(() => useArtists())
    await waitFor(() => {
      expect(result.current.artistList).toEqual(mockData)
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

    ;(getArtistsList as jest.Mock).mockRejectedValue(mockError)
    const { result } = renderHook(() => useArtists())

    await waitFor(() => {
      expect(result.current.artistList).toEqual(mockData)
    })
  })
  it('Should return a error', async () => {
    const mockError = new Error('Unexpected error')

    ;(getArtistsList as jest.Mock).mockRejectedValue(mockError)
    const { result } = renderHook(() => useArtists())
    await waitFor(() => expect(result.current.artistList).toEqual({}))
  })
})

describe('useArtists', () => {
  it('Should call handlePaginate ', async () => {
    const { result } = renderHook(() => useArtists())

    await act(async () => {
      const event: React.ChangeEvent<unknown> = new Event('change') as any
      result.current.handlePaginate(event, 1)
    })
  })
})
