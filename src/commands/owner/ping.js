const { CommandType } = require('wokcommands')

module.exports = {
  type: CommandType.SLASH,
  description: 'Ping pong command',
  testOnly: true,

  callback: () => {
    return {
      content: 'Pong!',
      ephemeral: true
    }
  }
}
