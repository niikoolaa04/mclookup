const fetch = require("node-fetch");

export const getUserFromToken = async(token) => {
  let tokenType = "Bearer";
  let info = await fetch("https://discordapp.com/api/users/@me", {
    headers: {
      authorization: `${tokenType} ${token}`
    }
  }).then(res => res.json());
  return info;
}