import { Dialog } from '@mui/material'

import { ButtonComponent } from '../../components/Button/button'
import { ModalNewPlaylist } from './components/modalNewPlaylist/index.page'
import * as S from './styles'
import { usePlaylist } from './usePlaylist'

export function PlaylistPage() {
  const { handlePlaylistModal, playlistList, setHandlePlayListModal } =
    usePlaylist()

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
