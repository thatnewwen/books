const router = require('./index.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const booksSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  author: String,
});

mongoose.connect('mongodb://localhost/book_club');

const Books = mongoose.model('Books', booksSchema);

router.get('/books', (req, res, next) => {
  Books.find().then(books => {
    res.json(books);
  });
});
