import { ButtonComponent } from '../../components/Button/button'
import * as S from './styles'
import { useProfile } from './useProfile'

export function ProfilePage() {
  const { profileList, removeCookie } = useProfile()
  return (
    <S.ProfilePageComponent>
      <img src={profileList?.images?.[0]?.url} alt="profile" />{' '}
      <p>{profileList?.display_name}</p>
      <ButtonComponent text="Sair" onClick={() => removeCookie('token')} />
    </S.ProfilePageComponent>
  )
}
