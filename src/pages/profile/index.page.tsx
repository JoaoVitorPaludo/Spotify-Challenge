import { ButtonComponent } from '../../components/Button/button'
import * as S from './styles'
export function ProfilePage() {
  return (
    <S.ProfilePageComponent>
      <img src="https://avatars.githubusercontent.com/u/83378081?v=4" alt="" />
      <p>João Vitor Primieri Paludo</p>
      <ButtonComponent text="Sair" />
    </S.ProfilePageComponent>
  )
}
