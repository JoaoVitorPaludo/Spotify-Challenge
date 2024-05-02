import styled from 'styled-components'

export const ArtistsPageComponent = styled.main`
  padding: 2rem;

  h1 {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 2rem;
    text-align: left;
  }
  p {
    margin-top: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.125rem;
    text-align: left;
  }
`

export const ArtistsPageList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 1rem;
`
export const ArtistsPageListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  span {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25rem;
    letter-spacing: 0.01em;
    text-align: left;
  }
`
