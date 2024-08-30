const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const leaderboardDataPath = path.join(__dirname, '../data.json');

// GET /api/leaderboard
router.get('/', (req, res) => {
  fs.readFile(leaderboardDataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read data' });
    }
    let leaderboard = JSON.parse(data);

    // 시간 기준으로 정렬 (짧은 순서대로)
    leaderboard.sort((a, b) => {
      const timeA = a.minutes * 60000 + a.seconds * 1000 + a.milliseconds;
      const timeB = b.minutes * 60000 + b.seconds * 1000 + b.milliseconds;
      return timeA - timeB;
    });

    res.json(leaderboard);
  });
});

// POST /api/leaderboard
router.post('/', (req, res) => {
  const { name, minutes, seconds, milliseconds } = req.body;

  // 밀리초 유효성 검사: 0~99 범위만 허용
  if (milliseconds < 0 || milliseconds > 99) {
    return res.status(400).json({ message: 'Milliseconds must be between 0 and 99.' });
  }

  // 데이터 읽기 및 저장 로직 (기존 코드 유지)
  fs.readFile(leaderboardDataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read data' });
    }
    const leaderboard = JSON.parse(data);

    leaderboard.push({ name, minutes, seconds, milliseconds });
    leaderboard.sort((a, b) => {
      const timeA = a.minutes * 60000 + a.seconds * 1000 + a.milliseconds;
      const timeB = b.minutes * 60000 + b.seconds * 1000 + b.milliseconds;
      return timeA - timeB;
    });

    fs.writeFile(leaderboardDataPath, JSON.stringify(leaderboard, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to save data' });
      }
      res.status(201).json({ message: 'Time added successfully' });
    });
  });
});

module.exports = router;
