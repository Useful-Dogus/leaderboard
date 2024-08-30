document.getElementById('timeForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const minutes = parseInt(document.getElementById('minutes').value);
  const seconds = parseInt(document.getElementById('seconds').value);
  const milliseconds = parseInt(document.getElementById('milliseconds').value);

  fetch('http://localhost:3000/api/leaderboard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, minutes, seconds, milliseconds }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      document.getElementById('timeForm').reset();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
