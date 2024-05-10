import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { SidebarComponent } from '../components/Sidebar/sidebar'
import { ArtistsPage } from '../pages/artists/index.page'
import { HomePage } from '../pages/home/index.page'
import { LoginPage } from '../pages/login/index.page'
import { PlaylistPage } from '../pages/playlist/index.page'
import { ProfilePage } from '../pages/profile/index.page'
import { PrivateRoutesContainer } from './styles'

function PrivateRoutes() {
  return (
    <PrivateRoutesContainer>
      <SidebarComponent />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </PrivateRoutesContainer>
  )
}

function ValidateRoutes() {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')

  useEffect(() => {
    if (code) {
      setCookie('token', code, {
        path: '/',
      })
      navigate('/home') // Redireciona para a rota /home
    } else {
      removeCookie('token')
    }
  }, [code, navigate, removeCookie, setCookie])

  return code ? null : <LoginPage />
}

export function PublicRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/callback" element={<ValidateRoutes />} />
        <Route path="*" element={<PrivateRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}
