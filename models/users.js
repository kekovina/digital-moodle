var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
    login: {
      type: String,
      required: true
    },
    pin: {
      type: Number
    }
},{
  timestamp:true
});


User.set('autoIndex', false);
module.exports = mongoose.model('User', User);