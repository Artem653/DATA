const express = require('express');
const moment = require('moment');

const app = express();
const PORT = 8001;

function getDate() {
    return moment().format('YYYY/DD/MM HH:mm:ss');
}

app.get('/timestamp', (req, res) => {
  const now = new Date();
  res.json({ timestamp: now });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:8001`);
});