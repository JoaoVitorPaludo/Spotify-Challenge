import { useNavigate } from 'react-router-dom'
import SpotifyLogo from '../../assets/spotify_logo_full.svg'
import { ButtonComponent } from '../../components/Button/button'
import * as S from './styles'
export function LoginPage() {
  const navigate = useNavigate()
  return (
    <S.LoginContainer>
      <img src={SpotifyLogo} alt="" />
      <S.LoginTitle>
        Entre com a sua conta Spotify clicando no botão abaixo
      </S.LoginTitle>
      <ButtonComponent
        text="Entrar"
        size={50}
        onClick={() => navigate('/home')}
      />
    </S.LoginContainer>
  )
}
