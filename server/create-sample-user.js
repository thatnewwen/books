const mongoose = require('mongoose');

const Users = require('./models/users.js');

Users.count({ username: 'test@gmail.com' }).then(count => {
  if (!count) {
    const testUser = new Users({
      _id: mongoose.Types.ObjectId('5b47e88804a18d35d98ab14a'),
      username: 'test@gmail.com',
      password: 'test123',
      bookIds: [],
    });

    testUser.save();
  }
});
