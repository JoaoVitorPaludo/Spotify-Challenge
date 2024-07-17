import { BiDisc } from 'react-icons/bi'
import { CiPlay1 } from 'react-icons/ci'
import { FiHome, FiUser } from 'react-icons/fi'
import { GrInstallOption } from 'react-icons/gr'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/spotify_logo_full.svg'
import * as S from './styles'
export function SidebarComponent() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <S.SidebarComponentContainer>
      <S.SidebarComponentHeader>
        <img src={logo} alt="Logo" onClick={() => navigate('/home')} />
      </S.SidebarComponentHeader>
      <S.SidebarComponentMain>
        <S.SidebarComponentItem
          to="/home"
          $isSelected={location.pathname === '/home'}
        >
          <FiHome size={24} />
          <span>Home</span>
        </S.SidebarComponentItem>
        <S.SidebarComponentItem
          to="/artists"
          $isSelected={location.pathname === '/artists'}
        >
          <BiDisc size={24} />
          <span>Artista</span>
        </S.SidebarComponentItem>
        <S.SidebarComponentItem
          to="/playlist"
          $isSelected={location.pathname === '/playlist'}
        >
          <CiPlay1 size={24} />
          <span>Playlist</span>
        </S.SidebarComponentItem>
        <S.SidebarComponentItem
          to="/profile"
          $isSelected={location.pathname === '/profile'}
        >
          <FiUser size={24} />
          <span>Perfil</span>
        </S.SidebarComponentItem>
      </S.SidebarComponentMain>
      <S.SidebarComponentFooter>
        <button>
          <GrInstallOption size={24} />
          <span>Instalar PWA</span>
        </button>
      </S.SidebarComponentFooter>
    </S.SidebarComponentContainer>
  )
}
