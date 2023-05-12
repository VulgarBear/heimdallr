const { Client, IntentsBitField } = require('discord.js')
const path = require('path')
const mongoose = require('mongoose')
const JC = require('wokcommands')
const pc = require('picocolors')
const logger = require('./util/logger')

require('dotenv/config')

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds]
})

client.on('ready', async () => {
  logger.info('Heimdallr has begun watching')

  mongoose.set('strictQuery', false)
  mongoose.connect(process.env.MONGO_URI, {
    keepAlive: true
  })

  new JC({
    client,
    mongoUri: process.env.MONGO_URI,
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    events: {
      dir: path.join(__dirname, 'events')
    },
    testServers: [process.env.DEV_SERVER],
    botOwners: [process.env.OWNERS],
    disabledDefaultCommands: [],
    cooldownConfig: {
      errorMessage: 'Please wait {TIME} before doing that again',
      botOwnerBypass: true,
      dbRequired: 300
    }
  })
})

client.login(process.env.TOKEN)
