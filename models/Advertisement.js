var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
let Long =  mongoose.Schema.Types.Long

var AdSchema = new mongoose.Schema({
  owner: {
    type: Long,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  }
});

module.exports = mongoose.model('Advertisement', AdSchema);