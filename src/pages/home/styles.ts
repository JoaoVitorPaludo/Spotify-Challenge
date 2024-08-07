import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

export const HomePageContainer = styled.main`
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  padding-right: 0;
`
export const HomePageHeader = styled.header`
  width: 100%;
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
export const HomePageTracksList = styled.main`
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

export const HomePageTracksListItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  img {
    width: 4.5rem;
    height: 4.5rem;
  }

  aside {
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
