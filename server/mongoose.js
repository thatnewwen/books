const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookclub');

function upsertTimes(schema, options) {
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
    schema.path('upsertTimes').index(options.index);
  }
}

mongoose.plugin(require('./upsertTimes'));

module.exports = mongoose;
