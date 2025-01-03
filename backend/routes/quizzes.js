const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
const Leaderboard = require('../models/leaderboard');

router.post('/', async (req, res) => {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).send(quiz);
});

router.get('/', async (req, res) => {
    const quizzes = await Quiz.find();
    res.send(quizzes);
});

router.get('/:id', async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).send('Quiz not found');
    res.send(quiz);
});

router.post('/:id/submit', async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).send('Quiz not found');

    const { answers, name } = req.body;
    let score = 0;
    const correctAnswers = [];

    quiz.questions.forEach((question, index) => {
        if (question.correctAnswer === answers[index]) {
            score++;
            correctAnswers.push(question.correctAnswer);
        }
    });

    const leaderboardEntry = new Leaderboard({ quizId: quiz._id, name, score });
    await leaderboardEntry.save();

    res.send({ score, correctAnswers });
});

module.exports = router;