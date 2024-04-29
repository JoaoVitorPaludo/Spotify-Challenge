import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
*{
margin: 0;
padding: 0;
box-sizing: border-box;
}

body{
    background: ${(props) => props.theme['black-500']};
    color: ${(props) => props.theme['white-100']};
    font-family: Rubik;

}
`
