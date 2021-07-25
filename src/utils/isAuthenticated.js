const getCookie = require("./getCookie.js");

function isAuthenticated() {
  let value = false;
  if(!getCookie) value = false;
  else value = true;

  return value;
}

module.exports = {
  isAuthenticated,
}