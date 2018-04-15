const mongoose = require('./mongoose.js');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const usersSchema = new Schema({
  username: String,
  password: String,
});

usersSchema.pre('save', function(next) {
  if (this.isNew) {
    const saltRounds = 10;
    bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      this.password = hashedPassword;
      next();
    });
  } else {
    next();
  }
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
