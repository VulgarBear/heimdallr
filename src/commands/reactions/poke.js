const { CommandType } = require('wokcommands')
const { EmbedBuilder, Embed } = require('discord.js')

const funHelper = require('../../util/funHelper')
const logger = require('../../util/logger')

module.exports = {
  type: CommandType.SLASH,
  description: 'boop',
  guildOnly: true,
  testOnly: process.env.DEV_MODE === 'TRUE',

  callback: async ({ interaction }) => {
    // Setup variables
    const author = await interaction.user.username

    // Usering helper to call API
    try {
      const helperData = await funHelper.nekosBest('poke')

      const newEmbed = new EmbedBuilder()
        .setTitle(`${author} is giving boops.`)
        .setURL(helperData.url)
        .setColor(process.env.EMBED)
        .setImage(helperData.url)
        .setFooter({
          text: `Anime: ${helperData.anime_name} | Nekos.best API`,
        })

      interaction.reply({
        content: '',
        embeds: [newEmbed],
      })
    } catch (err) {
      interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true,
      })
      logger.error(err, 'Nekos.best API call command failed to run.')
    }
  },
}
