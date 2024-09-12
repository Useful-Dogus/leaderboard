function displayLeaderboard(data) {
  const leaderboardTable = document.getElementById('leaderboard');

  // 테이블 초기화
  while (leaderboardTable.firstChild) {
    leaderboardTable.removeChild(leaderboardTable.firstChild);
  }

  // 헤더 추가
  const headerRow = document.createElement('tr');
  const headers = ['순위', '이름', '시간'];
  headers.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });

  leaderboardTable.appendChild(headerRow);

  // 데이터 추가
  data.forEach((score, index) => {
    const row = document.createElement('tr');

    const rank = document.createElement('td');
    rank.textContent = index + 1;
    row.appendChild(rank);

    const name = document.createElement('td');
    name.textContent = score.name;
    row.appendChild(name);

    const time = document.createElement('td');

    // format time MM:SS.SS

    const MM = String(score.minutes).padStart(2, '0');
    const SS = String(score.seconds).padStart(2, '0');
    const FLOATING_SS = String(score.milliseconds).padStart(2, '0');
    time.textContent = `${MM}분 ${SS}.${FLOATING_SS}초`;

    row.appendChild(time);

    leaderboardTable.appendChild(row);
  });
}

function fetchLeaderboard() {
  fetch('http://localhost:3000/api/leaderboard')
    .then((response) => response.json())
    .then((data) => {
      displayLeaderboard(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// 페이지 로드 시 리더보드 데이터를 가져와 표시
fetchLeaderboard();

// 이후 10초마다 호출
setInterval(fetchLeaderboard, 1000);
