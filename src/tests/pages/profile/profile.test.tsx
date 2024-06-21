import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, vi } from 'vitest'
import { ProfilePage } from '../../../pages/profile/index.page'
const mockRemoveCookie = vi.fn()

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.mock('../../../pages/profile/useProfile', () => ({
      useProfile: () => ({
        profileList: {
          id: '123',
          images: [{ url: 'image_url' }],
          display_name: 'Test Name',
        },
        removeCookie: mockRemoveCookie, // Use a função espiã aqui
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
      expect(mockRemoveCookie).toHaveBeenCalled() // Verifique se a função espiã foi chamada
    })
  })
})

// describe('ProfilePage with empty profileList', () => {
//   beforeEach(() => {
//     // Mockando o useProfile para retornar um objeto vazio
//     vi.mock('../../../pages/profile/useProfile', () => ({
//       useProfile: () => ({
//         profileList: {},
//         removeCookie: mockRemoveCookie, // Use a função espiã aqui
//       }),
//     }))
//   })
//   it('Should not render fragment when profileList.id is undefined', () => {
//     render(<ProfilePage />)
//     expect(screen.queryByTestId('section-profile')).not.toBeInTheDocument()
//   })
// })
