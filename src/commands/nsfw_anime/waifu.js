const { CommandType } = require('wokcommands')
const { EmbedBuilder } = require('discord.js')

const nsfwHelper = require('../../util/nsfwHelper')

module.exports = {
  type: CommandType.SLASH,
  description: 'Too many to pick a favorite.',
  guildOnly: true,
  testOnly: false,

  callback: async ({ interaction }) => {
    //Setup variables
    let author = await interaction.guild.members.fetch(interaction.user.id)

    // Check NSFW channel
    if (!interaction.channel.nsfw) {
      return interaction.reply({
        content: 'This command must be run in a NSFW channel!',
        ephemeral: true,
      })
    }

    // Using help call API
    try {
      const nsfwData = await nsfwHelper.waifu('waifu')

      const nsfwEmbed = new EmbedBuilder()
        .setTitle("Image didn't load click here.")
        .setURL(nsfwData.url)
        .setColor(process.env.EMBED)
        .setImage(nsfwData.url)
        .setFooter({
          text: `Requested by ${author.user.username} | Nekobot API`,
        })

      interaction.reply({
        content: '',
        embeds: [nsfwEmbed],
      })
    } catch (err) {
      interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true,
      })
      console.log(err)
    }
  },
}
