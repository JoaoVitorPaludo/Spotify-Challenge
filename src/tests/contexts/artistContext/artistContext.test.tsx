import '@testing-library/jest-dom'
import { describe, vi } from 'vitest'

const mockHandleGetAlbum = vi.fn()
vi.mock('../../../contexts/artistContext/artistContext', () => ({
  ArtistContext: vi.fn().mockImplementation(() => ({
    handleGetAlbum: mockHandleGetAlbum,
  })),
}))
describe('artistContext', () => {
  it('Should call handleGetAlbum from the context ArtistContext', async () => {})
})
