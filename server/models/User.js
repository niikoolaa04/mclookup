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
  }
});

module.exports = mongoose.model('User', UserSchema);