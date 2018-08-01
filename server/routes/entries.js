const { user } = require('../index.js');
const Entries = require('../models/entries.js');
const Users = require('../models/users.js');

user.put('/entries', (req, res) => {
  const user = req.user;
  const userId = user._id;
  const { bookId, contents, rating } = req.body;

  const update = { $set: { bookId, userId } };

  if (contents !== undefined) {
    update.$set.contents = contents;
  }

  if (rating !== undefined) {
    update.$set.rating = rating;
  }

  Entries.findOneAndUpdate({ bookId, userId }, update, {
    upsert: true,
  }).then(() => {
    Users.findByIdAndUpdate(userId, {
      $addToSet: { bookIds: bookId },
    }).then(() => res.send());
  });
});

user.get('/entries/:bookId', (req, res) => {
  const user = req.user;
  const userId = user._id;
  const bookId = req.params.bookId;

  Entries.findOne({ bookId, userId }).then(entry => {
    res.json(entry);
  });
});
