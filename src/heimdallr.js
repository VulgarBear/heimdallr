const { Client, IntentsBitField } = require('discord.js')
const path = require('path')
const JC = require('wokcommands')
const mongoose = require('mongoose')

const logger = require('./util/logger')
const notify = require('./util/notifications')

require('dotenv/config')

const DEV_MODE = process.env.DEV_MODE

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildModeration, IntentsBitField.Flags.GuildBans],
})

client.on('ready', async () => {
  logger.info('Heimdallr has begun watching...')

  mongoose.set('strictQuery', false)
  await mongoose
    .connect(process.env.MONGO_URI, {
      keepAlive: true,
    })
    .then(logger.info('Connected to Database...'))

  new JC({
    client,
    mongoUri: process.env.MONGO_URI,
    dbOptions: {
      strictQuery: false,
    },
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    events: {
      dir: path.join(__dirname, 'events'),
    },
    testServers: [process.env.DEV_SERVER],
    botOwners: [process.env.OWNERS],
    disabledDefaultCommands: [],
    cooldownConfig: {
      errorMessage: 'Please wait {TIME} before doing that again',
      botOwnerBypass: true,
      dbRequired: 300,
    },
  })

  if (process.env.NFTY && DEV_MODE === 'FALSE') {
    const nftyData = 'Heimdallr is now online'
    const nftyTag = 'loudspeaker'
    notify.nftyNotify(nftyData, nftyTag)
  } else {
    return logger.info('NTFY server not found or DEV_MODE enabled.')
  }
})

client.login(process.env.TOKEN)
