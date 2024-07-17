import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { AxiosError } from 'axios'
import { useContext, useEffect } from 'react'
import { describe, vi } from 'vitest'
import {
  ArtistContext,
  ArtistProvider,
} from '../../../contexts/artistContext/artistContext'
import { getAlbums } from '../../../controller/artistsController/artistsController'
import { ItemsProps } from '../../../pages/artists/useArtists'
vi.mock('../../../controller/artistsController/artistsController', () => ({
  getArtistsList: vi.fn().mockResolvedValue({}),
  getAlbums: vi.fn().mockResolvedValue({}),
}))

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}))
vi.mock('../../../libs/zustand/globalStore', () => ({
  useTokenValidator: () => ({ validateStatus: vi.fn() }),
}))
interface TestComponentProps {
  artist: ItemsProps
}
const TestComponent = ({ artist }: TestComponentProps) => {
  const { handleGetAlbum } = useContext(ArtistContext)

  useEffect(() => {
    handleGetAlbum(artist)
  }, [])

  return <div>{/* Test render */}</div>
}
describe('ArtistContext', () => {
  it('should call handleGetAlbum and update state and navigate', async () => {
    const artist = {
      external_urls: {
        spotify: 'test track',
      },
      followers: {
        href: 'test href',
        total: 1,
      },
      genres: [],
      href: 'test href',
      id: 'test id',
      images: [
        {
          height: 10,
          url: 'test url',
          width: 10,
        },
      ],
      name: 'test name',
      popularity: 1,
      type: 'test type',
      uri: 'test uri',
    } as ItemsProps
    render(
      <ArtistProvider>
        <TestComponent artist={artist} />
      </ArtistProvider>,
    )
  })
  it('Should render an error if the request fails', async () => {
    const artist = {
      external_urls: { spotify: 'test track' },
      followers: { href: 'test href', total: 1 },
      genres: [],
      href: 'test href',
      id: 'test id',
      images: [{ height: 10, url: 'test url', width: 10 }],
      name: 'test name',
      popularity: 1,
      type: 'test type',
      uri: 'test uri',
    } as ItemsProps

    const axiosError = new AxiosError(
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

    ;(getAlbums as jest.Mock).mockRejectedValue(axiosError)

    render(
      <ArtistProvider>
        <TestComponent artist={artist} />
      </ArtistProvider>,
    )
  })
})
