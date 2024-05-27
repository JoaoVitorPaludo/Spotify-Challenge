import { Pagination } from '@mui/material'
import * as S from './styles'
import { useArtists } from './useArtists'
export function ArtistsPage() {
  const { artistList, handlePagenate } = useArtists()
  return (
    <S.ArtistsPageComponent>
      <h1>Top Artistas</h1>
      <p>Aqui você encontra seus artistas preferidos</p>
      {artistList?.items ? (
        <S.ArtistsPageList>
          {artistList?.items?.map((artist) => (
            <S.ArtistsPageListItem key={artist.id}>
              <img src={artist.images[0].url} alt="" />
              <span>{artist.name}</span>
            </S.ArtistsPageListItem>
          ))}
        </S.ArtistsPageList>
      ) : (
        <S.ArtistsPageList>
          <S.ArtistsPageListItem>
            <S.SkeletonComponent width={4} height={4} borderSize="50" />
            <S.SkeletonComponent width={8} height={1.2} borderSize="2" />
          </S.ArtistsPageListItem>
        </S.ArtistsPageList>
      )}
      <S.ArtistsPagePagination>
        <Pagination
          count={artistList.total > 5 ? Math.ceil(artistList.total / 5) : 1}
          color="secondary"
          shape="rounded"
          onChange={handlePagenate}
        />
      </S.ArtistsPagePagination>
    </S.ArtistsPageComponent>
  )
}
