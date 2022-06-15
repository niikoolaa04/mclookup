const fetch = require("node-fetch");

async function getTokensFromCode(code) {
  let client_id = process.env.SERVER_CLIENT_ID;
  let client_secret = process.env.SERVER_CLIENT_SECRET;
  let redirect_uri = `${process.env.SERVER_DOMAIN}/auth/discord/callback`;
  let fetch_url = "https://discordapp.com/api/oauth2/token";
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  let params = new URLSearchParams();
  params.append("client_id", client_id);
  params.append("client_secret", client_secret);
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