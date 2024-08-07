import { Link } from 'react-router-dom'
import styled from 'styled-components'
export const SidebarComponentContainer = styled.main`
  min-width: 15.625rem;
  background-color: ${(props) => props.theme['black-900']};
  display: flex;
  flex-direction: column;
`
export const SidebarComponentHeader = styled.header`
  display: flex;
  justify-content: left;
  padding: 1.5rem;
  img {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    display: none;
  }
`
export const SidebarComponentMain = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 0.5rem;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;

    padding: 0.5rem;
    gap: 0.5rem;
  }
`

interface SidebarComponentItemProps {
  $isSelected: boolean
}
export const SidebarComponentItem = styled(Link)<SidebarComponentItemProps>`
  color: ${(props) => props.theme['white-100']};
  text-decoration: none;
  display: flex;
  height: fit-content;
  align-items: center;
  padding: 0.6rem 0.75rem;
  border-radius: 5px;
  width: 100%;
  gap: 1rem;
  background: ${(props) => (props.$isSelected ? '#ffffff1a' : 'transparent')};
  cursor: pointer;
  span {
    font-size: 1rem;
    font-weight: 400;
    line-height: 24.74px;
    letter-spacing: -0.06em;
    text-align: left;
  }

  &:hover {
    background-color: #ffffff1a;
  }
  @media (max-width: 450px) {
    display: flex;
    flex-direction: column;
  }
`
export const SidebarComponentFooter = styled.footer`
  padding: 0.5rem 0.5rem;
  border-radius: 5px;
  width: 100%;

  button {
    width: 100%;
    border-radius: 5px;

    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    background: transparent;
    color: ${(props) => props.theme['white-100']};
    border: none;
    cursor: pointer;
    padding: 0.5rem 0.75rem;

    &:hover {
      background-color: #ffffff1a;
    }
  }
  span {
    font-weight: 500;
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    display: none;
  }
`
