import { ReactNode, createContext, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { getAlbums } from '../../controller/artistsController/artistsController'
import { ItemsProps } from '../../pages/artists/useArtists'

interface ArtistContentProps {
  name: string
  image: string
  id: string
}
interface AlbumsListProps {
  items: {
    images: {
      height: number
      url: string
      width: number
    }[]
    name: string
    release_date: string
    id: string
  }[]
  total: number
}
interface ArtistContextProps {
  handleGetAlbum: (id: ItemsProps) => void
  albumsList: AlbumsListProps
  artistContent: ArtistContentProps
  setAlbumsList: React.Dispatch<React.SetStateAction<AlbumsListProps>>
}
export const ArtistContext = createContext({} as ArtistContextProps)

interface ArtistProviderProps {
  children: ReactNode
}

export function ArtistProvider({ children }: ArtistProviderProps) {
  const navigate = useNavigate()
  const [cookies] = useCookies(['token'])
  const [albumsList, setAlbumsList] = useState({} as AlbumsListProps)
  const [artistContent, setArtistContent] = useState({} as ArtistContentProps)

  async function handleGetAlbum(artist: ItemsProps, offset?: number) {
    setArtistContent({
      name: artist.name,
      image: artist?.images?.[0].url,
      id: artist.id,
    })
    try {
      const { data } = await getAlbums(cookies.token, artist.id, 5, offset || 0)
      setAlbumsList(data)
      navigate('/artists/albums')
    } catch (error) {}
  }
  return (
    <ArtistContext.Provider
      value={{
        handleGetAlbum,
        albumsList,
        artistContent,
        setAlbumsList,
      }}
    >
      {children}
    </ArtistContext.Provider>
  )
}
