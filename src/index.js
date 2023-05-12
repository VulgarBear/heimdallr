const { ShardingManager } = require('discord.js')
const logger = require('./util/logger')
const path = require('path')

require('dotenv/config')

const manager = new ShardingManager(path.join(__dirname, 'heimdallr.js'), {
  token: process.env.TOKEN
})

manager.on('shardCreate', (shard) => {
  logger.info(`Launched shard #${shard.id}`)
})

manager.spawn()
