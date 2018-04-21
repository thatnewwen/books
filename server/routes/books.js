const { api } = require('../index.js');
const Books = require('../models/books.js');

api.get('/books', (req, res) => {
  const bookIds = req.query.bookIds;
  const query = {};

  if (bookIds) {
    query._id = { $in: bookIds };
  }

  Books.find(query).then(books => {
    res.json(books).send();
  });
});
