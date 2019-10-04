import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        outline: 0;
    }

    html, 
    body,
    #root {
        min-height: 100%;
    }

    body {
        background: #7159c1;
        -webkit-font-smoothing: antialiased !important;
    }

    body,
    input,
    button {
        color: #222;
        font-size: 14px;
        font-family: Arial;
    }

    button {
        cursor: pointer;
    }
`