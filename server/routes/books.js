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
    .limit(20)
    .then(books => {
      res.json(books);
    });
});
