const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'build')));

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

module.exports = app;

// Endpoints
require('./books.js');
