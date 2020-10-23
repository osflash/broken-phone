import React from 'react'

import { NextPage } from 'next'
import Head from 'next/head'

import useSWR from 'swr'

import Layout from '@/components/Layout'

import { User } from '@/views/discord/user_view'

export const Home: NextPage = () => {
  const { data, error } = useSWR<User>('/api/discord')

  if (error) return <div>Falha ao carregar</div>
  if (!data) return <div>Carregando...</div>

  return (
    <>
      <Head>
        <title>Telefone sem fio</title>
      </Head>
      <Layout servers={data.servers} />
    </>
  )
}

export default Home
