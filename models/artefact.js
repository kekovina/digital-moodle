var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Artefact = new Schema({
    name: {
      type: String
    },
    img: {
      type: String
    },
    description: {
      type: String
    },
    id: {
        type: Number
    }
  })

  module.exports = mongoose.model('Artefact', Artefact);