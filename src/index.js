const { ShardingManager } = require('discord.js')
const pc = require('picocolors')
const path = require('path')

require('dotenv/config')

const manager = new ShardingManager(path.join(__dirname, 'heimdallr.js'), {
  token: process.env.TOKEN,
})

manager.on('shardCreate', (shard) => {
  console.log(pc.bgBlue(`Launched shard #${shard.id}`))
})

manager.spawn()
