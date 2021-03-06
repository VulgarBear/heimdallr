const { Command } = require('discord-akairo')

class SetupCommand extends Command {
  constructor () {
    super('setup', {
      aliases: ['setup'],
      category: 'setup',
      channel: 'guild',
      userPermissions: ['MANAGE_GUILD'],
      args: [
        {
          id: 'roleName',
          type: 'role',
          prompt: {
            start: 'What role would you like to be the default role?',
            retry: 'Please input a correct role name'
          }
        },
        {
          id: 'muteRoleName',
          type: 'role',
          prompt: {
            start: 'What role would you like to be the mute role?',
            retry: 'Please input a correct role name'
          }
        },
        {
          id: 'logChannel',
          type: 'textChannel',
          prompt: {
            start: 'What channel would you like to be your server log?',
            retry: 'Please input a correct channel name.'
          }
        },
        {
          id: 'anncChannel',
          type: 'textChannel',
          prompt: {
            start: 'What channel would you like to send your announcements?',
            retry: 'Please input a correct channel name.'
          }
        },
        {
          id: 'starChannel',
          match: 'content',
          type: 'textChannel',
          prompt: {
            start: 'What channel would you like to use as the starboard?',
            retry: 'Please provide a valid text channel.'
          }
        }
      ]
    })
  }

  async exec (msg, { roleName, muteRoleName, logChannel, anncChannel, starChannel, yesOrNo }) {
    // Fetch guild settings from Discord and save to PostgreSQL
    await this.client.settings.set(msg.guild, 'defaultRole', roleName.id)
    await this.client.settings.set(msg.guild, 'muteRole', muteRoleName.id)
    await this.client.settings.set(msg.guild, 'logChannel', logChannel.id)
    await this.client.settings.set(msg.guild.id, 'newsChannel', anncChannel.id)
    await this.client.settings.set(msg.guild, 'starboardChannelID', starChannel.id)

    // Build embed with results and send
    const embed = this.client.util.embed()
      .setAuthor('Server Setting Wizard')
      .setColor(process.env.EMBED)
      .setDescription(['Server Settings',
        `**Default Role**: ${roleName}`,
        `**Mute Role**: ${muteRoleName}`,
        `**Log Channel**: ${logChannel}`,
        `**Annoucement Channel**: ${anncChannel}`,
        `**Starboard**: ${starChannel}`
      ])
      .setTimestamp()
      .setFooter(`Completed by ${msg.author.tag}`, `${msg.author.displayAvatarURL()}`)

    msg.channel.send({ embed })
  }
}
module.exports = SetupCommand
