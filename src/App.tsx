import { ThemeProvider } from 'styled-components'
import { LoginPage } from './pages/login/index.page'
import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <LoginPage />
    </ThemeProvider>
  )
}
