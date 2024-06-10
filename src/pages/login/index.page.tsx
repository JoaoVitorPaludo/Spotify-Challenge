import SpotifyLogo from '../../assets/spotify_logo_full.svg'
import { ButtonComponent } from '../../components/Button/button'
import * as S from './styles'
export function LoginPage() {
  function handleAuthPage() {
    // window.location.href = `${import.meta.env.VITE_API_URL}/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=http://localhost:5174/callback&response_type=code`
    window.location.href = `${import.meta.env.VITE_API_URL}/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=http://localhost:5174/callback&response_type=code&scope=user-top-read playlist-modify-public playlist-modify-private user-read-recently-played`
  }
  return (
    <S.LoginContainer>
      <img src={SpotifyLogo} alt="" />
      <S.LoginTitle>
        Entre com a sua conta Spotify clicando no botão abaixo
      </S.LoginTitle>
      <ButtonComponent
        text="Entrar"
        size={50}
        onClick={() => handleAuthPage()}
      />
    </S.LoginContainer>
  )
}
