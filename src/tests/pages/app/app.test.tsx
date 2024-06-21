import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { ThemeProvider } from 'styled-components'
import { App } from '../../../app'
import { PublicRoutes } from '../../../routes/mainRoute.routes'
import { GlobalStyles } from '../../../styles/global'
import { defaultTheme } from '../../../styles/themes/default'

describe('App', () => {
  it('Should render the App', () => {
    render(<App />)
  })
})
export const object = {
  'white-100': '#fff',
  'black-900': '#000000',
  'black-500': '#090707',
  'gray-500': '#949EA2',
  'green-500': '#57B660',
  'green-700': '#1DB954',
}
describe('App', () => {
  it('Should render the ThemeProvider', () => {
    render(<ThemeProvider theme={defaultTheme} />)
    expect(defaultTheme).toStrictEqual(object)
  })
})

describe('App', () => {
  it('Should render the PublicRoutes', () => {
    render(<PublicRoutes />)
  })
})

const colors = {
  baseColor: '#202020',
  highlightColor: '#444',
}
describe('App', () => {
  it('Should render the SkeletonTheme', () => {
    render(
      <SkeletonTheme
        baseColor={colors.baseColor}
        highlightColor={colors.highlightColor}
      />,
    )
  })
})

describe('App', () => {
  it('Should render the GlobalStyles', () => {
    render(<GlobalStyles />)
  })
})
