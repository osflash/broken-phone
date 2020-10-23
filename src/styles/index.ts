import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0%;
    box-sizing: border-box;
  }

  html, body, #__next {
    width: 100%;
    height: 100%;
  }

  *, button, input {
    border: 0;
    background: none;
  }

  html {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

  }

  #__next, body {
    text-rendering: optimizeLegibility;
  }

  body {
    line-height: 1;
    margin: 0;
    padding: 0;
    font-family: Whitney,Helvetica Neue,Helvetica,Arial,sans-serif;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: transparent;
  }

  a, button, div, input, select, span, strong, textarea {
    outline: 0;
  }

  a, abbr, acronym, address, applet, big, blockquote, body, caption, cite, code, dd, del, dfn, div, dl, dt, em, fieldset, form, h1, h2, h3, h4, h5, h6, html, iframe, img, ins, kbd, label, legend, li, object, ol, p, pre, q, s, samp, small, span, strike, strong, table, tbody, td, tfoot, th, thead, tr, tt, ul, var {
    margin: 0;
    padding: 0;
    border: 0;
    font-weight: inherit;
    font-style: inherit;
    font-family: inherit;
    vertical-align: baseline;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,.4);
    border-color: transparent;
  }

  .scrollbar::-webkit-scrollbar-thumb, .scrollbar::-webkit-scrollbar-track {
    border-width: 3px;
    border-radius: 7px;
    background-clip: padding-box;
    border-style: solid;
  }

  .scrollbar::-webkit-scrollbar-track {
    border-width: initial;
    border-color: transparent;
    background-color: rgba(0,0,0,.1);
  }

  .scrollbar::-webkit-scrollbar-thumb, .scrollbar::-webkit-scrollbar-track {
    border-width: 3px;
    border-radius: 7px;
    background-clip: padding-box;
    border-style: solid;
  }
`
