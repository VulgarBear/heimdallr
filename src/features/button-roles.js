const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const buttonRoleSchema = require('../schemas/button-role.schema')

const prefix = 'button-roles-'

module.exports = async (_, client) => {
  buttonRoleSchema.watch().on('change', async (data) => {
    const { _id } = data.documentKey
    const document = await buttonRoleSchema.findById(_id)

    const { channelId, text, hexColor, buttons, messageId } = document
    const channel = await client.channels.fetch(channelId)

    const embed = new EmbedBuilder().setColor(hexColor).setDescription(text)

    const components = []
    let row = new ActionRowBuilder()

    for (let a = 0; a < buttons.length && a < 25; ++a) {
      if (a > 0 && a % 5 === 0) {
        components.push(row)
        row = new ActionRowBuilder()
      }

      const { roleId, buttonText, buttonStyle, buttonEmoji, link } = buttons[a]

      const buttonBuilder = new ButtonBuilder().setLabel(buttonText).setStyle(buttonStyle).setEmoji(buttonEmoji)

      if (buttonStyle === 'Link') {
        buttonBuilder.setURL(link)
      } else {
        buttonBuilder.setCustomId(`${prefix}${roleId}`)
      }

      row.addComponents(buttonBuilder)
    }

    if (row.components.length > 0) {
      components.push(row)
    }

    if (messageId) {
      try {
        console.log('Message fetch fired')
        const message = await channel.messages.fetch(messageId)

        message.edit({
          embeds: [embed],
          components,
        })

        return
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('Message send fired')
      const message = await channel.send({
        embeds: [embed],
        components,
      })

      await buttonRoleSchema.updateOne({ _id }, { messageId: message.id })
    }

    // await buttonRoleSchema.updateOne({ _id }, { messageId: message.id })
  })
}

module.exports.prefix = prefix
