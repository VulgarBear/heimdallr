const { CommandType } = require('wokcommands')
const { EmbedBuilder } = require('discord.js')

const itadAPI = require('../../util/itadAPI')

module.exports = {
  type: CommandType.SLASH,
  description: 'Lookup if there is a deal for a game.',
  guildOnly: true,
  minArgs: 1,
  expectedArgs: 'The game being searched for.',
  testOnly: false,
  options: [
    {
      name: 'game',
      description: 'What game are you searching for a deal on?',
      type: 3,
      required: true
    }
  ],

  callback: async ({ interaction }) => {
    // Setup variables
    const gameName = await interaction.options.getString('game').toLowerCase()

    const ignoredSellers = [
      '2game',
      'allyouplay',
      'bistore',
      'dlgamer',
      'direct2drive',
      'dreamgame',
      'fireflower',
      'impuse',
      'gamesplanet',
      'gamesplanetfr',
      'gamesplanetus',
      'gamesrepublic',
      'gemly',
      'lbostore',
      'nuuvem',
      'playism',
      'silagames',
      'voidu',
      'wingamestore',
      'gamesplanetde',
      'gamesload',
      'gamersgate'
    ]

    const author = await interaction.guild.members.fetch(interaction.user.id)

    try {
      const gameId = await itadAPI.getGameId(gameName)

      if (!gameId) {
        const gameList = await itadAPI.search(gameName)

        if (gameList.length > 0) {
          // Map titles, remove duplicates, sort alphabetically
          const titles = gameList
            .map((x) => x.title)
            .filter((v, i, a) => a.indexOf(v) === i)
            .sort()

          interaction.reply({
            content: `Could not lookup ${gameName} \n\n Here are some suggestions: \n ${titles.join(
              '\n'
            )}`
          })
        } else {
          interaction.reply({
            content: `Could not look up ${gameName}. Did you spell it correctly?`,
            ephemeral: true
          })
          return
        }
      }

      // Can't rely on user input for the formal game name.
      // Formal name also isn't returned with game data in the next step.
      const gameInfo = await itadAPI.getGameInfo(gameId)
      const gameData = await itadAPI.getGameData(gameId, ignoredSellers)
      const list = gameData.list.filter((x) => x.price_new < x.price_old)

      if (!gameData || list.length === 0) {
        interaction.reply({
          content: `Currently unable to find deal for ${gameName}`
        })
        return
      }

      const sellers = list.map((x) => `[${x.shop.name}](${x.url})`)
      const newPrices = list.map(
        (x) => `${toCurrency(x.price_new)} (-${x.price_cut}%)`
      )
      const oldPrices = list.map((x) => toCurrency(x.price_old))
      const histLowData = await itadAPI.getHistoricalLow(gameId)

      const dealEmbed = new EmbedBuilder()
        .setTitle(gameInfo.title || gameId)
        .setURL(gameData.urls.game)
        .setColor(process.env.EMBED)
        .setImage(gameInfo.image)
        .setFooter({ text: `Requested by ${author.user.username} | ITAD API` })
        .addFields(
          { name: 'Seller', value: sellers.join('\n'), inline: true },
          { name: 'New Price', value: newPrices.join('\n'), inline: true },
          { name: 'Old Price', value: oldPrices.join('\n'), inline: true }
        )

      interaction.reply({
        content: '',
        embeds: [dealEmbed]
      })
    } catch (err) {
      interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true
      })
      return console.log(err)
    }
    // =========================
    // Helpers
    // =========================

    /**
     * Convert number to currency format
     * @param {number} num
     * @returns {string}
     */
    function toCurrency (num) {
      const price = Number.parseFloat(num).toFixed(2)

      return price > 0 ? `$${price}` : 'FREE'
    }
  }
}
