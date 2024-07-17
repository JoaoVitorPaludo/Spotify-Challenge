import { Dialog, Pagination } from '@mui/material'

import { PiMusicNotesDuotone } from 'react-icons/pi'
import { ButtonComponent } from '../../components/Button/button'
import { ModalNewPlaylist } from './components/modalNewPlaylist/index.page'
import * as S from './styles'
import { usePlaylist } from './usePlaylist'

export function PlaylistPage() {
  const {
    handlePlaylistModal,
    playlistList,
    setHandlePlayListModal,
    handlePaginate,
    getPlaylist,
  } = usePlaylist()

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
        data-testid="playlist-modal"
        open={handlePlaylistModal}
        onClose={() => setHandlePlayListModal(false)}
      >
        <ModalNewPlaylist
          handleCloseModal={() => setHandlePlayListModal(false)}
          getPlaylist={() => getPlaylist(0)}
        />
      </Dialog>
      {playlistList?.items ? (
        <S.PlaylistPageList data-testid="playlist-list">
          {playlistList?.items?.map((playlistList) => (
            <S.PlaylistPageListItem key={playlistList.id}>
              {playlistList?.images?.length > 0 ? (
                <img src={playlistList.images[0].url} alt="Playlist Image" />
              ) : (
                <div className="no-image" data-testid="playlist-list-no-image">
                  <PiMusicNotesDuotone size={32} />
                </div>
              )}
              <S.PlaylistPageListLabel>
                <p>{playlistList.name}</p>
                <span>{playlistList.owner.display_name}</span>
              </S.PlaylistPageListLabel>
            </S.PlaylistPageListItem>
          ))}
        </S.PlaylistPageList>
      ) : (
        <S.PlaylistPageList data-testid="playlist-list-no-content">
          <S.PlaylistPageListItem>
            <S.SkeletonComponent width={4.5} height={4.5} borderSize="0" />
            <S.PlaylistPageListLabel>
              <S.SkeletonComponent width={7} height={1.5} borderSize="2" />
              <S.SkeletonComponent width={7} height={1.5} borderSize="2" />
            </S.PlaylistPageListLabel>
          </S.PlaylistPageListItem>
        </S.PlaylistPageList>
      )}
      <S.PlaylistPagination>
        <Pagination
          count={playlistList.total > 5 ? Math.ceil(playlistList.total / 5) : 1}
          color="secondary"
          shape="rounded"
          onChange={handlePaginate}
        />
      </S.PlaylistPagination>
    </S.PlaylistPageComponent>
  )
}
