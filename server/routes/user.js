const { user } = require('./routes');

user.get('/profile', function(req, res) {
  res.send(req.user);
});
