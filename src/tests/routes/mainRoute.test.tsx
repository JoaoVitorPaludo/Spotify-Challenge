import '@testing-library/jest-dom'

import { render, waitFor } from '@testing-library/react'
import { useCookies } from 'react-cookie'
import { act } from 'react-dom/test-utils'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import { getAccessToken } from '../../controller/routeController/routeController'
import {
  PrivateRoutes,
  PublicRoutes,
  ValidateRoutes,
} from '../../routes/mainRoute.routes'
vi.mock('../../controller/routeController/routeController', () => ({
  getAccessToken: vi.fn().mockResolvedValue({
    data: { access_token: 'fakeToken' },
  }),
}))
vi.mock('react-cookie', () => ({
  useCookies: vi.fn().mockReturnValue([, vi.fn(), vi.fn()]),
}))

describe('PublicRoutes', () => {
  it('Should render public routes', () => {
    render(<PublicRoutes />)
  })

  it('Should call the ValidateRoutes if the route is /callback', async () => {
    const redirectToCallback = '/callback'

    // Mock window.location.search
    delete window.location
    window.location = { search: '?code=fakeCode' }

    render(
      <MemoryRouter initialEntries={[redirectToCallback]}>
        <Routes>
          <Route path="/callback" element={<ValidateRoutes />} />
        </Routes>
      </MemoryRouter>,
    )

    await act(async () => {
      await waitFor(() => {
        expect(getAccessToken).toHaveBeenCalledWith('fakeCode')
      })
    })
  })
  it('Should remove toke if the code is not present', async () => {
    const redirectToCallback = '/callback'

    delete window.location
    window.location = { search: '' }

    const removeCookieMock = vi.fn()
    vi.mocked(useCookies).mockReturnValue([, vi.fn(), removeCookieMock])

    render(
      <MemoryRouter initialEntries={[redirectToCallback]}>
        <Routes>
          <Route path="/callback" element={<ValidateRoutes />} />
        </Routes>
      </MemoryRouter>,
    )

    await act(async () => {
      await waitFor(() => {
        expect(removeCookieMock).toHaveBeenCalled()
      })
    })
  })
  it('Should call the PrivateRoutes if the route is *', async () => {
    const redirectToPrivateRoutes = '/home'
    const cookies = { token: 'fakeToken' }
    vi.mocked(useCookies).mockReturnValue([cookies, vi.fn(), vi.fn()])

    render(
      <MemoryRouter initialEntries={[redirectToPrivateRoutes]}>
        <Routes>
          <Route path="/home/*" element={<PrivateRoutes />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(cookies.token).toBe('fakeToken')
  })
  it('Should call the LoginPage  if the token is undefined', async () => {
    const redirectToPrivateRoutes = '/home'
    const cookies = { token: undefined }
    vi.mocked(useCookies).mockReturnValue([cookies, vi.fn(), vi.fn()])
    render(
      <MemoryRouter initialEntries={[redirectToPrivateRoutes]}>
        <Routes>
          <Route path="/home/*" element={<PrivateRoutes />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(cookies.token).toBeUndefined()
  })
})
