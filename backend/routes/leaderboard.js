const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/leaderboard');

router.get('/:id', async (req, res) => {
    const leaderboard = await Leaderboard.find({ quizId: req.params.id });
    res.send(leaderboard);
});

module.exports = router;