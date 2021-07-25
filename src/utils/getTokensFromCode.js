const fetch = require("node-fetch");
const config = require("../config.json");

async function getTokensFromCode(code) {
  let clientid = config.clientid;
  let clientsecret = config.clientsecret;
  let redirect_uri = "http://localhost:3009/auth/discord/callback";
  let fetch_url = "https://discordapp.com/api/oauth2/token";
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  let params = new URLSearchParams();
  params.append("client_id", clientid);
  params.append("client_secret", clientsecret);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirect_uri);
  params.append("scope", "identify");
  let tokens = await fetch(fetch_url, {
    method: "POST",
    body: params,
    headers: headers
  }).then(r => r.json());
  return tokens;
}

module.exports = {
  getTokensFromCode,
}