import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { SidebarComponent } from '../components/Sidebar/sidebar'
import { ArtistProvider } from '../contexts/artistContext/artistContext'
import { getAcessToken } from '../controller/routeController/routeController'
import { AlbumsPage } from '../pages/artists/components/albums/index.page'
import { ArtistsPage } from '../pages/artists/index.page'
import { HomePage } from '../pages/home/index.page'
import { LoginPage } from '../pages/login/index.page'
import { PlaylistPage } from '../pages/playlist/index.page'
import { ProfilePage } from '../pages/profile/index.page'
import { PrivateRoutesContainer } from './styles'

function PrivateRoutes() {
  const [cookies] = useCookies(['token'])
  if (!cookies.token) return <LoginPage />
  return (
    <PrivateRoutesContainer>
      <SidebarComponent />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/artists"
          element={
            <ArtistProvider>
              <ArtistsPage />
            </ArtistProvider>
          }
        />
        <Route
          path="/artists/albums"
          element={
            <ArtistProvider>
              <AlbumsPage />
            </ArtistProvider>
          }
        />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </PrivateRoutesContainer>
  )
}

function ValidateRoutes() {
  const navigate = useNavigate()
  const [, setCookie, removeCookie] = useCookies(['token'])
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')

  async function getAuthToken(code: string) {
    try {
      const { data } = await getAcessToken(code)
      setCookie('token', data.access_token)
    } catch (err) {}
  }

  useEffect(() => {
    if (code) {
      getAuthToken(code)
      navigate('/home')
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
