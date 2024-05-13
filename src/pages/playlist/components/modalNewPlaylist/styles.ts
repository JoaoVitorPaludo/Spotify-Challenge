import styled from 'styled-components'

export const ModalNewPlaylistContainer = styled.form`
  width: 37.5rem;
  height: 19.625rem;
  background: #303030;
  border-radius: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`
export const ModalNewPlaylistHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  svg {
    color: white;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`
type ModalNewPlaylistMainProps = {
  $hasError: boolean
}
export const ModalNewPlaylistMain = styled.main<ModalNewPlaylistMainProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  span {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: 0.01em;
    text-align: left;
    color: ${(props) => props.theme['white-100']};
  }

  input {
    width: 90%;
    height: 2.25rem;
    background: transparent;
    border: none;
    border-bottom: 1px solid
      ${(props) => (props.$hasError ? '#9c0000' : '#ffffff33')};
    color: ${(props) => props.theme['white-100']};
    outline: none !important;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.01em;
  }
`

export const ModalNewPlaylistFooter = styled.footer`
  display: flex;
  justify-content: center;
`
