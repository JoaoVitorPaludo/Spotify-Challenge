import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { getArtistsList } from '../../controller/artistsController/artistsController'
import { useTokenValidator } from '../../libs/zustand/globalStore'

export interface ItemsProps {
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
}
interface ArtistListProps {
  items: ItemsProps[]
  total: number
}
export const useArtists = () => {
  const [cookies, , removeCookie] = useCookies(['token'])
  const [artistList, setArtistList] = useState<ArtistListProps>(
    {} as ArtistListProps,
  )
  const { validateStatus } = useTokenValidator()
  useEffect(() => {
    getTopArtistsList()
  }, [])

  async function getTopArtistsList(offset?: number) {
    try {
      const { data } = await getArtistsList(cookies.token, 5, offset || 0)
      setArtistList(data)
    } catch (error) {
      if (error instanceof AxiosError) {
        validateStatus(error.response!.status, removeCookie)
      }
    }
  }

  async function handlePaginate(
    event: React.ChangeEvent<unknown>,
    value: number,
  ) {
    console.log(event)

    const newValue = value - 1
    getTopArtistsList(newValue * 5)
  }

  return {
    handlePaginate,
    artistList,
    getTopArtistsList,
  }
}
