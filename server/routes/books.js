const { api } = require('../index.js');
const Books = require('../models/books.js');

api.get('/books', (req, res) => {
  Books.find().then(books => {
    res.json(books);
  });
});
