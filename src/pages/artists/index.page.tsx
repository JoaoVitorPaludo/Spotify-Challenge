import * as S from './styles'
export function ArtistsPage() {
  return (
    <S.ArtistsPageComponent>
      <h1>Top Artistas</h1>
      <p>Aqui você encontra seus artistas preferidos</p>

      <S.ArtistsPageList>
        <S.ArtistsPageListItem>
          <img
            src="https://avatars.githubusercontent.com/u/83378081?v=4"
            alt=""
          />
          <span>Black Alien</span>
        </S.ArtistsPageListItem>
        <S.ArtistsPageListItem>
          <img
            src="https://avatars.githubusercontent.com/u/83378081?v=4"
            alt=""
          />
          <span>Black Alien</span>
        </S.ArtistsPageListItem>
        <S.ArtistsPageListItem>
          <img
            src="https://avatars.githubusercontent.com/u/83378081?v=4"
            alt=""
          />
          <span>Black Alien</span>
        </S.ArtistsPageListItem>
      </S.ArtistsPageList>
    </S.ArtistsPageComponent>
  )
}
