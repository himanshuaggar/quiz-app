const mongoose = require('mongoose');
const questionSchema = require('./question');

const quizSchema = new mongoose.Schema({
    title: String,
    questions: [questionSchema]
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;