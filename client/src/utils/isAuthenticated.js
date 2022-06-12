const getCookie = require("./getCookie.js");

export const isAuthenticated = () => {
  let value = false;
  if(!getCookie) value = false;
  else value = true;

  return value;
}