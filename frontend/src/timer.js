let timerInterval;
let elapsedTime = 0; // 밀리초 단위로 경과 시간 기록

// 타이머 형식으로 변환하는 함수 (NN:MM.XX)
function formatTime(time) {
  const minutes = Math.floor(time / 60000); // 분
  const seconds = Math.floor((time % 60000) / 1000); // 초
  const hundredths = Math.floor((time % 1000) / 10); // 1/100초

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedHundredths = String(hundredths).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}.${formattedHundredths}`;
}

function updateTimer() {
  document.getElementById('timer').innerText = formatTime(elapsedTime);
}

function addTimer() {
  const startButton = document.getElementById('start');
  const stopButton = document.getElementById('stop');
  const resetButton = document.getElementById('reset');

  startButton.addEventListener('click', function () {
    if (!timerInterval) {
      // 타이머가 이미 실행 중이면 무시
      const startTime = Date.now() - elapsedTime; // 이전 시간에서 재시작
      timerInterval = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        updateTimer();
      }, 10); // 1/100초 단위로 업데이트
    }
  });

  stopButton.addEventListener('click', function () {
    clearInterval(timerInterval);
    timerInterval = null; // 타이머 상태 초기화
  });

  resetButton.addEventListener('click', function () {
    clearInterval(timerInterval);
    timerInterval = null; // 타이머 상태 초기화
    elapsedTime = 0;
    updateTimer();
  });
}

addTimer();
