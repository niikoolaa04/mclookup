var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  userID: {
    type: Number,
  },
  username: {
    type: String,
  },
  discriminator: {
    type: Int64,
  },
  avatarURL: {
    type: String,
  },
  hypeSquad: {
    type: Number,
  },
  nitro: {
    type: Number,
  }
});

module.exports = mongoose.model('User', UserSchema);