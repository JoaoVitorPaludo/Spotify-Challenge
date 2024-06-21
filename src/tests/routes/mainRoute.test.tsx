import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { useCookies } from 'react-cookie'
import { vitest } from 'vitest'
import { PublicRoutes } from '../../routes/mainRoute.routes'

describe('PublicRoutes', () => {
  it('Should render public routes', () => {
    render(<PublicRoutes />)
  })
})

vitest.mock('react-cookie', () => ({
  useCookies: () => [vitest.fn(), vitest.fn(), vitest.fn()],
}))
describe('PrivateRoutes', () => {
  it('Should render LoginPage if no token is present', () => {
    const [cookies] = useCookies(['token'])
    cookies.token = undefined

    if (cookies.token === undefined) {
      render(<PublicRoutes />)
      expect(
        screen.getByText(
          'Entre com a sua conta Spotify clicando no botão abaixo',
        ),
      ).toBeInTheDocument()
    }
  })

  it('Should render PrivateRoutes if token is present', () => {
    const [cookies] = useCookies(['token'])
    cookies.token = 'token'
    if (cookies.token !== undefined) {
      render(<PublicRoutes />)

      expect(
        screen.getByText(
          'Entre com a sua conta Spotify clicando no botão abaixo',
        ),
      ).toBeInTheDocument()

      window.location = { href: '' } as any

      fireEvent.click(screen.getByTestId('login-page-button'))

      expect(window.location.href).toBe(
        `${import.meta.env.VITE_API_URL}/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=http://localhost:5174/callback&response_type=code&scope=user-top-read playlist-modify-public playlist-modify-private user-read-recently-played`,
      )
    }
  })
})
