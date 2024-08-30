const express = require('express');
const cors = require('cors');
const app = express();

// CORS 설정
app.use(cors());

app.use(express.json());
app.use(express.static('frontend'));

const leaderboardRoutes = require('./routes/leaderboard');
app.use('/api/leaderboard', leaderboardRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
