import nextConnect from 'next-connect'

import discord from '@/discord'

const middleware = nextConnect()

middleware.use(discord)

export default middleware
