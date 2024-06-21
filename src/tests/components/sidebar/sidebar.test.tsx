import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import logo from '../../../assets/spotify_logo_full.svg'
import { SidebarComponent } from '../../../components/Sidebar/sidebar'

const image = {
  src: logo,
  alt: 'Logo',
}
describe('SidebarComponent', () => {
  it('Should render the SidebarComponent', () => {
    window.location = { href: '/home' } as any

    render(
      <BrowserRouter>
        <SidebarComponent />
      </BrowserRouter>,
    )

    fireEvent.click(screen.getByRole('img'))
    expect(window.location.href).toBe('/home')
    expect(screen.getByRole('img')).toHaveAttribute('alt', image.alt)
    expect(screen.getByRole('img')).toHaveAttribute('src', image.src)
  })
})
