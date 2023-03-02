const axios = require('axios')

// 8ball
// Generates random 8ball result

const eightBall = async () => {
  const answers = [
    'It is certain',
    'It is decidedly so',
    'Without a doubt',
    'Yes definitely',
    'You may rely on it',
    'As I see it, yes',
    'Most likely',
    'Outlook good',
    'Yes',
    'Signs point to yes',
    'Reply hazy try again',
    'Ask again later',
    'Better not tell you now',
    'Cannot predict now',
    'Concentrate and ask again',
    "Don't count on it",
    'My reply is no',
    'My sources say no',
    'Outlook not so good',
    'Very doubtful',
  ]

  const answer = answers[Math.floor(Math.random() * answers.length)]
  return answer
}

// Cute Helper
// Generates cute animal picture
// dogURL: 'https://random.dog/doggos'
// foxURL: 'https://randomfox.ca/floof/'
// catURL: 'https://api.thecatapi.com/v1/images/search'
// birbURL: 'http://shibe.online/api/birds?&urls=true&httpsUrls=true'

const cute = async (type) => {
  if (type === 'dog') {
    const dogSearch = await axios.get('https://random.dog/doggos')
    const dogData = dogSearch.data
    const dogRanData =
      'https://random.dog/' +
      dogData[Math.floor(Math.random() * dogData.length)]
    return dogRanData
  } else if (type === 'fox') {
    const foxSearch = await axios.get('https://randomfox.ca/floof/')
    const foxData = foxSearch.data.image
    return foxData
  } else if (type === 'cat') {
    const catSearch = await axios.get(
      'https://api.thecatapi.com/v1/images/search'
    )
    const catData = catSearch.data[0].url
    return catData
  } else if (type === 'bird') {
    const birdSearch = await axios.get(
      'http://shibe.online/api/birds?&urls=true&httpsUrls=true'
    )
    const birdData = birdSearch.data[0]
    return birdData
  } else {
    return false
  }
}

// Insult Helper
// Generates random insult from Evil Insult API
const insult = async () => {
  const insultSearch = await axios.get(
    'https://evilinsult.com/generate_insult.php?lang=en&type=json'
  )
  const insultData = insultSearch.data.insult
  return insultData
}

module.exports = {
  eightBall,
  insult,
  cute,
}
