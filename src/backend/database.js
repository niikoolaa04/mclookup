const { Router } = require("express");
const User = require("./models/User.js");
const router = Router();

router.get('/users', (req, res) => {
  User.find({}).then(function (users) {
    res.send(users);
  });
});

router.post('/newUser', function(req, res, next) {
  console.log('working');
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;