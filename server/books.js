const router = require('./index.js');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/my_database');

// const Books = mongoose.model('Books');

router.get('/books', function(req, res, next) {
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
