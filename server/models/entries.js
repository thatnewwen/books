const { mongoose, Schema } = require('./mongoose.js');

const entriesSchema = new Schema({
  bookId: { type: String, required: true },
  userId: { type: String, required: true },
  contents: Object,
  rating: Number,
});

const Entries = mongoose.model('Entries', entriesSchema);

module.exports = Entries;
