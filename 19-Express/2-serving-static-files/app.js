const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
  res.send('Welcoome');
});

app.get('/about', (req, res) => {
  res.send('About');
});

app.get('/weather', (req, res) => {
  res.send('Weather');
});

app.listen(3000, () => {
  console.log('Server is runing');
});
