const { mongoose, Schema } = require('./mongoose.js');

const entriesSchema = new Schema({
  contents: Object,
  bookId: { type: String, required: true },
  userId: { type: String, required: true },
});

const Entries = mongoose.model('Entries', entriesSchema);

module.exports = Entries;
