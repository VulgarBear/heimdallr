const { CommandType } = require('wokcommands')
const { EmbedBuilder } = require('discord.js')

const nsfwHelper = require('../../util/nsfwHelper')

module.exports = {
  type: CommandType.SLASH,
  description: "It's mommy milkers time.",
  guildOnly: true,
  testOnly: false,

  callback: async ({ interaction }) => {
    // Setup variables
    const author = await interaction.guild.members.fetch(interaction.user.id)

    // Check NSFW channel
    if (!interaction.channel.nsfw) {
      return interaction.reply({
        content: 'This command must be run in a NSFW channel!',
        ephemeral: true,
      })
    }

    // Using help call API
    try {
      const nsfwData = await nsfwHelper.nekoBot('boobs')

      const nsfwEmbed = new EmbedBuilder()
        .setTitle("Image didn't load click here.")
        .setURL(nsfwData.message)
        .setColor(process.env.EMBED)
        .setImage(nsfwData.message)
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
