const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookclub');

function upsertTimestamps(schema, options) {
  schema.add({
    createdAt: Date,
    updatedAt: Date,
  });

  schema.pre('create', next => {
    this.createdAt = new Date();
    next();
  });

  schema.pre('save', next => {
    this.updatedAt = new Date();
    next();
  });

  if (options && options.index) {
    schema.path('upsertTimestamps').index(options.index);
  }
}

mongoose.plugin(upsertTimestamps);

module.exports = mongoose;
