const { Router } = require("express");
const User = require("../models/User.js");
const router = Router();

router.get('/users', (req, res) => {
  User.find({}).then(function (users) {
    res.send(users);
  });
});

router.post('/newUser', function(req, res, next) {
  User.create(req.body)
    .then(data => res.json(data))
    .catch(next)
});

module.exports = router;