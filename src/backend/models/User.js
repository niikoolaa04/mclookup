var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  idUSER: Number
});

module.exports = mongoose.model('User', UserSchema);