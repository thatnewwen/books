const app = require('./index.js');

app.get('/books', function(req, res, next) {
  res.json([
    {
      _id: 1,
      name: 'Some book 1',
    },
    {
      _id: 2,
      name: 'Another book',
    },
  ]);
});
