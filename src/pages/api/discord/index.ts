import nextConnect from 'next-connect'

import DiscordController from '@/controllers/discord/DiscordController'

import middlewares from '@/middlewares'

const handler = nextConnect()

handler.use(middlewares)

handler.get(DiscordController.index)

export default handler

export const config = {
  api: {
    bodyParser: false
  }
}
