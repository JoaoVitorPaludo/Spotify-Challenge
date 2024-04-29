import { ThemeProvider } from 'styled-components'
import { PublicRoutes } from './routes/mainRoute.routes'
import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <PublicRoutes />
    </ThemeProvider>
  )
}
