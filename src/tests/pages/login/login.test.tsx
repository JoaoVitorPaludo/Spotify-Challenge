import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import { LoginPage } from '../../../pages/login/index.page'

describe('LoginPage', () => {
  it('Should render the LoginPage', () => {
    render(<LoginPage />)
  })
})

describe('LoginPage', () => {
  it('Should open Spotify authentication page', () => {
    window.location = { href: '' } as any
    render(<LoginPage />)

    fireEvent.click(screen.getByRole('button'))

    expect(window.location.href).toBe(
      `${import.meta.env.VITE_API_URL}/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=http://localhost:5174/callback&response_type=code&scope=user-top-read playlist-modify-public playlist-modify-private user-read-recently-played`,
    )
  })
})
