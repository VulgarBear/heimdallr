const { CommandType } = require('wokcommands')

const funHelper = require('../../util/funHelper')

module.exports = {
  type: CommandType.SLASH,
  description: 'Insult another member of the server.',
  guildOnly: true,
  minArgs: 1,
  testOnly: false,
  options: [
    {
      name: 'user',
      description: '@user that you would like to insult',
      required: true,
      type: 6
    }
  ],

  callback: async ({ interaction }) => {
    const member = await interaction.options.getUser('user')

    const insult = await funHelper.insult()

    if (interaction) {
      interaction.reply({
        content: String(`${member} ` + insult)
      })
    }
  }
}
