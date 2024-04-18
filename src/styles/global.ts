import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
*{
margin: 0;
padding: 0;
box-sizing: border-box;
}

body{
    background-color: ${(props) => props.theme['black-500']};
    color: ${(props) => props.theme['white-100']};
}
`
