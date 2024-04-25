import SpotifyLogo from '../../assets/spotify_logo_full.svg'
import * as S from './styles'
export function LoginPage() {
  return (
    <S.LoginContainer>
      <img src={SpotifyLogo} alt="" />
      <S.LoginTitle>
        Entra com sua conta Spotify clicando no botão abaixo
      </S.LoginTitle>
    </S.LoginContainer>
  )
}
