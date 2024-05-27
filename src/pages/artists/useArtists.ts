import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { getArtistsList } from '../../controller/artistsController/artistsController'

interface ArtistListProps {
  items: {
    external_urls: {
      spotify: string
    }
    followers: {
      href: string
      total: number
    }
    genres: []
    href: string
    id: string
    images: {
      height: number
      url: string
      width: number
    }[]
    name: string
    popularity: number
    type: string
    uri: string
  }[]
  total: number
}
export const useArtists = () => {
  const [cookies] = useCookies(['token'])
  const [artistList, setArtistList] = useState<ArtistListProps>(
    {} as ArtistListProps,
  )
  useEffect(() => {
    getTopArtistsList()
  }, [])

  async function getTopArtistsList(offset?: number) {
    try {
      const { data } = await getArtistsList(cookies.token, 5, offset || 0)
      setArtistList(data)
    } catch (error) {}
  }

  async function handlePagenate(
    event: React.ChangeEvent<unknown>,
    value: number,
  ) {
    const newValue = value - 1
    getTopArtistsList(newValue * 5)
  }

  return {
    handlePagenate,
    artistList,
  }
}
