import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

export const PlaylistPageComponent = styled.main`
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    flex: 1;
  }
`
export const PlaylistPageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
export const PlaylistPageTitles = styled.div`
  width: 50%;
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

export const PlaylistPageList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 1rem;
  flex: 1;
`
export const PlaylistPageListItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  img {
    width: 4.5rem;
    height: 4.5rem;
  }
  .no-image {
    width: 4.5rem;
    height: 4.5rem;
    background-color: ${(props) => props.theme['black-900']};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
export const PlaylistPageListLabel = styled.label`
  p {
    font-family: Rubik;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.01em;
    text-align: left;
  }
  span {
    font-family: Rubik;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.01em;
    text-align: left;
    color: #ffffffcc;
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

export const PlaylistPagination = styled.div`
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
