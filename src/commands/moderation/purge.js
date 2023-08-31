const { ContextMenuCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { CommandType } = require('wokcommands')

module.exports = {
  type: CommandType.SLASH,
  description: 'Clear/purge user commands in chat.',
  guildOnly: true,
  permissions: [PermissionFlagsBits.ManageMessages],
  minArgs: 1,
  expectedArgs: 'Number of messages to delete',
  testOnly: false,
  options: [
    {
      name: 'amount',
      description: 'The number of messages you would like to delete',
      required: true,
      type: 10,
    },
  ],

  callback: async ({ interaction, args }) => {
    // Set args
    const amount = args[0]

    // Set hard limit for amount of messages to purge.
    if (amount > 99) {
      interaction.reply({
        content: String('Unable to delete over 99 messages at one time.'),
        ephemeral: true,
      })
    } else {
      // Get size of deleted messages.
      try {
        // Attempt to delete messages.
        const { size } = await interaction.channel.bulkDelete(amount)
        await interaction.reply({
          content: String(`Deleted ${size} messages.`),
          ephemeral: true,
        })
      } catch (err) {
        console.log(err)
        interaction.reply({
          content: String('An error occured, please make sure there are no messages over 14 days old included.'),
          ephemeral: true,
        })
      }
    }
  },
}
