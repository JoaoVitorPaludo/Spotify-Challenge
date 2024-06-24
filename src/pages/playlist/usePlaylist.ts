import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { getPlaylistList } from '../../controller/playlistController/playlistController'
import { useTokenValidator } from '../../libs/zustand/globalStore'

interface PlaylistListItemProps {
  collaborative: boolean
  description: string
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: {
    height: number
    url: string
    width: number
  }[]
  name: string
  owner: {
    display_name: string
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    type: string
    uri: string
  }
  primary_color: string
  public: boolean
  snapshot_id: string
  tracks: {
    href: string
    total: number
  }
  type: string
  uri: string
}
interface PlaylistListProps {
  href: string
  limit: number
  next?: string
  offset: number
  previous?: string
  total: number
  items: PlaylistListItemProps[]
}
export const usePlaylist = () => {
  const [cookies, , removeCookie] = useCookies(['token'])
  const [handlePlaylistModal, setHandlePlayListModal] = useState<boolean>(false)
  const [playlistList, setPlaylistList] = useState<PlaylistListProps>(
    {} as PlaylistListProps,
  )
  const { validateStatus } = useTokenValidator()

  async function getPlaylist(offset?: number) {
    try {
      const { data } = await getPlaylistList(cookies.token, 5, offset || 0)
      setPlaylistList(data)
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
    const newValue = value - 1
    getPlaylist(newValue * 5)
  }
  useEffect(() => {
    getPlaylist()
  }, [])
  return {
    setHandlePlayListModal,
    handlePlaylistModal,
    playlistList,
    handlePaginate,
    getPlaylist,
  }
}
