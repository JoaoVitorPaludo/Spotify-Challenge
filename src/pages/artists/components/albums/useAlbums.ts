import { AxiosError } from 'axios'
import { useContext } from 'react'
import { useCookies } from 'react-cookie'
import { ArtistContext } from '../../../../contexts/artistContext/artistContext'
import { getAlbums } from '../../../../controller/artistsController/artistsController'
import { useTokenValidator } from '../../../../libs/zustand/globalStore'

export const useAlbums = () => {
  const { albumsList, artistContent, setAlbumsList } = useContext(ArtistContext)
  const [cookies, , removeCookie] = useCookies(['token'])
  const { validateStatus } = useTokenValidator()

  async function handleGetAlbum(offset?: number) {
    try {
      const { data } = await getAlbums(
        cookies.token,
        artistContent.id,
        5,
        offset || 0,
      )
      console.log(data)
      setAlbumsList(data)
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
    await handleGetAlbum(newValue)
  }

  return {
    handlePaginate,
    albumsList,
    artistContent,
    handleGetAlbum,
  }
}
