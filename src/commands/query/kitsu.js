const { CommandType } = require('wokcommands')
const { EmbedBuilder } = require('discord.js')

const funHelper = require('../../util/funHelper')

module.exports = {
  type: CommandType.SLASH,
  description: 'Lookup anime/manga on Kitsu.io',
  guildOnly: true,
  minArgs: 2,
  expectedArgs: ' Ask your question.',
  testOnly: false,
  options: [
    {
      name: 'type',
      description: 'Are you looking up an anime or manga?',
      type: 3,
      required: true,
    },
    {
      name: 'title',
      description: 'What is the title name of the anime/manga?',
      type: 3,
      required: true,
    },
  ],

  callback: async ({ interaction }) => {
    // Setup variables
    const contentType = await interaction.options
      .getString('type')
      .toLowerCase()
    const titleName = await interaction.options.getString('title')
    let author = await interaction.guild.members.fetch(interaction.user.id)

    try {
      if (contentType === 'anime') {
        const animeData = await funHelper.kitsu(contentType, titleName)

        const animeEmbed = new EmbedBuilder()
          .setTitle(
            animeData.attributes.titles.en +
              ' | ' +
              animeData.attributes.titles.ja_jp
          )
          .setURL(`https://kitsu.io/anime/${animeData.attributes.slug}`)
          .setDescription(
            `**Synopsis:**\n${animeData.attributes.synopsis.substring(
              0,
              450
            )}...`
          )
          .setColor(process.env.EMBED)
          .setFooter({
            text: `Requested by ${author.user.username} | Kitsu.io API`,
          })
          .setThumbnail(animeData.attributes.posterImage.small)

        interaction.reply({
          content: '',
          embeds: [animeEmbed],
        })
      } else if (contentType === 'manga') {
        const mangaData = await funHelper.kitsu(contentType, titleName)

        const mangaEmbed = new EmbedBuilder()
          .setTitle(mangaData.attributes.canonicalTitle)
          .setURL(`https://kitsu.io/anime/${mangaData.attributes.slug}`)
          .setDescription(
            `**Synopsis:**\n${mangaData.attributes.synopsis.substring(
              0,
              450
            )}...`
          )
          .setColor(process.env.EMBED)
          .setFooter({
            text: `Requested by ${author.user.username} | Kitsu.io API`,
          })
          .setThumbnail(mangaData.attributes.posterImage.small)

        interaction.reply({
          content: '',
          embeds: [mangaEmbed],
        })
      } else {
        interaction.reply({
          content: 'Something went wrong!',
          ephemeral: true,
        })
      }
    } catch (err) {
      interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true,
      })
      return console.log(err)
    }
  },
}
