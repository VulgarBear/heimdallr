const { Client, IntentsBitField } = require('discord.js')
const path = require('path')
const mongoose = require('mongoose')
const WOK = require('wokcommands')
const pc = require('picocolors')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
})

client.on('ready', async () => {
  console.log(pc.bgGreen('Heimdallr has begun watching!'))

  mongoose.set('strictQuery', false)
  mongoose.connect(process.env.MONGO_URI, {
    keepAlive: true,
  })

  new WOK({
    client,
    mongoUri: process.env.MONGO_URI,
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
})

client.login(process.env.TOKEN)
