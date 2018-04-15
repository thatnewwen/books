const { api } = require('./routes.js');
const Books = require('../models/books.js');

api.get('/books', (req, res) => {
  Books.find().then(books => {
    res.json(books);
  });
});
