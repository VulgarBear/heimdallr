const axios = require('axios')
const Booru = require('booru')

// Nekos.fun API calls
// Pulls image from nekos.fun based on type determined by command.
const nekoBot = async (type) => {
  let res = await axios.get('https://nekobot.xyz/api//image', {
    params: {
      type: type,
    },
  })

  let searchData = res.data
  return searchData
}

// Waifu.pics API call
// Pulls image from waifu.pics based on type determined by command.
const waifu = async (type) => {
  let res = await axios.get(`https://waifu.pics/api/nsfw/${type}`)

  let searchData = res.data
  return searchData
}

// e621.net API calls
// Pulls image from e621.net based on user's search term.
const e621 = async (searchTerm) => {
  let res = await Booru.search('e621.net', searchTerm, {
    limit: 1,
    random: true,
  })

  let searchData = await res.posts[0]
  return searchData
}

// Gelbooru.com API calls
// Pulls image from Gelbooru.com based on user's search term.
const gelbooru = async (searchTerm) => {
  let res = await Booru.search('gelbooru', searchTerm, {
    limit: 1,
    random: true,
  })

  let searchData = await res.posts[0]
  return searchData
}

// Rule34.xxx API calls
// Pulls image from Rule34.xxx based on user's search term.
const r34 = async (searchTerm) => {
  let res = await Booru.search('rule34', searchTerm, {
    limit: 1,
    random: true,
  })

  let searchData = await res.posts[0]
  return searchData
}

module.exports = {
  nekoBot,
  waifu,
  e621,
  gelbooru,
  r34,
}
