import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

function validateRoutes() {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  if (code) {
    return PrivateRoutes()
  }
  return LoginPage()
}

export function PublicRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/callback" element={validateRoutes()} />

        <Route path="/*" element={PrivateRoutes()} />
      </Routes>
    </BrowserRouter>
  )
}
