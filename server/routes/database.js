const { Router } = require("express");
const cors = require('../utils/corsFix');
const User = require("../models/User.js");
const router = Router();

router.options('*', cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

router.get('/users', (req, res) => {
  console.log(req.referer);
  User.find({}).then(function (users) {
    res.json(users);
  });
});

router.get('/users/:id', (req, res) => {
  console.log(req.referer);
  User.findOne({userID: req.params.id}, function (err, post) {
    if (err) return console.log(err);
    res.json(post);
  });
});

router.put('/users/:id', async function(req, res, next) {
  await User.findOneAndUpdate({ userID: req.params.id }, req.body, function (err, post) {
    res.json(post);
  });
});

router.post('/newUser', cors.corsWithOptions, function(req, res, next) {
  console.log(req.referer);
  User.create(req.body)
    .then(data => res.json(data))
    .catch(next)
});

module.exports = router;