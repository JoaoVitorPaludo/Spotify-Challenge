import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ThemeProvider } from 'styled-components'
import { PublicRoutes } from './routes/mainRoute.routes'
import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <PublicRoutes />
      </SkeletonTheme>
    </ThemeProvider>
  )
}
