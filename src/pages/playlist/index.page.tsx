import { ButtonComponent } from '../../components/Button/button'
import * as S from './styles'
export function PlaylistPage() {
  return (
    <S.PlaylistPageComponent>
      <S.PlaylistPageHeader>
        <S.PlaylistPageTitles>
          <h1>Minhas Playlists</h1>
          <p>Sua coleção pessoal de playlists</p>
        </S.PlaylistPageTitles>
        <ButtonComponent text="Criar playlist" />
      </S.PlaylistPageHeader>
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
