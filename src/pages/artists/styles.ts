import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

export const ArtistsPageComponent = styled.main`
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  padding-right: 0;
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
  flex: 1;
  /* max-height: 82vh;
  height: 82vh; */
  width: 100%;
  //overflow-y: auto;
  gap: 1rem;
`
export const ArtistsPageListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
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

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`
export const ArtistsPagePagination = styled.div`
  display: flex;
  color: white !important;
  justify-content: center;
  .MuiPaginationItem-outlinedSecondary {
    background-color: ${(props) => props.theme['green-700']};
  }
  .MuiPaginationItem-colorSecondary {
    background-color: ${(props) => props.theme['green-700']};
  }
  .MuiPaginationItem-textSecondary {
    color: white !important;
  }
  .Mui-selected {
    background-color: ${(props) => props.theme['green-500']} !important;
  }
  .MuiPaginationItem-root:hover {
    opacity: 0.8;
    background-color: ${(props) => props.theme['green-700']} !important;
  }
`

interface SkeletonComponentProps {
  borderSize: string
  width: number
  height: number
}
export const SkeletonComponent = styled(Skeleton)<SkeletonComponentProps>`
  width: ${(props) => `${props.width}rem`} !important;
  height: ${(props) => `${props.height}rem`}!important;
  border-radius: ${(props) => `${props.borderSize}rem`};
`
