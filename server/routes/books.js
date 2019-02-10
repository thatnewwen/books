const { api } = require('../index.js');
const Books = require('../models/books.js');

api.get('/books', (req, res) => {
  const { _id, search } = req.query;
  const query = {};

  if (_id) {
    query._id = { $in: _id };
  }

  if (search) {
    const substringMatch = new RegExp(search, 'i');

    query.$or = [
      { title: substringMatch },
      { author_name: substringMatch },
      { subjects: substringMatch },
    ];
  }

  Books.find(query)
    .limit(200)
    .then(books => {
      res.json(books);
    });
});

api.get('/books/:bookId', (req, res) => {
  const bookId = req.params.bookId;

  Books.findOne({ _id: bookId }).then(book => {
    res.json(book);
  });
});
