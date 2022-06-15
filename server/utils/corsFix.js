const express = require("express");
const cors = require("cors");

const whitelist = [
  "https://mclookup-app.herokuapp.com",
  "https://discord.com",
  "https://discordapp.com",
];

var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  // console.log("origin2: ", req.header("Origin"));
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);