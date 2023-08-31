const axios = require('axios')
const logger = require('./logger')
require('dotenv/config')

const nftyNotify = async (nftyData, nftyTag) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.NFTY,
    headers: {
      Tags: nftyTag,
      'Content-Type': 'text/plain',
    },
    data: nftyData,
  }

  axios
    .request(config)
    .then((response) => {
      logger.info('Ready notification was successful.')
    })
    .catch((error) => {
      console.log(error)
      logger.error(error, 'Ready notification failed to send.')
    })
}

module.exports = {
  nftyNotify,
}
