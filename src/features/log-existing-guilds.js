const guildSchema = require('../schemas/guilds.scheme')

module.exports = async (_, client) => {
  client.guilds.cache.forEach(async (guild) => {
    try {
      await guildsSchema({ _id: guild.id }).save()
    } catch (ignored) {}
  })
}
