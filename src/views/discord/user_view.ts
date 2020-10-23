import { ClientUser } from 'discord.js'

export type User = {
  user: ClientUser
  servers: number
}

export default {
  render({ user, servers }: User) {
    if (!user && !servers) return {}

    return {
      id: user.id,
      username: user.username,
      bot: user.bot,
      avatar: user.avatar,
      tag: user.tag,
      discriminator: user.discriminator,
      createdTimestamp: user.createdTimestamp,
      avatarURL: user.avatarURL(),
      displayAvatarURL: user.displayAvatarURL(),
      servers
    }
  }

  // renderMany(users: User[]) {
  //   return users.map(user => this.render(user))
  // }
}
