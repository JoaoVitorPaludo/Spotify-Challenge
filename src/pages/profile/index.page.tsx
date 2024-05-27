import { ButtonComponent } from '../../components/Button/button'
import * as S from './styles'
import { useProfile } from './useProfile'

export function ProfilePage() {
  const { profileList, removeCookie } = useProfile()
  return (
    <S.ProfilePageComponent>
      {profileList.id !== undefined ? (
        <>
          <img src={profileList?.images?.[0]?.url} alt="profile" />
          <p>{profileList?.display_name}</p>
          <ButtonComponent text="Sair" onClick={() => removeCookie('token')} />
        </>
      ) : (
        <>
          <S.SkeletonComponent borderSize="4" width={8} height={8} />
          <S.SkeletonComponent borderSize="1.5" width={8} height={2.625} />
        </>
      )}
    </S.ProfilePageComponent>
  )
}
