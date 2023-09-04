const { prefix } = require('../../../schemas/button-role.schema')

module.exports = async (interaction) => {
  const { customId, member, guild } = interaction
  console.log('Button-Roles Interaction')

  if (!member || !interaction.isButton() || !customId.startsWith(prefix)) {
    return
  }

  const roleId = customId.replace(prefix, '')

  const role = await guild.roles.fetch(roleId)
  if (!role) {
    interaction.reply({
      content: `The role associated with this button does not exist. Please report this to a staff member in this server.`,
      ephemeral: true,
    })
    return
  }

  if (member.roles.cache.has(roleId)) {
    member.roles.remove(roleId)

    interaction.reply({
      content: `You no longer have <@&${roleId}>`,
      ephemeral: true,
    })
  } else {
    member.roles.add(roleId)

    interaction.reply({
      content: `You now have <@&${roleId}>`,
      ephemeral: true,
    })
  }
}
