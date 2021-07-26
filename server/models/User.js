var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String
  },
  idUSER: {
    type: Number
  }
});

module.exports = mongoose.model('User', UserSchema);