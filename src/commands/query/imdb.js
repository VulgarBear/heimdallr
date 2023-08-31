const { CommandType } = require('wokcommands')
const { EmbedBuilder } = require('discord.js')

const funHelper = require('../../util/funHelper')

module.exports = {
  type: CommandType.SLASH,
  description: 'Search The Movie Database for info on movies, series, or actors.',
  guildOnly: true,
  minArgs: 2,
  expectedArgs: 'Search type and name',
  testOnly: false,
  options: [
    {
      name: 'type',
      description: 'Movie, Series, or Actor?',
      type: 3,
      required: true,
    },
    {
      name: 'name',
      description: 'Name to search for?',
      type: 3,
      required: true,
    },
  ],

  callback: async ({ interaction }) => {
    // Setup variables
    const searchType = await interaction.options.getString('type').toLowerCase()
    var searchName = await interaction.options.getString('name').toLowerCase()
    var searchName = searchName.substring().split(' ')
    var searchName = searchName.join('%20')

    const author = await interaction.guild.members.fetch(interaction.user.id)

    try {
      if (searchType === 'movie') {
        const movieData = await funHelper.tmdb(searchType, searchName)

        const movieEmbed = new EmbedBuilder()
          .setTitle(movieData.title)
          .setColor(process.env.EMBED)
          .setFooter({
            text: `Requested by ${author.user.username} | TMDB API`,
          })
          .setDescription(movieData.overview)
          .setThumbnail('https://image.tmdb.org/t/p/w500' + movieData.poster_path)
          .addFields(
            {
              name: 'User Rating',
              value: movieData.vote_average.toFixed(1) + '/10',
              inline: true,
            },
            {
              name: 'Release Date',
              value: movieData.release_date,
              inline: true,
            },
            {
              name: 'More Infor',
              value: `[TMDB](https://www.themoviedb.org/movie/${movieData.id})`,
            }
          )

        return interaction.reply({
          content: '',
          embeds: [movieEmbed],
        })
      } else if (searchType === 'series') {
        const seriesData = await funHelper.tmdb(searchType, searchName)

        const seriesEmbed = new EmbedBuilder()
          .setTitle(seriesData.name)
          .setColor(process.env.EMBED)
          .setFooter({
            text: `Requested by ${author.user.username} | TMDB API`,
          })
          .setDescription(seriesData.overview)
          .setThumbnail('https://image.tmdb.org/t/p/w500' + seriesData.poster_path)
          .addFields(
            {
              name: 'User Rating',
              value: seriesData.vote_average.toFixed(1) + '/10',
              inline: true,
            },
            {
              name: 'Air Date',
              value: seriesData.first_air_date,
              inline: true,
            },
            {
              name: 'More Info',
              value: `[TMDB](https://www.themoviedb.org/tv/${seriesData.id})`,
            }
          )

        return interaction.reply({
          content: '',
          embeds: [seriesEmbed],
        })
      } else if (searchType === 'actor') {
        const actorData = await funHelper.tmdb(searchType, searchName)

        const actorEmbed = new EmbedBuilder()
          .setTitle(actorData.name)
          .setColor(process.env.EMBED)
          .setFooter({
            text: `Requested by ${author.user.username} | TMDB API`,
          })
          .setThumbnail('https://image.tmdb.org/t/p/w500' + actorData.profile_path)
          .addFields(
            {
              name: 'Known For',
              value: `${actorData.known_for[0].title}, ${actorData.known_for[1].title}, ${actorData.known_for[2].title}`,
            },
            {
              name: 'More Info',
              value: `[TMDB](https://www.themoviedb.org/person/${actorData.id})`,
            }
          )

        return interaction.reply({
          content: '',
          embeds: [actorEmbed],
        })
      } else {
        interaction.reply({
          content: 'Please enter Movie, Series, or Actor for type.',
          ephemeral: true,
        })
        return
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
