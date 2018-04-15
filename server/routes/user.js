const { user } = require('../index.js');

user.get('/profile', function(req, res) {
  res.send(req.user);
});
