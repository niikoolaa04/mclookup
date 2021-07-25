const {getCookie} = require('./getCookie');
const {getUserFromToken} = require('./getUserFromToken');

async function isValidUser(id, token) {
  let value = true;
  let user = await getUserFromToken(getCookie("qwerty_access"));
  if(user.code) {
    if(user.code === 0) value = false;
  }
  if(!getCookie("uuid") || !getCookie("qwerty_access")) value = false;

  return value;
}

module.exports = {
  isValidUser
}