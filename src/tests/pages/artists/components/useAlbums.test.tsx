import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react'
import { describe } from 'vitest'
import { useAlbums } from '../../../../pages/artists/components/albums/useAlbums'

describe('useAlbums', () => {
  renderHook(() => useAlbums())
  it('Should render the useAlbums', () => {
    expect(useAlbums).toBeDefined()
  })

  //   it('Should render the handleGetAlbum', () => {
  //     expect(useAlbums.handleGetAlbum).toBeDefined()
  //   })
})
