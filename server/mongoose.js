const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookclub');

function upsertTimestamps(schema) {
  schema.add({
    createdAt: Date,
    updatedAt: Date,
  });

  schema.pre('create', next => {
    this.createdAt = new Date();
    next();
  });

  schema.pre('update', next => {
    this.updatedAt = new Date();
    next();
  });
}

mongoose.plugin(upsertTimestamps);

module.exports = mongoose;
