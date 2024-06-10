import styled from 'styled-components'

export const AlbumsPageContainer = styled.div`
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  padding-right: 0;
`
export const AlbumsPageHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export const AlbumsPageTitle = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.125rem;
  text-align: left;
  color: ${(props) => props.theme['white-100']};
  display: flex;
  gap: 1rem;

  svg {
    width: 1rem;
    height: 1rem;
  }
`
