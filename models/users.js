var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
    firstname: {
      type: String,
        default: 'No'
    },
    lastname: {
      type: String,
        default: 'Name'
    },
    admin:   {
        type: Boolean,
        default: false
    }
},{
  timestamp:true
});


User.set('autoIndex', false);
module.exports = mongoose.model('User', User);