import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SidebarComponent } from '../components/Sidebar/sidebar'
import { HomePage } from '../pages/home/index.page'
import { LoginPage } from '../pages/login/index.page'
import { PrivateRoutesContainer } from './styles'

function PrivateRoutes() {
  return (
    <PrivateRoutesContainer>
      <SidebarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </PrivateRoutesContainer>
  )
}

export function PublicRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<PrivateRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}
