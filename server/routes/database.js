const { Router } = require("express");
const cors = require('../utils/corsFix');
const User = require("../models/User.js");
const router = Router();

router.options('*', cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
  console.log("cors check idk");
});

router.get('/users', (req, res) => {
  // if(req.headers.origin !== process.env.SERVER_REACT_DOMAIN) return res.redirect(process.env.SERVER_REACT_DOMAIN)
  User.find({}).then(function (users) {
    res.json(users);
  });
});

router.get('/users/:id', (req, res) => {
  if(req.headers.origin !== process.env.SERVER_REACT_DOMAIN) return res.redirect(process.env.SERVER_REACT_DOMAIN)
  User.findOne({userID: req.params.id}, function (err, post) {
    if (err) return console.log(err);
    res.json(post);
  });
});

router.put('/users/:id', async function(req, res, next) {
  if(req.headers.origin !== process.env.SERVER_REACT_DOMAIN) return res.redirect(process.env.SERVER_REACT_DOMAIN)
  await User.findOneAndUpdate({ userID: req.params.id }, req.body, function (err, post) {
    res.json(post);
  });
});

router.post('/newUser', cors.corsWithOptions, function(req, res, next) {
  if(req.headers.origin !== process.env.SERVER_REACT_DOMAIN) return res.redirect(process.env.SERVER_REACT_DOMAIN)
  User.create(req.body)
    .then(data => res.json(data))
    .catch(next)
});

module.exports = router;