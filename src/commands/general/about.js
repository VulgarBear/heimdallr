const { CommandType } = require('wokcommands')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  type: CommandType.SLASH,
  description: 'General information about Heimdallr',
  guildOnly: false,
  testOnly: false,

  callback: async ({ interaction }) => {
    const aboutEmbed = new EmbedBuilder()
      .setColor(process.env.EMBED)
      .setTitle('About Heim - BETA')
      .setURL('https://top.gg/bot/391050398850613250')
      .setDescription(
        `Heimdallr-v2 is developed by VulgarBear#2617 and is a rewritten version of the original Heimdallr as the previous framework was very outdated..\n
         Heimdallr uses the **[Discord.js](https://discord.js.org)** library and the **[WOKCommands](https://www.npmjs.com/package/wokcommands)** framework.\n
         You can find out more on the **[github](https://github.com/VulgarBear/heimdall)**.\n
         Use /stats for statistics and /invite for an invite link.\n
         Join the community server [server](https://discord.gg/E9cJjvw) to learn more! Lastly if you enjoy Heimdallr and would like to help support it check out our [Ko-Fi](https://ko-fi.com/jotunndev)`
      )

    if (interaction) {
      console.log('command ran')
      interaction.reply({
        content: '',
        embeds: [aboutEmbed]
      })
    }
  }
}
