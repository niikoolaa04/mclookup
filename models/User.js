var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
let Long =  mongoose.Schema.Types.Long

var UserSchema = new mongoose.Schema({
  userID: {
    type: Long,
  },
  username: {
    type: String,
  },
  discriminator: {
    type: String,
  },
  avatarURL: {
    type: String,
  },
  hypeSquad: {
    type: Number,
  },
  nitro: {
    type: Number,
  },
  description: {
    type: String,
  },
  owner: {
    type: Boolean
  },
  staff: {
    type: Boolean
  }
});

module.exports = mongoose.model('User', UserSchema);