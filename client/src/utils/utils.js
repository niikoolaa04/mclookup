const axios = require("axios");
const { getCookie } = require("./getCookie");
const { getUserFromToken } = require("./getUserFromToken");

async function convertNumber(number) {
  let id = parseInt(number);

  let binary = id.toString(2);
  binary = binary.padStart(64, "0");

  let excerpt = binary.substring(0, 42);

  let decimal = parseInt(excerpt, 2);

  let unix = parseInt(decimal) + 1420070400000;

  const date = new Date(unix);
  const dataFormat = date.toLocaleString();

  return dataFormat;
}

async function getCurrentUser() {
  let user = await getUserFromToken(getCookie("bmfA71q"));

  return user.id;
}

async function isOwner() {
  let id = await getCurrentUser();
  let owner = false;
  await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/users/${id}`, {
    headers: {
      "Request_Token": `${process.env.REACT_APP_API_KEY}`
    }
  }).then((resp) => {
    if(resp.data.owner == true) return owner = true;
  })

  return owner;
}

module.exports = {
  convertNumber,
  getCurrentUser,
  isOwner,
}