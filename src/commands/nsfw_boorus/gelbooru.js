const { CommandType } = require('wokcommands')
const { EmbedBuilder } = require('discord.js')

const nsfwHelper = require('../../util/nsfwHelper')

module.exports = {
  type: CommandType.SLASH,
  description: 'Begin your search on gelbooru',
  guildOnly: true,
  minArgs: 1,
  expectedArgs: ' Search terms.',
  testOnly: false,
  options: [
    {
      name: 'search-term',
      description: 'What content would you like to search?',
      required: true,
      type: 3,
    },
  ],

  callback: async ({ interaction, args }) => {
    // Setup variables
    const searchTerm = args[0]
    const search = await searchTerm.split(' ').join('_')
    const author = await interaction.guild.members.fetch(interaction.user.id)

    // Check NSFW channel
    if (!interaction.channel.nsfw) {
      return interaction.reply({
        content: 'This command must be run in a NSFW channel!',
        ephemeral: true,
      })
    }

    try {
      const nsfwData = await nsfwHelper.gelbooru(search)

      console.log(nsfwData)

      const nsfwEmbed = new EmbedBuilder()
        .setTitle("Image didn't load click here.")
        .setURL(nsfwData.fileUrl)
        .setDescription(`**Artist:** ${nsfwData.data.owner}`)
        .setColor(process.env.EMBED)
        .setImage(nsfwData.fileUrl)
        .setFooter({
          text: `Requested by ${author.user.username} | gelbooru.com API`,
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
