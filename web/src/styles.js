import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

export const lightTheme = {
  color: "#1F1F2C",
  accent: "#0095f6",
  bgColor: "#FFF",
  borderColor: "rgb(219, 219, 219)",
}

export const darkTheme = {
  color: "rgb(250,250,250)",
  bgColor: "black",
}

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input{
      // all: unset;
    }
    * {
      box-sizing: border-box;
    }
    body {
        font-size: 14px;
        background-color: ${(props) => props.theme.bgColor};
        font-family: 'Golos Text', 'Open Sans', sans-serif;
        color: ${(props) => props.theme.color};
    }
    ::-webkit-scrollbar {
      width: 0;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
    @media(max-width:768px){
      body {
        background-color:#fff !important;
        overflow-x:hidden
      }
    }

`

// body
