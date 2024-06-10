import { useContext } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { ArtistContext } from '../../../../contexts/artistContext/artistContext'
import * as S from './styles'
export function AlbumsPage() {
  const { albumsList, artistContent } = useContext(ArtistContext)
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
    </S.AlbumsPageContainer>
  )
}
