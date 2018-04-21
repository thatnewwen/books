const { mongoose, Schema } = require('./mongoose.js');

const booksSchema = new Schema({
  title: String,
  author_name: [String],
  isbn: [String],
  subject: [String],
});

const Books = mongoose.model('Books', booksSchema);

module.exports = Books;
