const { user } = require('../index.js');
const Entries = require('../models/entries.js');

user.put('/entries', (req, res) => {
  const user = req.user;
  const userId = user._id;
  const { bookId, contents } = req.body;

  Entries.findOneAndUpdate(
    { bookId, userId },
    { bookId, userId, contents },
    { upsert: true }
  ).then(entry => {
    res.json(entry).send();
  });
});

user.get('/entries/:bookId', (req, res) => {
  const user = req.user;
  const userId = user._id;
  const bookId = req.params.bookId;

  Entries.findOne({ bookId, userId }).then(entry => {
    res.json(entry).send();
  });
});