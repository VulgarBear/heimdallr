const { CommandType, CooldownTypes } = require('wokcommands')
const logger = require('../../util/logger')

const funHelper = require('../../util/funHelper')

module.exports = {
  type: CommandType.SLASH,
  description: 'Finds something to do when your bored',
  guildOnly: false,
  testOnly: false,

  callback: async ({ interaction }) => {
    // Setup variables
    const author = await interaction.guild.members.fetch(interaction.user.id)

    // Using helper file to call API
    try {
      const boredData = await funHelper.bored()

      interaction.reply({
        content: `${author} ` + boredData
      })
    } catch (err) {
      interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true
      })
      logger.error(err)
    }
  }
}
