const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    quizId: mongoose.Schema.Types.ObjectId,
    name: String,
    score: Number
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
module.exports = Leaderboard;