var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Quiz = new Schema({
    question: {
        type: String
    },
    answers: [],
    right_answer: {
        type: Number
    }
})

module.exports = mongoose.model('Quiz', Quiz);
