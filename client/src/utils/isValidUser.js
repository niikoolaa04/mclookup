const {getCookie} = require('./getCookie');
const {getUserFromToken} = require('./getUserFromToken');

async function isValidUser(id, token) {
  let value = true;
  let user = await getUserFromToken(getCookie("bmfA71q"));
  if(user.code) {
    if(user.code === 0) value = false;
  }
  if(!getCookie("uuid") || !getCookie("bmfA71q")) value = false;

  return value;
}

module.exports = {
  isValidUser
}