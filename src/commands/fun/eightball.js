const { CommandType } = require('wokcommands')
const { EmbedBuilder } = require('discord.js')

const funHelper = require('../../util/funHelper')

module.exports = {
  type: CommandType.SLASH,
  description: 'Ask the magic 8Ball a question',
  guildOnly: true,
  minArgs: 1,
  expectedArgs: ' Ask your question.',
  testOnly: false,
  options: [
    {
      name: 'question',
      description: 'The question you would like to ask.',
      required: true,
      type: 3,
    },
  ],

  callback: async ({ interaction, args }) => {
    // Setup variables
    const question = args[0]
    let author = await interaction.guild.members.fetch(interaction.user.id)

    // Gather answer response from helper
    const answer = await funHelper.eightBall()

    // Setup Discord Embed
    const questionEmbed = new EmbedBuilder()
      .setColor(process.env.EMBED)
      .setTitle('The Magic 8-Ball')
      .addFields(
        { name: 'Question Asked:', value: question },
        { name: 'Your Answer:', value: answer }
      )
      .setFooter({ text: `Requested by ${author.user.username}` })

    interaction.reply({
      content: '',
      embeds: [questionEmbed],
    })
  },
}
