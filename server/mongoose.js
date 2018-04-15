const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/bookclub");

function upsertTimestamps(schema) {
  schema.add({
    createdAt: Date,
    updatedAt: Date
  });

  schema.pre("save", function(next) {
    if (this.isNew) {
      this.createdAt = new Date();
    }
    next();
  });

  schema.pre("update", function(next) {
    this.updatedAt = new Date();
    next();
  });
}

mongoose.plugin(upsertTimestamps);

module.exports = mongoose;
