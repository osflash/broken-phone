import React from 'react'

import { NextPage } from 'next'

import { Container } from './styles'

interface LayoutProps {
  servers: number
}

const Layout: NextPage<LayoutProps> = ({ servers }) => {
  return (
    <Container>
      <h1>Total de servidores {servers}</h1>
      <a href={process.env.DISCORD_INVITE_SERVER}>Adicionar ao Discord</a>
      <span>Comando</span>
      <span>!broken-phone</span>
    </Container>
  )
}

export default Layout
