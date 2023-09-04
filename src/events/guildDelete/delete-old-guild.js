const guildSchema = require('../../schemas/guilds.scheme')

module.exports = async (guild) => {
  await guildSchema.deleteOne({ _id: guild.id })
}
