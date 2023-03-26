const { CommandType } = require('wokcommands')
const { EmbedBuilder } = require('discord.js')

const funHelper = require('../../util/funHelper')

module.exports = {
  type: CommandType.SLASH,
  description: 'Fetches you up something cute (dog, fox, cat, or bird)',
  guildOnly: true,
  minArgs: 1,
  expectedArgs: ' Cuteness type.',
  testOnly: false,
  options: [
    {
      name: 'type',
      description:
        'What kind of cuteness are your looking for? (dog, cat, fox, or bird)',
      required: true,
      type: 3
    }
  ],

  callback: async ({ interaction, args }) => {
    // Setup variables
    const cuteType = args[0]
    const author = await interaction.guild.members.fetch(interaction.user.id)

    // Using helper file to call API based on type.
    try {
      const cuteData = await funHelper.cute(cuteType)

      // Select API source based on type
      if (cuteType === 'dog') {
        const sourceAPI = 'random.dog'
      } else if (cuteType === 'fox') {
        const sourceAPI = 'randomfox.ca'
      } else if (cuteType === 'cat') {
        const sourceAPI = 'thecatapi.com'
      } else if (cuteType === 'bird') {
        const sourceAPI = 'shibe.online'
      } else {
        const sourceAPI = ''
      }

      const cuteEmbed = new EmbedBuilder()
        .setTitle("Image didn't load click here.")
        .setURL(cuteData)
        .setColor(process.env.EMBED)
        .setFooter({ text: `Requested by ${author.user.username}` })
        .setImage(cuteData)

      interaction.reply({
        content: '',
        embeds: [cuteEmbed]
      })
    } catch (err) {
      interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true
      })
      console.log(err)
    }
  }
}
