var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
    login: {
      type: String,
    },
    chat_id: {
      type: String
    },
    pin: {
      type: Number
    },
    artefacts: [  ],
    balance: {
      type: Number
    },
    food_bar: {
      type: Number,
      default: 100
    },
    oxygen_bar: {
      type: Number,
      default: 100
    },
    active: [  ],
    food: [],
    oxygen: [],
    balance: {
      type: Number,
      default: 0
    }
    
},{
  timestamp:true
});


User.set('autoIndex', false);
module.exports = mongoose.model('User', User);