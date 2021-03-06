const fetch = require("node-fetch");

export const getUserFromID = async(token, user) => {
  let tokenType = "Bearer";
  let info = await fetch("https://discordapp.com/api/users/" + user, {
    headers: {
      authorization: `${tokenType} ${token}`
    }
  }).then(res => res.json());
  return info;
}