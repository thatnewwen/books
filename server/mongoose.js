const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookclub');

module.exports = mongoose;
