import { Dialog } from '@mui/material'

import { useState } from 'react'
import { ButtonComponent } from '../../components/Button/button'
import { ModalNewPlaylist } from './components/modalNewPlaylist/index.page'
import * as S from './styles'

export function PlaylistPage() {
  const [handlePlaylistModal, setHandlePlayListModal] = useState<boolean>(false)

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
        <S.PlaylistPageListItem>
          <img
            src="https://avatars.githubusercontent.com/u/83378081?v=4"
            alt=""
          />
          <S.PlaylistPageListLabel>
            <p>pré treino natural</p>
            <span>jeskagrecco</span>
          </S.PlaylistPageListLabel>
        </S.PlaylistPageListItem>
        <S.PlaylistPageListItem>
          <img
            src="https://avatars.githubusercontent.com/u/83378081?v=4"
            alt=""
          />
          <S.PlaylistPageListLabel>
            <p>pré treino natural</p>
            <span>jeskagrecco</span>
          </S.PlaylistPageListLabel>
        </S.PlaylistPageListItem>
      </S.PlaylistPageList>
    </S.PlaylistPageComponent>
  )
}
