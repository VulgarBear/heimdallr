const guildSchema = require('../../schemas/guilds.scheme')

module.exports = async (guild) => {
  try {
    await guildSchema({ _id: guild.id }).save()
  } catch (ignored) {}
}
