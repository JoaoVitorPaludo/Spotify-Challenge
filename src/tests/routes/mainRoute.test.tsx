import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { PublicRoutes } from '../../routes/mainRoute.routes'

describe('PublicRoutes', () => {
  it('Should render public routes', () => {
    render(<PublicRoutes />)
  })
})
