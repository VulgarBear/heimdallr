const axios = require('axios')
const Booru = require('booru')

const NEKOBOT_URL = 'https://nekobot.xyz/api/'

const nekoBot = async (type) => {
  const res = await axios.get(`${NEKOBOT_URL}/image`, {
    params: {
      type: type,
    },
  })

  const searchData = res.data
  return searchData
}

const e621 = async (searchTerm) => {
  const res = await Booru.search('e621.net', searchTerm, {
    limit: 1,
    random: true,
  })

  const searchData = await res.posts[0]
  return searchData
}

const gelbooru = async (searchTerm) => {
  const res = await Booru.search('gelbooru', searchTerm, {
    limit: 1,
    random: true,
  })

  const searchData = await res.posts[0]
  return searchData
}

const r34 = async (searchTerm) => {
  const res = await Booru.search('rule34', searchTerm, {
    limit: 1,
    random: true,
  })

  const searchData = await res.posts[0]
  return searchData
}

module.exports = {
  nekoBot,
  e621,
  gelbooru,
  r34,
}
