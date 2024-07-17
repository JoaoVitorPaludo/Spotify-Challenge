import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { getRecentPlayedTracks } from '../../controller/homeController/homeController'
import { useTokenValidator } from '../../libs/zustand/globalStore'

interface RecentPlayedTracksProps {
  track: {
    name: string
    id: string
    album: {
      images: {
        url: string
        height: number
        width: number
      }[]
      name: string
    }
  }
}
export const useHome = () => {
  const [cookies, , removeCookie] = useCookies(['token'])
  const { validateStatus } = useTokenValidator()
  const [recentPlayedTracks, setRecentPlayedTracks] = useState<
    RecentPlayedTracksProps[]
  >([])
  async function handleGetRecentPlayedTracks() {
    try {
      const { data } = await getRecentPlayedTracks(cookies.token)
      setRecentPlayedTracks(data.items)
    } catch (error) {
      if (error instanceof AxiosError) {
        validateStatus(error.response!.status, removeCookie)
      }
    }
  }

  useEffect(() => {
    handleGetRecentPlayedTracks()
  }, [])
  return {
    recentPlayedTracks,
  }
}
