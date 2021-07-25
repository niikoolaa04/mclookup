async function getGuildsFromID(id, token) {
  let tokenType = "Bearer";
  let info = await fetch("https://discordapp.com/api/users/@me/guilds", {
    headers: {
      authorization: `${tokenType} ${token}`
    }
  }).then(res => res.json()).catch((err) => { return false; });
  return info;
}

module.exports = {
  getGuildsFromID,
}