import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, vi } from 'vitest'
import { ProfilePage } from '../../../pages/profile/index.page'
import { SkeletonComponent } from '../../../pages/profile/styles'
import { useProfile } from '../../../pages/profile/useProfile'

describe('ProfilePage', () => {
  it('Should render the skeleton when profileList is empty', () => {
    render(<SkeletonComponent borderSize="4" width={8} height={8} />)
  })
})
describe('ProfilePage', () => {
  beforeEach(() => {
    vi.mock('../../../pages/profile/useProfile', () => ({
      useProfile: vi.fn().mockReturnValue({
        profileList: {
          display_name: 'Test Name',
          external_urls: {
            spotify: 'https://open.spotify.com/user/123',
          },
          href: 'https://api.spotify.com/v1/users/123',
          id: '123',
          images: [{ url: 'image_url', height: 10, width: 10 }],
          type: 'user',
          uri: 'spotify:user:123',
          followers: {
            href: 'https://api.spotify.com/v1/users/123/followers',
            total: 123,
          },
        },
        removeCookie: vi.fn(),
      }),
    }))
  })

  it('Should render the ProfilePage', () => {
    render(<ProfilePage />)
  })

  it('Should click the button', async () => {
    render(<ProfilePage />)

    await waitFor(() => {
      const button = screen.getByTestId('button-profile')
      fireEvent.click(button)
    })
  })

  it('Should render the SkeletonContainer if profileList is empty', async () => {
    vi.mocked(useProfile as jest.Mock).mockReturnValue({
      profileList: {},
    })
    render(<ProfilePage />)

    await waitFor(() => {
      expect(
        screen.getByTestId('skeleton-container-profile'),
      ).toBeInTheDocument()
    })
  })
})
