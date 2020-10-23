import { NextApiRequest, NextApiResponse } from 'next'

import Discord from '@/config/discord'
import userView, { User } from '@/views/discord/user_view'

export default {
  index: async (_req: NextApiRequest, res: NextApiResponse) => {
    const client = Discord()

    const { user, guilds } = client

    const data: User = { user, servers: guilds.cache.size }

    return res.status(200).json(userView.render(data))
  }
}
