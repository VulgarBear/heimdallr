const { Client, IntentsBitField, Partials } = require('discord.js')
const WOK = require('wokcommands')
const path = require('path')
const pc = require('picocolors')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [Partials.Channel],
})

client.on('ready', () => {
  new WOK({
    client,
    commandsDir: path.join(__dirname, 'commands'),
    validations: {
      syntax: path.join(__dirname, 'validations', 'syntax'),
    },
    mongoUri: process.env.DATABASE,
    testServers: [process.env.DEV_SERVER],
    botOwners: [process.env.OWNERS],
    disabledDefaultCommands: [],
    cooldownConfig: {
      errorMessage: 'Please wait {TIME} before doing that again',
      botOwnerBypass: true,
      dbRequired: 300,
    },
  })

  console.log(pc.bgGreen('Heimdallr has begun watching!'))
})

client.login(process.env.TOKEN)
