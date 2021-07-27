const express = require("express");
const cors = require("cors");

const whitelist = [
  "http://193.23.127.180:3002",
  "http://193.23.127.180:3002/profile",
  "http://193.23.127.180:3002/users",
  "http://193.23.127.180:3002/user"
];

var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  console.log("origin2: ", req.header("Origin"));
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);