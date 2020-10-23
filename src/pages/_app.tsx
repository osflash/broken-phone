import React from 'react'

import { NextPage } from 'next'
import { AppProps } from 'next/app'

import { ThemeProvider } from 'styled-components'

import GlobalStyle from '@/styles'
import dark from '@/styles/dark'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={dark}>
    <Component {...pageProps} />
    <GlobalStyle />
  </ThemeProvider>
)

export default MyApp
