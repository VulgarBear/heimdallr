const { Schema, model, models } = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const serverSettingsSchema = new Schema({
  // Guild ID
  _id: reqString,
  starChan: reqString,
  newsChan: reqString,
  logChan: reqString,
  defaultRole: reqString,
  muteRole: reqString,
  nsfwAllowed: {
    type: Boolean,
    default: false,
  },
})

const name = 'server-settings'
module.exports = models[name] || model(name, serverSettingsSchema)
