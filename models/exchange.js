var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Exchange = new Schema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    artefact_from: {
        type: mongoose.Schema.Types.ObjectId
    },
    artefact_to: {
        type: mongoose.Schema.Types.ObjectId
    },
    status: {
        type: String,
        default: 'pending'
    },
    answered_from: {
        type: Boolean,
        default: false
    },
    answered_to: {
        type: Boolean,
        default: false
    }
    
})

module.exports = mongoose.model('Exchange', Exchange);