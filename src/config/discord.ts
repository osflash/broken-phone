import {
  Client,
  Collection,
  Snowflake,
  GuildMember,
  User,
  MessageReaction,
  EmojiResolvable,
  Message,
  DiscordAPIError,
  VoiceChannel
} from 'discord.js'

const token = process.env.DISCORD_BOT_TOKEN

let cachedClient: Client = null

if (!token) {
  throw new Error(
    'Please define the DISCORD_BOT_TOKEN environment variable inside .env.local'
  )
}

type FilterReaction = (
  reaction: MessageReaction,
  user: User
) => boolean | Promise<boolean>

const rooms = new Map<Snowflake, Collection<Snowflake, GuildMember>>()

const Discord = () => {
  if (cachedClient) return cachedClient

  const client = new Client()

  client.on('ready', () =>
    client.user.setActivity('broken phone', { type: 'PLAYING' })
  )

  client.on('message', async message => {
    const prefix = '!'

    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(' ')
    const command = args.shift().toLowerCase()

    if (command === 'broken-phone') {
      const { member } = message

      const { channel } = member.voice

      if (!member.hasPermission(['MUTE_MEMBERS', 'DEAFEN_MEMBERS'])) {
        return message.reply(
          'preciso da permissão silenciar membros e ensurdecer membros!'
        )
      }

      if (!channel) {
        return message.reply('você precisa entrar em um canal de voz primeiro!')
      }

      if (channel.members.size < 3) {
        return message.reply(
          'precisa ter no minimo 3 jogadores na sala de voz!'
        )
      }

      // if (/^-?[\d.]+(?:e-?\d+)?$/.test(args[1])) {
      //   return message.reply('não é numérico!')
      // }

      if (rooms.has(channel.id)) {
        return message.reply('partida em andamento!')
      }

      rooms.set(channel.id, channel.members)

      await handleEmbed(channel.id, message)
    }

    // if (command == 'join') {
    //   if (message.member.voice.channel) {
    //     await message.member.voice.channel.join()
    //   } else {
    //     message.reply('Você precisa entrar em um canal de voz primeiro!')
    //   }
    // }
  })

  client.login(token)

  cachedClient = client

  return client
}

export default Discord

type Handler = (
  id: string,
  message: Message,
  random?: GuildMember
) => Promise<Message>

const handleEmbed: Handler = async (id, message, random) => {
  try {
    const room = rooms.get(id)
    const { channel } = message.member.voice

    const checkMark: EmojiResolvable = '✅'
    const crossMark: EmojiResolvable = '❌'

    await toggleMute(message, channel, true)

    const randomSpeaking = random ?? room.random()

    if (!randomSpeaking.voice.channel) {
      rooms.delete(id)

      await toggleMute(message, channel, false)

      return message.channel.send(
        `${randomSpeaking.user}, não está no canal de voz!`
      )
    }

    await randomSpeaking.voice.setMute(false)
    await randomSpeaking.voice.setDeaf(true)

    room.delete(randomSpeaking.id)

    const randomListening = room.random()

    // if (!randomListening) {
    //   return message.reply(`não encontramos ${randomListening.user}.`)
    // }

    if (!randomListening.voice.channel) {
      rooms.delete(id)

      await toggleMute(message, channel, false)

      return message.channel.send(
        `${randomListening.user}, não está no canal de voz!`
      )
    }

    await randomListening.voice.setMute(true)
    await randomListening.voice.setDeaf(false)

    const dialog = await message.channel.send({
      embed: {
        color: 0x0099ff,
        title: 'Broken Phone',
        description: `${randomSpeaking.user} você tem 30 segundos para falar e ${randomListening.user} escutar.`,
        footer: {
          text: `${checkMark} - Confirma se você falou uma palavra ou frase.`
        }
      }
    })

    await dialog.react(checkMark)
    await dialog.react(crossMark)

    const filter: FilterReaction = (reaction, user) => {
      return (
        [checkMark, crossMark].includes(reaction.emoji.name) &&
        user.id === randomSpeaking.user.id &&
        !!randomSpeaking.voice.channel
      )
    }

    try {
      const collected = await dialog.awaitReactions(filter, {
        max: 1,
        time: 30 * 1e3,
        errors: ['time']
      })

      const reaction = collected.first()

      if (reaction.emoji.name === checkMark) {
        if (room.size > 1) {
          await randomSpeaking.voice.setMute(true)
          await randomSpeaking.voice.setDeaf(true)

          await handleEmbed(id, message, randomListening)
        } else {
          rooms.delete(id)

          await toggleMute(message, channel, false)

          message.channel.send('todos terminaram de falar!')
        }
      } else if (reaction.emoji.name === crossMark) {
        rooms.delete(id)

        await toggleMute(message, channel, false)

        message.channel.send(`${randomSpeaking}, cancelou essa rodada!`)
      }
    } catch (err) {
      rooms.delete(id)

      await toggleMute(message, channel, false)

      message.channel.send(`${randomSpeaking}, acabou o tempo!`)
    }
  } catch (err) {
    if (err instanceof DiscordAPIError) {
      return message.channel.send(err.message.toLowerCase())
    }

    console.error(err)
    message.channel.send('algo deu errado.')
  }
}

const toggleMute = (message: Message, channel: VoiceChannel, toggle: boolean) =>
  Promise.all(
    channel.members.map(async member => {
      // await member.voice.setMute(toggle)
      // await member.voice.setDeaf(toggle)
      // const { channel } = member.voice
      // if (channel) {
      //   await member.voice.setDeaf(toggle)
      //   await member.voice.setMute(toggle)
      // } else {
      //   const room = rooms.get(channel.id)
      //   room.delete(member.id)
      //   message.channel.send(`${member.user} saiu do canal de voz!`)
      // }

      try {
        await member.voice.setMute(toggle)
        await member.voice.setDeaf(toggle)
      } catch (err) {
        const room = rooms.get(channel.id)

        if (room.has(member.id)) {
          room.delete(member.id)
        }

        message.channel.send(`${member.user} saiu do canal de voz!`)
      }
    })
  )
