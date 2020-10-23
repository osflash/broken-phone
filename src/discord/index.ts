import { NextApiRequest, NextApiResponse } from 'next'
import { RequestHandler } from 'next-connect'

// import Discord from '@/config/discord'

type DiscordProps = RequestHandler<NextApiRequest, NextApiResponse>

const discord: DiscordProps = (_req, _res, next) => {
  // const client = Discord()

  return next()
}

export default discord
