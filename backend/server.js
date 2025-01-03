const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use('/quizzes', require('./routes/quizzes'));
app.use('/leaderboard', require('./routes/leaderboard'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));