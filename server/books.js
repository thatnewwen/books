const router = require('./index.js');
const mongoose = require('./mongoose.js');
const Schema = mongoose.Schema;

const booksSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  author_name: [String],
  isbn: [String],
  subject: [String],
});

const Books = mongoose.model('Books', booksSchema);

router.get('/books', (req, res, next) => {
  Books.find().then(books => {
    res.json(books);
  });
});

module.exports = Books;
