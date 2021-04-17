var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Food = new Schema({
    name: {
        type: String
    },
    id: {
        type: Number
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('Food', Food);
