var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  userID: {
    type: Number,
  },
  username: {
    type: String,
  },
  flags: {
    type: Number,
  }
});

module.exports = mongoose.model('User', UserSchema);