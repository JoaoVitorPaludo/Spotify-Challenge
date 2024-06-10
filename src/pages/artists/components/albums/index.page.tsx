import { Pagination } from '@mui/material'
import { FaArrowLeft } from 'react-icons/fa'
import * as S from './styles'
import { useArtists } from './useAlbums'
export function AlbumsPage() {
  const { albumsList, artistContent, handlePaginate } = useArtists()
  console.log(albumsList)
  return (
    <S.AlbumsPageContainer>
      <S.AlbumsPageHeader>
        <S.AlbumsPageTitle>
          <FaArrowLeft size={16} onClick={() => window.history.back()} />
          {artistContent.name}
        </S.AlbumsPageTitle>
        <img src={artistContent.image} alt="" />
      </S.AlbumsPageHeader>
      <S.AlbumsPageMain>
        {albumsList?.items?.map((album) => {
          return (
            <S.AlbumsPageItem key={album.id}>
              <img src={album?.images[0].url} alt="" />
              <S.AlbumsPageItemInfos>
                <span>{album.name}</span>
                <p>{album.release_date}</p>
              </S.AlbumsPageItemInfos>
            </S.AlbumsPageItem>
          )
        })}
      </S.AlbumsPageMain>
      <S.AlbumsPagePagination>
        <Pagination
          count={albumsList.total > 5 ? Math.ceil(albumsList.total / 5) : 1}
          color="secondary"
          shape="rounded"
          onChange={handlePaginate}
        />
      </S.AlbumsPagePagination>
    </S.AlbumsPageContainer>
  )
}
