import styled from 'styled-components'

interface ButtonProps {
  size?: number
}
export const Button = styled.button<ButtonProps>`
  background: ${(props) => props.theme['green-500']};
  border-radius: 1.5rem;
  color: ${(props) => props.theme['black-500']};
  padding: 0px 1rem 0px 1rem;
  height: 2.625rem;
  border: none;
  cursor: pointer;

  span {
    font-weight: 700;
    padding-left: 2rem;
    padding-right: 2rem;
    font-family: Rubik;
    font-size: 1rem;
  }
`
