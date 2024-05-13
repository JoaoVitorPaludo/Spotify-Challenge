import { Dialog } from '@mui/material'

import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { ButtonComponent } from '../../components/Button/button'
import { getPlaylistList } from '../../controller/playlistController/playlistController'
import { ModalNewPlaylist } from './components/modalNewPlaylist/index.page'
import * as S from './styles'

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

export function PlaylistPage() {
  const [handlePlaylistModal, setHandlePlayListModal] = useState<boolean>(false)
  const [playlistList, setPlaylistList] = useState<PlaylistListProps>(
    {} as PlaylistListProps,
  )
  const [cookies] = useCookies(['token'])
  async function getPlaylist() {
    try {
      const { data } = await getPlaylistList(cookies.token)
      setPlaylistList(data)
      console.log(data)
    } catch (err) {}
  }

  useEffect(() => {
    getPlaylist()
  }, [])

  return (
    <S.PlaylistPageComponent>
      <S.PlaylistPageHeader>
        <S.PlaylistPageTitles>
          <h1>Minhas Playlists</h1>
          <p>Sua coleção pessoal de playlists</p>
        </S.PlaylistPageTitles>
        <ButtonComponent
          text="Criar playlist"
          onClick={() => setHandlePlayListModal(true)}
        />
      </S.PlaylistPageHeader>
      <Dialog
        open={handlePlaylistModal}
        onClose={() => setHandlePlayListModal(false)}
      >
        <ModalNewPlaylist
          handleCloseModal={() => setHandlePlayListModal(false)}
        />
      </Dialog>
      <S.PlaylistPageList>
        {playlistList?.items?.map((playlistList) => (
          <S.PlaylistPageListItem key={playlistList.id}>
            <img src={playlistList.images[0].url} alt="Playlist Image" />
            <S.PlaylistPageListLabel>
              <p>{playlistList.name}</p>
              <span>{playlistList.owner.display_name}</span>
            </S.PlaylistPageListLabel>
          </S.PlaylistPageListItem>
        ))}
      </S.PlaylistPageList>
    </S.PlaylistPageComponent>
  )
}
