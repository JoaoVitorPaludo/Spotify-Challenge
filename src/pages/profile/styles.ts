import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

export const ProfilePageComponent = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  }
  img {
    width: 8rem;
    height: 8rem;
    border-radius: 4rem;
  }

  p {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: 0.01em;
    text-align: left;
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

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`
