const { mongoose, Schema } = require('./mongoose.js');

const entriesSchema = new Schema({
  contents: Object,
  bookId: String,
  userId: String,
});

const Entries = mongoose.model('Entries', entriesSchema);

module.exports = Entries;
