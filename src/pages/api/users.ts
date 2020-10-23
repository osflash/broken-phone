import nextConnect from 'next-connect'

import UsersController from '../../controllers/UsersController'

const handler = nextConnect()

handler.get(UsersController.index)

export default handler
