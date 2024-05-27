import { Dialog, Pagination } from '@mui/material'

import { ButtonComponent } from '../../components/Button/button'
import { ModalNewPlaylist } from './components/modalNewPlaylist/index.page'
import * as S from './styles'
import { usePlaylist } from './usePlaylist'

export function PlaylistPage() {
  const {
    handlePlaylistModal,
    playlistList,
    setHandlePlayListModal,
    handlePagenate,
  } = usePlaylist()
  console.log(Math.round(5 / 5))
  console.log('playlistList', playlistList.total)
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
      {playlistList?.items ? (
        <>
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
        </>
      ) : (
        <S.PlaylistPageList>
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
          count={
            playlistList.total > 5 ? Math.round(playlistList.total / 5) : 1
          }
          color="secondary"
          shape="rounded"
          onChange={handlePagenate}
        />
      </S.PlaylistPagination>
    </S.PlaylistPageComponent>
  )
}
